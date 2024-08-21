"use client";
import { getArticles } from "@/apis/articles";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ArticlesProp {
  articles: Article[];
}

export default function ArticleList() {
  const [feedState, setFeedState] = useState("global");
  const [articlesResponse, setArticlesResponse] = useState<ArticleResponse>();
  useEffect(() => {
    (async function () {
      setArticlesResponse(await getArticles());
    })();
  }, []);

  //phân trang
  //hiện giờ mặc định chỉ lấy được 10 item từ Articles API, xử lý để lấy hết dữ liệu và phân trang
  //cách 1: fectch data theo trang hiện tại, vào phần nào fetch phần đó (xử lý đơn giản nhưng có thời gian giãn cách giữa các lần chuyển trang) - server executing
  //cách 2: lấy hết data về 1 lần rồi xử lý logic để phân riêng ra các trang - client execuiting
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pagination: JSX.Element[] = [];
  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // xử lý articlesResponse để lấy data
  };
  for (let i = 0; i <= articlesResponse?.articlesCount!! / 10; i++) {
    pagination.push(
      <li
        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
        key={i}
      >
        <a
          className="page-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleClick(i + 1);
          }}
        >
          {i + 1}
        </a>
      </li>
    );
  }

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a
              className={
                feedState === "personal" ? "nav-link active" : "nav-link"
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
                feedState === "global" ? "nav-link active" : "nav-link"
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
        <GlobalFeedList
          articles={articlesResponse?.articles!!}
        ></GlobalFeedList>
      ) : (
        <PersonalFeedList></PersonalFeedList>
      )}

      <nav>
        <ul className="pagination">{pagination}</ul>
      </nav>
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
                <img src={item.author.image} />
              </Link>
              <div className="info">
                <Link
                  href={`/profile/${item.author.username}`}
                  className="author"
                >
                  {item.author.username}
                </Link>
                <span className="date">{formatDate(item.updatedAt)}</span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i> {item.favoritesCount}
              </button>
            </div>
            <Link href={`article/${item.slug}`} className="preview-link">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <span>Read more...</span>
              <ul className="tag-list">
                {item.tagList.map((tag, i) => (
                  <li className="tag-default tag-pill tag-outline" key={i}>
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
