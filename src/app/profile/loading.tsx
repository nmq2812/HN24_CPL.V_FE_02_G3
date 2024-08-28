"use client";
import { Avatar, Button, Card, Space, Spin } from "antd";
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
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img className="user-img" alt="profile avatar" />
            <p className="pb-1"></p>
          </div>
        </div>
      </div>
      <Layout
        className="col-12 col-md-10 col-xl-8"
        style={{ minHeight: "100%", margin: "0 auto" }}
      >
        <div className="d-flex justify-content-end mx-4 mb-3 gap-3">
          <Button loading={true}></Button>
        </div>
        <Content style={{ padding: "0 24px", marginTop: "16px" }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {cards}
          </Space>
        </Content>
      </Layout>
    </div>
  );
}
