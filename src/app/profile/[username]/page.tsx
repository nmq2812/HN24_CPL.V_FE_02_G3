// "use client";
import { Avatar, Button, Card, Flex, Layout, List, Typography } from "antd";
import Feed from "@/components/Feed/Feed";
import { Content } from "antd/es/layout/layout";
import { cookies } from "next/headers";
import Link from "antd/es/typography/Link";
import { getCurrentUser } from "@/actions/authAction";
import { getProfile } from "@/actions/handleProfile";

export default async function ProfilePage({
    params,
}: {
    params: { username: string };
}) {
    const username = params.username;
    const res = await getProfile(username);
    const profile = res.profile;

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value ?? "";
    const searchParams = {
        author: profile?.username,
    };

    const userResponse = await getCurrentUser(token);
    const user = userResponse.success ? userResponse.data : null;
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
                                    {
                                        username === user?.username ? (
                                            <a
                                                className="btn btn-sm btn-outline-secondary action-btn"
                                                href="/settings"
                                            >
                                                <i className="ion-gear-a" /> Edit Profile Settings
                                            </a>
                                        ) : (
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                            // onClick={() => {handleFollowing }}
                                            >
                                                Follow
                                            </button>
                                        )
                                    }
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
                {username === user?.username && (
                    <Card hoverable style={{ margin: "0 24px" }}>
                        <Avatar src={profile?.image} />
                        <Link style={{ margin: '30px', flexGrow: 1, }}
                            href={`/profile/${profile?.username}`} //sửa link tạo bài viết mới
                            className="username"
                        >
                            What&#39;s on your mind, {profile?.username.split(' ')[0]}?
                        </Link>
                    </Card>
                )}

                <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                    <Feed
                        fetchUrl="/articles"
                        optionals={searchParams}
                        token={token}
                    />
                </Content>
            </Layout>
        </div>
    );
}
