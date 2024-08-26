"use client";
import { Card } from "antd";
import CardPostHeader from "./CardPostHeader";
import CardPostContent from "./CardPostContent";
import CardPostFooter from "./CardPostFooter";
import ModalPost from "../Modal/ModalPost";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CommentType } from "@/types/enums";

export default function CardPost({
  article,
  currentUser,
}: {
  article: Article;
  currentUser?: Profile;
}) {

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const isMe =
    currentUser!! && currentUser.username === article.author.username;
  console.log(currentUser);
  return (
    <>
      <Card>
        <CardPostHeader
          author={article.author}
          updatedAt={article.updatedAt}
          isMe={isMe}
        ></CardPostHeader>
        <CardPostContent article={article}></CardPostContent>
        <CardPostFooter
          article={article}
          showModal={showModal}
          commentType={CommentType.FeedComment}
        ></CardPostFooter>
      </Card>
      <ModalPost
        article={article}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        isMe={isMe}
      ></ModalPost>
    </>
  );
}
