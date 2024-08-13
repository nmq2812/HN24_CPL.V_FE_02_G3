"use client";
import getArticles from "@/api/articles";
import { useState, useEffect } from "react";

export default function ArticleList() {
    const [feedState, setFeedState] = useState("global");
    const [articles, setArticles] = useState<Article[]>();
    useEffect(() => {
        (async function () {
            setArticles(await getArticles());
        })();
    });

    return (
        <div className="col-md-9">
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                        <a
                            className={
                                feedState === "personal"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            href="#"
                            onClick={() => setFeedState("personal")}
                        >
                            Your Feed
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={
                                feedState === "global"
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                            href="#"
                            onClick={() => setFeedState("global")}
                        >
                            Global Feed
                        </a>
                    </li>
                </ul>
            </div>

            {feedState === "global" ? (
                <GlobalFeedList articles={articles!!}></GlobalFeedList>
            ) : (
                <PersonalFeedList></PersonalFeedList>
            )}
        </div>
    );
}

const GlobalFeedList = ({ articles }: ArticleResponse) => {
    return (
        <div className="">
            {articles != undefined ? (
                articles.map((item) => (
                    <div className="article-preview">
                        <div className="article-meta">
                            <a href="profile.html">
                                <img src={item.author.image} />
                            </a>
                            <div className="info">
                                <a href="" className="author">
                                    {item.author.username}
                                </a>
                                <span className="date">
                                    {formatDate(item.updatedAt)}
                                </span>
                            </div>
                            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                <i className="ion-heart"></i>{" "}
                                {item.favoritesCount}
                            </button>
                        </div>
                        <a href="" className="preview-link">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <span>Read more...</span>
                            <ul className="tag-list">
                                {item.tagList.map((tag) => (
                                    <li className="tag-default tag-pill tag-outline">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </a>
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

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
}
