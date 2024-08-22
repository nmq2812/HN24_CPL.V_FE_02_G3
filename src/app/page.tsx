"use server";
import "./page.module.css";
import TagList from "@/components/tagList";
import "antd/dist/reset.css";
import { Layout, Row, Col } from "antd";
import GlobalFeed from "@/components/Feed/GlobalFeed";
import { Content } from "antd/es/layout/layout";

export default async function Home() {
    return (
        <Layout
            style={{ minHeight: "100vh", maxWidth: "80%", margin: "0 auto" }}
        >
            <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                <Row gutter={24} align="top">
                    {/* Bên trái: Danh sách bài viết */}
                    <Col xs={24} md={18} lg={16} style={{ padding: "0" }}>
                        <GlobalFeed />
                    </Col>

                    {/* Bên phải: Danh sách thẻ tag */}
                    <Col
                        xs={24}
                        md={6}
                        lg={8}
                        style={{
                            padding: "0",
                            // position: "-webkit-sticky",
                            position: "sticky",
                            top: "0",
                        }}
                    >
                        <TagList />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}
