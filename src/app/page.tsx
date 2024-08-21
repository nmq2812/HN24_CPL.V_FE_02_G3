import ArticleList from "@/components/articleList";
import "./page.module.css";
import TagList from "@/components/tagList";
import "antd/dist/reset.css";
import { Layout, Row, Col } from "antd";

export default function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row gutter={16}>
        {/* Bên trái: Danh sách bài viết */}
        <Col span={16} style={{ justifyContent: "center", display: "flex" }}>
          <ArticleList />
        </Col>

        {/* Bên phải: Danh sách thẻ tag */}
        <TagList></TagList>
      </Row>
    </Layout>
  );
}
