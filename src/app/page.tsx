import "./page.module.css";
import "antd/dist/reset.css";
import { Col, Layout, Row } from "antd";
import Feed from "@/components/Feed/Feed";
import { Content } from "antd/es/layout/layout";
import TagList from "@/components/tagList";
import { cookies } from "next/headers";
<<<<<<< Updated upstream
import { getCurrentUser } from "@/actions/authAction";
import NewPost from "@/components/NewPost";

export default async function Home({
  searchParams,
=======
import FormNewPost from "@/components/FormNewPost";

export default function Home({
    searchParams,
>>>>>>> Stashed changes
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
<<<<<<< Updated upstream
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = token && (await getCurrentUser(token)).data;

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
              currentUser={user}
            />
          </Col>
          <Col className="tags order-first order-lg-0" xs={24} lg={8}>
            <TagList />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
=======
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    return (
        <Layout
            className="col-12 col-md-10 col-xl-8"
            style={{ minHeight: "100%", margin: "0 auto" }}
        >
            <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                <Row gutter={24} align="top" className="gap-4">
                    <Col xs={24} md={16} lg={16} style={{ padding: "0" }}>
                        <FormNewPost></FormNewPost>
                        <Feed
                            fetchUrl="/articles"
                            optionals={searchParams}
                            token={token}
                        />
                    </Col>

                    <Col
                        xs={24}
                        md={6}
                        lg={6}
                        style={{
                            padding: "0",
                            position: "sticky",
                            top: "80px",
                        }}
                    >
                        <TagList />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
>>>>>>> Stashed changes
}
