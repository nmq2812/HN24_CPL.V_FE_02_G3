import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, List } from "antd";
import { CommentType } from "@/types/enums";
import { formatDate } from "@/ultis/formatTime";

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
                <Avatar src={comment.author.image} />
                <div
                  className="ms-2 rounded p-2"
                  style={{ backgroundColor: "#f0f0f0" }}
                >
                  <strong>{comment.author.username}</strong>
                  <div
                    className="date fw-lighter text-muted"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {formatDate(comment.createdAt)}
                  </div>
                  <p className="m-0 fs-5">{comment.body}</p>
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
