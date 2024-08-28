import FollowingFeed from "@/components/FollowingFeed/Feed";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { cookies } from "next/headers";

function FollowingPage() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    return (
        <Layout
            className="col-12 col-md-10 col-xl-8"
            style={{ minHeight: "100%", margin: "0 auto" }}
        >
            <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                <FollowingFeed fetchUrl="/articles/feed" token={token} />
            </Content>
        </Layout>
    );
}

export default FollowingPage;
