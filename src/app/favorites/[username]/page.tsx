import Feed from "@/components/Feed/Feed";
import { Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { cookies } from "next/headers";
import TagList from "@/components//Tag/tagList";
import { getCurrentUser } from "@/actions/authAction";
import { CommentType } from "@/types/enums";

async function FavoritesPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const user = token && (await getCurrentUser(token)).data;

    searchParams = {
        ...searchParams,
        favorited: user.username,
    };
    return (
        <Layout
            className="col-12 col-lg-10 col-xl-8"
            style={{ minHeight: "100%", margin: "0 auto" }}
        >
            <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                <Row gutter={24} align="top" className="gap-4">
                    <Col xs={24} lg={14} style={{ padding: "0" }}>
                        <Feed
                            fetchUrl="/articles"
                            optionals={searchParams}
                            token={token}
                            commentType={CommentType.DetailComment}
                        />
                    </Col>
                    <Col className="tags order-first order-lg-0" xs={24} lg={8}>
                        <TagList />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default FavoritesPage;
