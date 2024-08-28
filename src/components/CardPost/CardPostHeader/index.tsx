"use client";
import Link from "next/link";
import { formatDate } from "@/ultis/formatTime";
import { Avatar, Dropdown, MenuProps } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ProfileOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { followUser, unfollowUser } from "@/actions/handleFollow";
import { useAuth } from "@/contexts/auth";
import { useState } from "react";
import { TruncateText } from "@/ultis/TruncateText";
import { CommentType } from "@/types/enums";
import { deleteArticle } from "@/actions/handleArticle";

export default function CardPostHeader({
    author,
    updatedAt,
    slug,
    commentType,
}: {
    author: Profile;
    updatedAt: string;
    slug: string;
    commentType: CommentType;
}) {
    const { user } = useAuth();
    const [follow, setFollow] = useState(author.following);
    const isMe = user!! && user.username === author.username;
    const isDetail = commentType === CommentType.DetailComment;

    const handleFollow = () => {
        if (follow) {
            unfollowUser(author.username, user?.token);
        } else {
            followUser(author.username, user?.token);
        }
        setFollow(!follow);
    };

    const handleDelete = () => {
        deleteArticle(slug, user?.token!!);
    };

    const items: MenuProps["items"] = [
        {
            key: "detail",
            label: (
                <Link href={`/article/${slug}`}>
                    {" "}
                    <ProfileOutlined /> Detail
                </Link>
            ),
        },
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

    if (isDetail) {
        items.shift();
    }

    if (isMe) {
        items.pop();
        items.push({
            key: "edit",
            label: (
                <Link href={`/editor/${slug}`}>
                    <EditOutlined /> Edit
                </Link>
            ),
        });
        items.push({
            key: "delete",
            label: (
                <div onClick={handleDelete}>
                    <DeleteOutlined /> Delete
                </div>
            ),
        });
    }
    return (
        <div className="d-flex align-items-center mb-2">
            <div className="flex-grow-1 d-flex align-items-center ">
                <Link href={`/profile/${author.username}`}>
                    <Avatar size={40} src={author.image} />
                </Link>
                <div className="ms-2 rounded p-2">
                    <Link href={`/profile/${author.username}`}>
                        <TruncateText text={author.username} maxLength={10} />
                    </Link>

                    <div
                        className="date fw-lighter text-muted"
                        style={{ fontSize: "0.6rem" }}
                    >
                        {formatDate(updatedAt)}
                    </div>
                </div>
            </div>
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
