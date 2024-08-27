import { getComment } from "@/actions/handleComments";
import { handleZero, suffixS } from "@/ultis/formatText";
import { CommentOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CommentType } from "@/types/enums";
import CardPostComment from "../CardPostComment";
import { useAuth } from "@/contexts/auth";
import { handleLike, handleUnlike } from "@/actions/handleLike";
import { useRouter } from "next/navigation";

export default function CardPostFooter({
  article,
  commentType,
}: {
  article: Article;
  commentType: CommentType;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [like, setLike] = useState<boolean>(article.favorited);
  const [likeCount, setLikeCount] = useState<number>(article.favoritesCount);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      await getComment(article.slug).then((res) => {
        setComments(res);
        setCommentCount(res.length);
      });
    })();
  }, []);

  const handleOnclickLike = () => {
    if (!like) {
      handleLike(article.slug, user?.token!!);
      setLikeCount(likeCount + 1);
    } else {
      handleUnlike(article.slug, user?.token!!);
      setLikeCount(likeCount - 1);
    }
    setLike(!like);
  };

  return (
    <>
      <div className="d-flex text-center border-top border-bottom align-items-center">
        <div className="flex-grow-1">
          <div className="btn" onClick={handleOnclickLike}>
            {like ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )}
            <span>
              {" "}
              {handleZero(likeCount)} {suffixS("Like", likeCount)}
            </span>
          </div>
        </div>
        <div className="flex-grow-1">
          <div
            className="btn"
            onClick={() => {
              router.push(`/article/${article.slug}`);
            }}
          >
            <CommentOutlined />
            <span>
              {" "}
              {handleZero(comments.length)} {suffixS("Comment", commentCount)}
            </span>
          </div>
        </div>
      </div>
      {comments.length ? (
        <CardPostComment
          comments={comments}
          commentType={commentType}
        ></CardPostComment>
      ) : null}
    </>
  );
}
