import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, List } from "antd";
import { CommentType } from "@/types/enums";
import { formatDate } from "@/ultis/formatTime";
import { formatText } from "@/ultis/textToHTML";
import Paragraph from "antd/es/typography/Paragraph";
import { TruncateText } from "@/ultis/TruncateText";
import Link from "next/link";

export default function CardPostComment({
  comments,
  commentType,
}: {
  comments: Comment[];
  commentType: CommentType;
}) {
  return (
    <>
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
              {/* {comment.author.username === currentUser && (
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteComment(comment.id)}
                />
              )} */}
            </div>
          </li>
        )}
      />
      {commentType === CommentType.ModalComment ? (
        <div className="mt-3">
          <Input
            placeholder="Viết câu trả lời..."
            // value={commentText}
            // onChange={handleCommentChange}
            // onKeyPress={handleKeyPress}
            suffix={
              <Button
                type="text"
                icon={<SendOutlined />}
                // onClick={handleSendComment}
              />
            }
          />
        </div>
      ) : null}
    </>
  );
}
