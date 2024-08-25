import Feed from "@/components/Feed/Feed";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { cookies } from "next/headers";
import { useAuth } from "@/contexts/auth";

function FavoritesPage() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const searchParams = {
        favorited: "quanggg",
    };
    return (
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
    );
}

export default FavoritesPage;
