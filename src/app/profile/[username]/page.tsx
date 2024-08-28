import { Avatar, Button, Card, Layout } from "antd";
import { getProfile } from "@/actions/handleProfile";
import Feed from "@/components/Feed/Feed";
import { Content } from "antd/es/layout/layout";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/actions/authAction";
import ButtonActionProfile from "@/components/Button/ButtonActionProfile";
import { CommentType } from "@/types/enums";

export default async function ProfilePage({
    params,
}: {
    params: { username: string };
}) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const currentUser = token && (await getCurrentUser(token)).data;

    const username = params.username;
    const res = await getProfile(username, token);
    const profile = res.profile;

    const searchParams = {
        author: profile.username,
    };

    const isMe = currentUser!! && profile.username === currentUser.username;

    console.log(searchParams);

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
                                    <p className="pb-1">{profile?.bio}</p>
                                    <ButtonActionProfile
                                        token={token}
                                        isMe={isMe}
                                        profile={profile}
                                    />
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
                        commentType={CommentType.DetailComment}
                    />
                </Content>
            </Layout>
        </div>
    );
}
