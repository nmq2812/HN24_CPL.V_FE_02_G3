import "./page.module.css";
import TagList from "@/components/tagList";
import "antd/dist/reset.css";
import { Layout, Row, Col } from "antd";
import GlobalFeed from "@/components/Feed/GlobalFeed";
import { Content } from "antd/es/layout/layout";

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log("ADASDASD", searchParams);
  return (
    <Layout
      className="col-12 col-md-10 col-xl-8"
      style={{ minHeight: "100vh", margin: "0 auto" }}
    >
      <Content style={{ padding: "0 24px", marginTop: "16px" }}>
        <Row gutter={24} align="top" className="gap-4">
          <Col xs={24} md={16} lg={16} style={{ padding: "0" }}>
            <GlobalFeed />
          </Col>

          <Col
            xs={24}
            md={6}
            lg={6}
            style={{
              padding: "0",
              // position: "-webkit-sticky",
              position: "sticky",
              top: "80px",
              right: 0,
            }}
          >
            <TagList />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
