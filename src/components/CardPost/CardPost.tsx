"use client";
import Link from "next/link";
import { formatDate } from "@/ultis/formatTime";
import { Card, Avatar, Typography, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { replaceDoubleBackslashN } from "@/ultis/formatText";
import { formatText } from "@/ultis/textToHTML";

export default function CardPost({ article }: { article: Article }) {
  const { Title, Paragraph } = Typography;
  const content = replaceDoubleBackslashN(article.body);
  return (
    
      <Card>
        <Link href={`/profile/${article.author.username}`} className="author">
          <Meta
            avatar={<Avatar src={article.author.image} />}
            title={article.author.username}
            style={{
              paddingBottom: 20,
              alignItems: "center",
            }}
          />
        </Link>
        <span className="date">{formatDate(article.updatedAt)}</span>
        <Typography>
          <Link href={`article/${article.slug}`} className="preview-link">
            <Title>{article.title}</Title>
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
        </Typography>
      </Card>
  );
}
