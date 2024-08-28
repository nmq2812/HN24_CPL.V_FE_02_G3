"use client";
import { getArticles } from "@/actions/handleArticle";
import CardPost from "@/components/CardPost/CardPost";
import { Skeleton, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function LoadMore({
    fetchUrl,
    optionals,
    token,
    currentUser,
}: {
    fetchUrl: string;
    optionals?: { [key: string]: string | string[] | undefined };
    token?: string;
    currentUser?: Profile;
}) {
    const { ref, inView } = useInView();
    const [page, setPage] = useState<number | null>(2);
    const [data, setData] = useState<Article[]>([]);

    useEffect(() => {
        if (inView) {
            if (page === null) return;
            getArticles(
                fetchUrl,
                {
                    limit: 4,
                    page: page,
                    ...optionals,
                },
                token
            )
                .then((res) => {
                    setData([...data, ...res.data]);
                    setPage(res.nextPage ? page + 1 : null);
                })
                .catch(() => setPage(null));
        }
    }, [inView, data, page]);
    return (
        <>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                {data.map((article: Article) => (
                    <CardPost
                        key={article.slug}
                        article={article}
                        currentUser={currentUser}
                    />
                ))}
                {page ? (
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                ) : (
                    <div className="w-100 text-center p-2 my-2">
                        Không còn bài viết
                    </div>
                )}
            </Space>
        </>
    );
}
