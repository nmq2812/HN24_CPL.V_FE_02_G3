"use client";

import { getClickedArticle } from "@/actions/handleArticle";
import { handleLike, handleUnlike } from "@/actions/handleLike";
import { getComment, deleteComment, postComent } from "@/actions/handleComments";
import { LikeOutlined, LikeFilled, DeleteOutlined, SendOutlined, UserAddOutlined } from "@ant-design/icons";
import { Space, Avatar, Typography, Button, List, Input, Spin } from "antd";
import { Comments } from "@/types/comments";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";

function Post({ params }: { params: { slug: string } }) {
    const { Title, Paragraph } = Typography;
    const { user } = useAuth();
    const slug = params.slug;
    const [article, setArticle] = useState<Article>();
    const [commentText, setCommentText] = useState("");

    const [comments, setComments] = useState<Comments[]>([]);

    const [like, setLike] = useState(article?.favorited);

    const token = user?.token;
    const currentUser = user?.username;

    useEffect(() => {
        if (typeof slug === "string") {
            (async function () {
                const [result, fetchedComments] = await Promise.all([
                    getClickedArticle(slug, token!!),
                    getComment(slug),
                ]);
                setArticle(result.article);
                setLike(result.article.favorited);
                setComments(fetchedComments);
            })();
        } else {
            console.error(typeof slug);
        }
    }, [slug]);

    const handleLikeButtonClick = async () => {
        if (like) {
            await handleUnlike(article?.slug!!, token!!);
        } else {
            await handleLike(article?.slug!!, token!!);
        }
        setLike(!like);
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    };

    const handleSendComment = async () => {
        if (commentText.trim()) {
            try {
                const newComment = await postComent(slug, token!!, commentText);
                setComments([...comments, newComment]);
                setCommentText("");
            } catch (error) {
                console.error("Failed to post comment:", error);
            }
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await deleteComment(slug, commentId, token!!);
            setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendComment();
        }
    };

    if (!article) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="container mt-3">
            <div className="card p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <Avatar src={article?.author?.image} />
                        <div className="ms-2">
                            <strong>{article?.author?.username}</strong>
                            <p className="text-muted">{}</p>
                        </div>
                    </div>
                    <Button type="text" icon={<UserAddOutlined />}></Button>
                </div>

                <div className="mt-3">
                    <Title>{article?.title}</Title>
                    <p>{article?.body}</p>
                </div>

                <div className="d-flex justify-content-between mt-3">
                    <Space size="large">
                        <Button
                            type="text"
                            icon={like ? <LikeFilled /> : <LikeOutlined />}
                            onClick={handleLikeButtonClick}
                        >
                            {article?.favoritesCount} Like
                        </Button>
                    </Space>
                </div>

                <List
                    className="comment-list mt-4"
                    header={`${comments.length} bình luận`}
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={(comment) => (
                        <li key={comment.id}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: "16px",
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    <Avatar src={comment.author.image} />
                                    <div style={{ marginLeft: "8px" }}>
                                        <strong>
                                            {comment.author.username}
                                        </strong>
                                        <p>{comment.body}</p>
                                    </div>
                                </div>
                                {comment.author.username === currentUser && (
                                    <Button
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                    />
                                )}
                            </div>
                        </li>
                    )}
                />

                <div className="mt-3">
                    <Input
                        placeholder="Viết câu trả lời..."
                        value={commentText}
                        onChange={handleCommentChange}
                        onKeyPress={handleKeyPress}
                        suffix={
                            <Button
                                type="text"
                                icon={<SendOutlined />}
                                onClick={handleSendComment}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default Post;
