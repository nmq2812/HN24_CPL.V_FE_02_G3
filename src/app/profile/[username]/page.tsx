import { Avatar, Button, Card, Col, Layout } from "antd";
import { getProfile } from "@/actions/handleProfile";
import Feed from "@/components/Feed/Feed";
import { Content } from "antd/es/layout/layout";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/actions/authAction";
import ButtonActionProfile from "@/components/Button/ButtonActionProfile";
import { CommentType } from "@/types/enums";
import Link from "next/link";
import SelectFilter from "@/components/SelectOption/SelectFilterProfile";

export default async function ProfilePage({
    params,
    searchParams,
}: {
    params: { username: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const currentUser = token && (await getCurrentUser(token)).data;

    const username = params.username;
    const res = await getProfile(username, token);
    const profile = res.profile;

    searchParams = {
        ...searchParams,
        author: profile.username,
    };

    const fetchUrl = searchParams.fetchUrl
        ? searchParams.fetchUrl
        : "/articles";

    const isMe = currentUser!! && profile.username === currentUser.username;

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="text-center col-xs-12 col-md-10 offset-md-1 py-4">
                        <Avatar
                            size={128}
                            src={profile?.image}
                            className="user-img"
                            alt="profile avatar"
                        />
                        <h4 className="fw-bold">{profile?.username}</h4>
                        <p className="pb-1">{profile?.bio}</p>
                    </div>
                </div>
            </div>

            <Layout
                className="col-12 col-md-10 col-xl-8"
                style={{ minHeight: "100%", margin: "0 auto" }}
            >
                <div className="d-flex justify-content-end mx-4 mb-3 gap-3">
                    <SelectFilter></SelectFilter>
                    <ButtonActionProfile
                        token={token}
                        isMe={isMe}
                        profile={profile}
                    />
                </div>
                {isMe ? (
                    <Card
                        style={{ margin: "0 24px", borderColor: "lightgray" }}
                    >
                        <Avatar
                            size={45}
                            src={profile?.image}
                            style={{ marginRight: "24px" }}
                        />
                        <Button
                            type="text"
                            style={{
                                padding: "24px 0",
                                backgroundColor: "lightgray",
                                color: "black",
                                borderRadius: "24px",
                                width: "88%",
                            }}
                        >
                            <Link href={"/editor"}>
                                What’s on your mind, {profile?.username}?
                            </Link>
                        </Button>
                    </Card>
                ) : null}

                <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                    <Feed
                        fetchUrl={fetchUrl as string}
                        optionals={searchParams}
                        token={token}
                        commentType={CommentType.FeedComment}
                    />
                </Content>
            </Layout>
        </div>
    );
}
