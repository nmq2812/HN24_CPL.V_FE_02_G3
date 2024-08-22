"use client";
import { getArticles } from "@/actions/handleArticle";
import CardPost from "@/components/CardPost/CardPost";
import { Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function LoadMore() {
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number | null>(2);
  const [data, setData] = useState<Article[]>([]);

  useEffect(() => {
    if (inView) {
      if (page === null) return;
      getArticles({ limit: 4, page: page })
        .then((articles) => {
          setData([...data, ...articles.data]);
          setPage(page + 1);
        })
        .catch(() => setPage(null));
    }
  }, [inView, data, page]);
  return (
    <>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {data.map((article: Article) => (
          <CardPost key={article.slug} article={article} />
        ))}
      </Space>
      <section className="d-flex justify-content-center align-items-center">
        <div ref={ref}>
          <Spin size="large" />
        </div>
      </section>
    </>
  );
}
