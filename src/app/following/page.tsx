import { getCurrentUser } from "@/actions/authAction";
import Feed from "@/components/Feed/Feed";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { cookies } from "next/headers";

async function FollowingPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token && (await getCurrentUser(token)).data;

  return (
    <Layout
      className="col-12 col-md-8 col-lg-6"
      style={{ minHeight: "100%", margin: "0 auto" }}
    >
      <Content style={{ padding: "0 24px", marginTop: "16px" }}>
        <Feed fetchUrl="/articles/feed" token={token} currentUser={user} />
      </Content>
    </Layout>
  );
}

export default FollowingPage;
