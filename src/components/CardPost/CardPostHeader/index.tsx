"use client";
import Link from "next/link";
import { formatDate } from "@/ultis/formatTime";
import { Avatar } from "antd";
import Meta from "antd/es/card/Meta";

export default function CardPost({
  author,
  updatedAt,
}: {
  author: Author;
  updatedAt: string;
}) {
  return (
    <>
      <Link href={`/profile/${author.username}`} className="author">
        <Meta
          avatar={<Avatar size={40} src={author.image} />}
          title={<div style={{ margin: 0, padding: 0 }}>{author.username}</div>}
          description={
            <span className="date fw-lighter" style={{ fontSize: 10 }}>
              {formatDate(updatedAt)}
            </span>
          }
          style={{
            paddingBottom: 20,
            alignItems: "center",
          }}
        />
      </Link>
    </>
  );
}
