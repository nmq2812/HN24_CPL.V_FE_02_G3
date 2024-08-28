import { Card, Modal } from "antd";
import CardPostHeader from "../CardPost/CardPostHeader";
import CardPostContent from "../CardPost/CardPostContent";
import CardPostFooter from "../CardPost/CardPostFooter";
import { CommentType } from "@/types/enums";

export default function ModalPost({
  article,
  open,
  onOk,
  onCancel,
  isMe,
}: {
  article: Article;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  isMe: boolean;
}) {
  return (
    <Modal
      title={`Bài viết của ${article.author.username}`}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <Card>
        <CardPostHeader
          author={article.author}
          updatedAt={article.updatedAt}
          isMe={isMe}
        ></CardPostHeader>
        <CardPostContent article={article}></CardPostContent>
        <CardPostFooter
          article={article}
          showModal={() => {}}
          commentType={CommentType.ModalComment}
        ></CardPostFooter>
      </Card>
    </Modal>
  );
}
