import { getComment } from "@/actions/handleComments";
import { handleZero, suffixS } from "@/ultis/formatText";
import { CommentOutlined, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CommentType } from "@/types/enums";
import CardPostComment from "../CardPostComment";

export default function CardPostFooter({
  article,
  showModal,
  commentType,
}: {
  article: Article;
  showModal: () => void;
  commentType: CommentType;
}) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      await getComment(article.slug).then((res) => {
        setComments(res);
      });
    })();
  }, []);


  return (
    <>
      <div className="d-flex text-center border-top border-bottom align-items-center">
        <div className="flex-grow-1">
          <div className="btn">
            <HeartOutlined />
            <span>
              {" "}
              {handleZero(article.favoritesCount)}{" "}
              {suffixS("Like", article.favoritesCount)}
            </span>
          </div>
        </div>
        <div className="flex-grow-1">
          <div className="btn" onClick={showModal}>
            <CommentOutlined />
            <span>
              {" "}
              {handleZero(comments.length)}{" "}
              {suffixS("Comment", comments.length)}
            </span>
          </div>
        </div>
      </div>
      {comments.length ? (
        <CardPostComment comments={comments} commentType={commentType}></CardPostComment>
      ) : null}
    </>
  );
}
