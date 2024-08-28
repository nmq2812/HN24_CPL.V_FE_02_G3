"use client";

import { Avatar, Button, Card, Col, Layout, MenuProps, Row, Spin } from "antd";
import { getProfile } from "@/actions/handleProfile";
import { useAuth } from "@/contexts/auth";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { handleFollow, handleUnfollow } from "@/actions/handleFollowing";
import { Menu } from "antd";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";
import { LoadingModuleData } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Loading from "@/app/loading";

const Feed = dynamic(() => import("@/components/Feed/Feed"), { ssr: false });
const Content = dynamic(
    () => import("antd/es/layout/layout").then((mod) => mod.Content),
    { ssr: false }
);
type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
    {
        label: "My Feed",
        key: "myFeed",
    },
    {
        label: "Following Feed",
        key: "followingFeed",
    },
];

export default function ProfilePage({

    params,

}: {
    params: { username: string };
    const username = params.username;
    const [loading, setLoading] = useState(true);
    const [feedContent, setFeedContent] = useState<JSX.Element | null>(null);
    const [profile, setProfile] = useState<Profile | undefined>();
    const [follow, setFollow] = useState(profile?.following);
    const [current, setCurrent] = useState("myFeed");
    const { user } = useAuth();
    const token = user?.token;

    useEffect(() => {
        (async () => {
            setLoading(true);
            const content = (
                <Feed
                    fetchUrl="/articles"
                    optionals={searchParams}
                    token={token}
                />
            );
            setFeedContent(content);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        (async function () {
            const data = await getProfile(username, token);
            setProfile(data.profile);
            // setLoading(false);
        })();
    }, [user]);

    const handleFollowChange = async () => {
        if (follow) {
            handleUnfollow(profile?.username!!, token!!);
        } else {
            handleFollow(profile?.username!!, token!!);
        }
        setFollow(!follow);
    };

    const isCurrentUser = useMemo(
        () => username === user?.username,
        [username, user]
    );

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };
    const searchParams = {
        author: profile?.username,
    };

    return (
        <Layout className="profile-page">
            {profile ? (
                <Content>
                    <Row justify="center" className="user-info">
                        <Col xs={24} md={10}>
                            <Row justify="center">
                                <Col
                                    xs={24}
                                    md={12}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <Avatar
                                        size={120}
                                        src={profile?.image}
                                        alt="profile avatar"
                                        className="user-img"
                                    />
                                    <h3>{profile?.username}</h3>
                                    <p>{profile?.bio}</p>
                                    {isCurrentUser ? (
                                        <Button
                                            type="default"
                                            icon={<i className="ion-gear-a" />}
                                            href="/settings"
                                            className="action-btn"
                                        >
                                            Edit Profile Settings
                                        </Button>
                                    ) : (
                                        <Button
                                            type={
                                                follow ? "primary" : "default"
                                            }
                                            onClick={handleFollowChange}
                                        >
                                            {follow ? "Follow" : "Unfollow"}
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {profile ? (
                        <div className=""></div>
                    ) : (
                        <Skeleton active paragraph={{ rows: 4 }} />
                    )}
                    <Layout
                        className="col-12 col-md-10 col-xl-8"
                        style={{ minHeight: "100%", margin: "0 auto" }}
                    >
                        {isCurrentUser ? (
                            <Content
                                style={{ padding: "0 24px", marginTop: "16px" }}
                            >
                                <Menu
                                    onClick={onClick}
                                    selectedKeys={[current]}
                                    mode="horizontal"
                                    items={items}
                                    style={{
                                        justifyContent: "center",
                                        backgroundColor: "inherit",
                                    }}
                                />
                                {current === "myFeed" && (
                                    <Feed
                                        fetchUrl="/articles"
                                        optionals={searchParams}
                                        token={token}
                                    />
                                )}
                                {current === "followingFeed" && (
                                    <Feed
                                        fetchUrl="/articles/feed"
                                        token={token}
                                        currentUser={profile}
                                    />
                                )}
                            </Content>
                        ) : (
                            <Content
                                style={{ padding: "0 24px", marginTop: "16px" }}
                            >
                                <Feed
                                    fetchUrl="/articles"
                                    optionals={searchParams}
                                    token={token}
                                />
                            </Content>
                        )}
                    </Layout>
                </Content>
            ) : (
                <Spin size="large" />
            )}
        </Layout>
    );
}

