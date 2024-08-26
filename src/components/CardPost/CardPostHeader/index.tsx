"use client";
import Link from "next/link";
import { formatDate } from "@/ultis/formatTime";
import { Avatar, Dropdown, MenuProps } from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { followUser, unfollowUser } from "@/actions/handleFollow";
import { useAuth } from "@/contexts/auth";
import { Dispatch, SetStateAction, useState } from "react";

export default function CardPostHeader({
  author,
  updatedAt,
  isMe,
}: {
  author: Profile;
  updatedAt: string;
  isMe: boolean;
}) {
  const { user } = useAuth();
  const [follow, setFollow] = useState(author.following);

  const handleFollow = () => {
    if (follow) {
      unfollowUser(author.username, user?.token);
    } else {
      followUser(author.username, user?.token);
    }
    setFollow(!follow);
  };

  const items: MenuProps["items"] = [
    {
      key: "follow",
      label: (
        <div onClick={handleFollow}>
          {" "}
          <UserAddOutlined /> {follow ? "Followed" : "Follow"}
        </div>
      ),
    },
  ];

  isMe
    ? items.push({
        key: "edit",
        label: (
          <div>
            <EditOutlined /> Edit
          </div>
        ),
      })
    : null;
  console.log("cardpost header", author.following);
  return (
    <div className="d-flex align-items-center mb-2">
      <div className="flex-grow-1 d-flex align-items-center ">
        <Link href={`/profile/${author.username}`}>
          <Avatar size={50} src={author.image} />
        </Link>
        <div className="ms-2 rounded p-2">
          <Link href={`/profile/${author.username}`}>
            <strong>{author.username}</strong>
          </Link>

          <div
            className="date fw-lighter text-muted"
            style={{ fontSize: "0.6rem" }}
          >
            {formatDate(updatedAt)}
          </div>
        </div>
      </div>
      <div>cmm {author.following ? "true" : "false"}</div>
      <Dropdown menu={{ items }}>
        <div
          className="d-flex align-items-center btn btn-light fs-3 rounded-circle justify-content-center"
          style={{ width: "40px", height: "40px" }}
        >
          <div className="pb-3">...</div>
        </div>
      </Dropdown>
    </div>
  );
}
