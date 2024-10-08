"use server";
import "./page.module.css";
import "antd/dist/reset.css";
import { Col, Layout, Row } from "antd";
import Feed from "@/components/Feed/Feed";
import { Content } from "antd/es/layout/layout";
import TagList from "@/components/Tag/tagList";
import { cookies } from "next/headers";

import { getCurrentUser } from "@/actions/authAction";
import { getTags } from "@/actions/handleTags";
import { CommentType } from "@/types/enums";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const tags = await getTags();

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
              commentType={CommentType.FeedComment}
            />
          </Col>
          <Col className="tags order-first order-lg-0" xs={24} lg={8}>
            <TagList searchParams={searchParams} tags={tags} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
