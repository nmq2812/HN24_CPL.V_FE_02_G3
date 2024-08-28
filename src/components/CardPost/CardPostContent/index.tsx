"use client";

import { CommentType } from "@/types/enums";
import { replaceDoubleBackslashN } from "@/ultis/formatText";
import { formatText } from "@/ultis/textToHTML";
import { Tag, Tooltip, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Link from "next/link";

export default function CardPostContent({
  article,
  commentType,
}: {
  article: Article;
  commentType: CommentType;
}) {
  const content = replaceDoubleBackslashN(article.body);

  const isDetail = commentType === CommentType.DetailComment;

  return (
    <>
      <Typography>
        {isDetail ? (
          <Title level={3}>{article.title}</Title>
        ) : (
          <Link href={`/article/${article.slug}`} className="preview-link">
            <Title level={3}>{article.title}</Title>
          </Link>
        )}

        <Paragraph
          style={{ textAlign: "justify" }}
          ellipsis={{
            rows: 3,
            expandable: true,
            symbol: "Read more",
          }}
        >
          {formatText(content)}
        </Paragraph>
        {article.tagList.map((tag) => (
          <Tooltip title={tag} key={tag}>
            <Link href={`/?tag=${tag}`}>
              <Tag style={{ cursor: "pointer", marginBottom: 8 }}>{tag}</Tag>
            </Link>
          </Tooltip>
        ))}
      </Typography>
    </>
  );
}
