"use client";
import { getComment } from "@/actions/handleComments";
import { handleZero, suffixS } from "@/ultis/formatText";
import { CommentOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CommentType } from "@/types/enums";
import CardPostComment from "../CardPostComment";
import { useAuth } from "@/contexts/auth";
import { handleLike, handleUnlike } from "@/actions/handleLike";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CardPostFooter({
  article,
  commentType,
  commentsSize,
}: {
  article: Article;
  commentType: CommentType;
  commentsSize: number;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const isDetail = commentType === CommentType.DetailComment;

  const handleOnclickLike = () => {
    if (user?.token) {
      if (!article.favorited) {
        handleLike(article.slug, user?.token!!);
      } else {
        handleUnlike(article.slug, user?.token!!);
      }
    } else {
      toast.error("You need to login to do more");
      router.push("/login");
    }
  };

  return (
    <>
      <div className="d-flex text-center border-top border-bottom align-items-center">
        <div className="flex-grow-1">
          <div className="btn" onClick={handleOnclickLike}>
            {article.favoritesCount ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )}
            <span>
              {" "}
              {handleZero(article.favoritesCount)}{" "}
              {suffixS("Like", article.favoritesCount)}
            </span>
          </div>
        </div>
        <div className="flex-grow-1">
          <div
            className="btn"
            onClick={
              isDetail
                ? () => {}
                : () => {
                    router.push(`/article/${article.slug}`);
                  }
            }
          >
            <CommentOutlined />
            <span>
              {" "}
              {handleZero(commentsSize)} {suffixS("Comment", commentsSize)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
