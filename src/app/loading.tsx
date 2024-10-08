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
          avatar={<Avatar src="" />}
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
    <Layout
      className="col-12 col-lg-10 col-xl-8"
      style={{ minHeight: "100%", margin: "0 auto" }}
    >
      <Content style={{ padding: "0 24px", marginTop: "16px" }}>
        <Row gutter={24} align="top">
          <Col xs={24} md={18} lg={16}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {cards}
            </Space>
          </Col>

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
