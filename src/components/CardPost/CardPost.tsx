"use client";
import { Card } from "antd";
import CardPostHeader from "./CardPostHeader";
import CardPostContent from "./CardPostContent";
import CardPostFooter from "./CardPostFooter";
import { CommentType } from "@/types/enums";

export default function CardPost({
  article,
  currentUser,
}: {
  article: Article;
  currentUser?: Profile;
}) {

  const isMe =
    currentUser!! && currentUser.username === article.author.username;
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
          commentType={CommentType.FeedComment}
        ></CardPostFooter>
      </Card>
    </>
  );
}
