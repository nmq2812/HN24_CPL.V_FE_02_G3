import "./page.module.css";
import "antd/dist/reset.css";
import { Layout, Row, Col } from "antd";
import Feed from "@/components/Feed/Feed";
import { Content } from "antd/es/layout/layout";
import TagList from "@/components/tagList";
import { cookies } from "next/headers";

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  0;

  return (
      <Layout
          className="col-12 col-md-10 col-xl-8"
          style={{ minHeight: "100%", margin: "0 auto" }}
      >
          <Content style={{ padding: "0 24px", marginTop: "16px" }}>
              <Row gutter={24} align="top" className="gap-4">
                  <Col xs={24} md={16} lg={16} style={{ padding: "0" }}>
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
}
