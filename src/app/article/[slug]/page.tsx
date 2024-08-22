"use client";
import { getClickedArticle } from "@/actions/handleArticle";
import { handleLike, handleUnlike } from "@/actions/handleLike";
import { LikeOutlined, CommentOutlined, LikeFilled } from "@ant-design/icons";
import { Space, Card, Avatar, Typography, Button, List } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { useEffect, useState } from "react";

function Post({ param }: { param: { slug: string } }) {
    const { Title, Paragraph, Text } = Typography;
    const slug = param.slug;
    const [article, setArticle] = useState<Article>();

    const [like, setLike] = useState(article?.favorited);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (typeof slug === "string") {
            (async function () {
                const result = await getClickedArticle(slug, token!!);
                setArticle(result.article);
            })();
        } else {
            console.error(typeof slug);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        // console.error(like);
        like
            ? handleUnlike(article?.slug!!, token!!)
            : handleLike(article?.slug!!, token!!);
    }, [like]);

    return (
        <div className="container">
            <div className="article-page">
                <Space align="center" className="w-100 justify-content-center">
                    <Card style={{ width: "40vw" }}>
                        <Link
                            href={`/profile/${article?.author.username}`}
                            className="author"
                        >
                            <Meta
                                avatar={<Avatar src={article?.author?.image} />}
                                title={article?.author?.username}
                                style={{
                                    paddingBottom: 20,
                                    alignItems: "center",
                                }}
                            />
                        </Link>

                        <Typography>
                            <Title>{article?.title}</Title>
                            <Paragraph style={{ textAlign: "justify" }}>
                                {article?.body}
                            </Paragraph>
                            <Button
                                type="default"
                                icon={like ? <LikeFilled /> : <LikeOutlined />}
                                onClick={() => {
                                    setLike(!like);
                                }}
                            >
                                Like
                            </Button>
                        </Typography>

                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 3,
                            }}
                            // dataSource={data}
                            footer={
                                <div>
                                    <b>ant design</b> footer part
                                </div>
                            }
                            renderItem={(item) => <div className=""></div>}
                        />
                    </Card>
                </Space>
            </div>
        </div>
    );
}

export default Post;
