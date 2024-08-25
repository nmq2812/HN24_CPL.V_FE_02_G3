"use client";

import { replaceDoubleBackslashN } from "@/ultis/formatText";
import { formatText } from "@/ultis/textToHTML";
import { Tag, Tooltip, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Link from "next/link";

export default function CardPostContent({ article }: { article: Article }) {
  const content = replaceDoubleBackslashN(article.body);
  return (
    <>
      <Typography>
        <Link href={`article/${article.slug}`} className="preview-link">
          <Title level={3}>{article.title}</Title>
        </Link>
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
            <Tag
              style={{ cursor: "pointer", marginBottom: 8 }}
            >
              {tag}
            </Tag>
          </Tooltip>
        ))}
      </Typography>
    </>
  );
}
