"use client";
import { Avatar, Card, Space } from "antd";
import { Layout, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { ReactNode } from "react";
export default function Loading() {
  const cards: ReactNode = Array.from(
    { length: Number(process.env.NEXT_PUBLIC_LIMIT_ARTICLE) },
    (_, index) => (
      <Card key={index} loading={true}>
        <Card.Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          }
          title={`Card title ${index + 1}`}
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
    )
  );
  return (
    <Layout style={{ minHeight: "100vh", maxWidth: "80%", margin: "0 auto" }}>
      <Content style={{ padding: "0 24px", marginTop: "16px" }}>
        <Row gutter={24} align="top">
          <Col xs={24} md={18} lg={16}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {cards}
            </Space>
          </Col>

          {/* Bên phải: Danh sách thẻ tag */}
          <Col
            xs={24}
            md={6}
            lg={8}
            style={{
              position: "sticky",
              top: "0",
            }}
          ></Col>
        </Row>
      </Content>
    </Layout>
  );
}
