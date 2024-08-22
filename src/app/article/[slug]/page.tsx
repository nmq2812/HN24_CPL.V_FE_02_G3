"use client";
import { getClickedArticle } from "@/actions/handleArticle";
import { handleLike, handleUnlike } from "@/actions/handleLike";
import { LikeOutlined, CommentOutlined, LikeFilled } from "@ant-design/icons";
import { Space, Card, Avatar, Typography, Button, List } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { useEffect, useState } from "react";


function Post({ params }: { params: { slug: string } }) {
    const { Title, Paragraph, Text } = Typography;
    const slug = params.slug;
    const [article, setArticle] = useState<Article>();


  const [like, setLike] = useState(article?.favorited);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof slug === "string") {
      (async function () {
        const result = await getClickedArticle(slug, token!!);
        setArticle(result.article);
      })();
    } else {
      console.error(typeof slug);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    like
      ? handleUnlike(article?.slug!!, token!!)
      : handleLike(article?.slug!!, token!!);
  }, [like]);

  return (
    <div className="container">
      <div className="article-page">
        <Space align="center" className="w-100 justify-content-center">
          <Card style={{ width: "40vw" }}>
            <Link
              href={`/profile/${article?.author.username}`}
              className="author"
            >
              <Meta
                avatar={<Avatar src={article?.author?.image} />}
                title={article?.author?.username}
                style={{
                  paddingBottom: 20,
                  alignItems: "center",
                }}
              />
            </Link>

            <Typography>
              <Title>{article?.title}</Title>
              <Paragraph style={{ textAlign: "justify" }}>
                {article?.body}
              </Paragraph>
              <Button
                type="default"
                icon={like ? <LikeFilled /> : <LikeOutlined />}
                onClick={() => {
                  setLike(!like);
                }}
              >
                Like
              </Button>
              <Button
                type="default"
                icon={<CommentOutlined />}
                onClick={() => console.log("Commented!")}
              >
                Comment
              </Button>
            </Typography>
          </Card>
        </Space>
      </div>
    </div>
  );

}

export default Post;
