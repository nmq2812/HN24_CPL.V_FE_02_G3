"use client";
import { Card } from "antd";

import CardPostHeader from "./CardPostHeader";
import CardPostContent from "./CardPostContent";

export default function CardPost({ article }: { article: Article }) {
  return (
    <Card>
      <CardPostHeader
        author={article.author}
        updatedAt={article.updatedAt}
      ></CardPostHeader>
      <CardPostContent article={article}></CardPostContent>
    </Card>
  );
}
