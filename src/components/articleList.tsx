"use client";
import { getArticles } from "@/actions/handleArticle";
import { Avatar, Card, notification } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import CardPost from "./CardPost";

interface ArticlesProp {
    articles: Article[];
}

export default function ArticleList() {
    const [feedState, setFeedState] = useState("global");
    const [articlesResponse, setArticlesResponse] = useState<Article[]>();
    useEffect(() => {
        (async function () {
            const result = await getArticles();
            if (result?.error) {
                notification.open({
                    message: "Lỗi fetch dữ liệu",
                    description: `${result.error}`,
                    onClick: () => {},
                    placement: "top",
                });
            } else {
                setArticlesResponse(result.articles);
            }
        })();
    }, []);

    return (
        <div className="col-md-9">
            <GlobalFeedList articles={articlesResponse!!}></GlobalFeedList>
        </div>
    );
}

const GlobalFeedList = ({ articles }: ArticlesProp) => {
    return (
        <div className="">
            {articles !== undefined ? (
                articles.map((item, index) => (
                    <div className="article-preview" key={index}>
                        <CardPost article={item}></CardPost>
                    </div>
                ))
            ) : (
                <div className="">Loading articles...</div>
            )}
        </div>
    );
};

const PersonalFeedList = () => {
  return (
    <div className="">
      <div>No articles are here... yet.</div>
    </div>
  );
};
