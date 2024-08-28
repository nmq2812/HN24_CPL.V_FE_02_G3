"use client";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, List } from "antd";
import { CommentType } from "@/types/enums";
import { formatDate } from "@/ultis/formatTime";
import { formatText } from "@/ultis/textToHTML";
import Paragraph from "antd/es/typography/Paragraph";
import { TruncateText } from "@/ultis/TruncateText";
import Link from "next/link";
import { deleteComment, postComment } from "@/actions/handleComments";
import { useAuth } from "@/contexts/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CardPostComment({
  comments,
  commentType,
  slug,
  token,
}: {
  comments: Comment[];
  commentType: CommentType;
  slug: string;
  token?: string;
}) {
  const [commentText, setCommentText] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSendComment = async () => {
    if (commentText.trim()) {
      try {
        postComment(slug, token!!, commentText);
        setCommentText("");
      } catch (error) {
        console.error("Failed to post comment:", error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(slug, commentId, token!!);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendComment();
    }
  };

  return (
    <>
      {comments.length > 0 ? (
        <List
          className="comment-list mt-4"
          itemLayout="horizontal"
          dataSource={
            commentType === CommentType.FeedComment ? [comments[0]] : comments
          }
          renderItem={(comment) => (
            <li key={comment.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <Link href={`/profile/${comment.author.username}`}>
                      <Avatar src={comment.author.image} />
                    </Link>
                  </div>

                  <div
                    className="ms-2 rounded p-2"
                    style={{ backgroundColor: "#f0f0f0" }}
                  >
                    <Link href={`/profile/${comment.author.username}`}>
                      <TruncateText
                        text={comment.author.username}
                        maxLength={10}
                      />
                    </Link>

                    <div
                      className="date fw-lighter text-muted"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {formatDate(comment.createdAt)}
                    </div>
                    <Paragraph
                      ellipsis={{
                        expandable: true,
                        symbol: "Read more",
                      }}
                    >
                      {formatText(comment.body)}
                    </Paragraph>
                  </div>
                </div>
                {comment.author.username === user?.username && (
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteComment(comment.id)}
                  />
                )}
              </div>
            </li>
          )}
        />
      ) : null}

      {commentType === CommentType.DetailComment ? (
        token ? (
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
        ) : (
          <div
            className="btn btn-primary mt-3"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login to comment
          </div>
        )
      ) : null}
    </>
  );
}
