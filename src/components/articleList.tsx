"use client";
import { getArticles } from "@/actions/handleArticle";
import { Avatar, notification } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatDate } from "@/ultis/formatTime";

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
                        <div className="article-meta">
                            <Link href={`/profile/${item.author.username}`}>
                                <Avatar src={item.author.image} />
                            </Link>
                            <div className="info">
                                <Link
                                    href={`/profile/${item.author.username}`}
                                    className="author"
                                >
                                    {item.author.username}
                                </Link>
                                <span className="date">
                                    {formatDate(item.updatedAt)}
                                </span>
                            </div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"></i>{" "}
                                {item.favoritesCount}
                            </button>
                        </div>
                        <Link
                            href={`article/${item.slug}`}
                            className="preview-link"
                        >
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <span>Read more...</span>
                            <ul className="tag-list">
                                {item.tagList.map((tag, i) => (
                                    <li
                                        className="tag-default tag-pill tag-outline"
                                        key={i}
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </Link>
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

