"use client";
import { getClickedArticle } from "@/actions/handleArticle";
import { Space, Card, Avatar, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Feed() {
    const { Title, Paragraph, Text, Link } = Typography;
    const router = useSearchParams();
    const slug = router.get("slug");
    const [article, setArticle] = useState<Article>();
    console.log(article);
    useEffect(() => {
        if (typeof slug === "string") {
            (async function () {
                const result = await getClickedArticle(slug);
                setArticle(result.article);
            })();
        } else {
            console.error(typeof slug);
        }
    }, []);

    return (
        <div className="container">
            <div className="article-page">
                <Space align="center" className="w-100 justify-content-center">
                    <Card style={{ width: "40vw" }}>
                        <Meta
                            avatar={<Avatar src={article?.author?.image} />}
                            title={article?.author?.username}
                            description={article?.description}
                        />
                        <Typography>
                            <Paragraph>{article?.body}</Paragraph>
                        </Typography>
                    </Card>
                </Space>
            </div>
        </div>
    );
}

export default Feed;
