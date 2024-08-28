"use client";
import { Avatar, Button, Card, Layout } from "antd";
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

    useEffect(() => {
        async function fetchProfile() {
            const data = await getProfile(username);
            setProfile(data.profile);
            setFollow(data.profile?.following);
        }
        fetchProfile();
    }, []);

    const handleFollowChange = async () => {
        setFollow(!follow);
        follow
            ? handleUnfollow(profile?.username!!, token!!)
            : await handleFollow(profile?.username!!, token!!);
    };

    const { user } = useAuth();
    const token = user?.token;

    const isCurrentUser = useMemo(
        () => username === user?.username,
        [username, user]
    );

    const searchParams = { author: profile?.username };

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <div className="row">
                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <img
                                        src={profile?.image}
                                        className="user-img"
                                        alt="profile avatar"
                                    />
                                    <h4>{profile?.username}</h4>
                                    <p>{profile?.bio}</p>
                                    {isCurrentUser ? (
                                        <a
                                            className="btn btn-sm btn-outline-secondary action-btn"
                                            href="/settings"
                                        >
                                            <i className="ion-gear-a" /> Edit
                                            Profile Settings
                                        </a>
                                    ) : (
                                        <Button
                                            type={
                                                follow ? "primary" : "default"
                                            }
                                            onClick={handleFollowChange}
                                        >
                                            {follow ? "Unfollow" : "Follow"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Layout
                className="col-12 col-md-10 col-xl-8"
                style={{ minHeight: "100%", margin: "0 auto" }}
            >
                <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                    <Feed
                        fetchUrl="/articles"
                        optionals={searchParams}
                        token={token}
                        currentUser={profile}
                    />
                </Content>
            </Layout>
        </div>
    );
}
