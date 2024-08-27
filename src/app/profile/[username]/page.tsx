"use client";

import { Avatar, Button, Card, Col, Layout, Row } from "antd";
import { getProfile } from "@/actions/handleProfile";
import { useAuth } from "@/contexts/auth";
import { useEffect, useMemo, useState } from "react";
import { handleFollow, handleUnfollow } from "@/actions/handleFollowing";
import dynamic from "next/dynamic";

const Feed = dynamic(() => import("@/components/Feed/Feed"), { ssr: false });
const Content = dynamic(
    () => import("antd/es/layout/layout").then((mod) => mod.Content),
    { ssr: false }
);

export default function ProfilePage({
    params,
}: {
    params: { username: string };
}) {
    const username = params.username;
    const [profile, setProfile] = useState<Profile>();
    const [follow, setFollow] = useState(profile?.following);
    const { user } = useAuth();
    const token = user?.token;
    console.log(token);

    useEffect(() => {
        (async function () {
            const data = await getProfile(username, token);
            setProfile(data.profile);
            // setLoading(false);
        })();
    }, [profile]);

    const handleFollowChange = async () => {
        if (follow) {
            await handleUnfollow(profile?.username!!, token!!);
        } else {
            await handleFollow(profile?.username!!, token!!);
        }
        setFollow(!follow);
    };

    const isCurrentUser = useMemo(
        () => username === user?.username,
        [username, user]
    );

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    const searchParams = {
        author: profile?.username,
    };

    return (
        <Layout className="profile-page">
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
                                        type={follow ? "primary" : "default"}
                                        onClick={handleFollowChange}
                                    >
                                        {follow ? "Follow" : "Unfollow"}
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Layout
                    className="col-12 col-md-10 col-xl-8"
                    style={{ minHeight: "100%", margin: "0 auto" }}
                >
                    <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                        <Feed
                            fetchUrl="/articles"
                            optionals={searchParams}
                            token={token}
                        />
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
}
