import { getArticles } from "@/actions/handleArticle";
import CardPost from "../CardPost/CardPost";
import LoadMore from "../LoadMore/LoadMore";
import { Skeleton, Space } from "antd";

export default async function Feed({
    fetchUrl,
    optionals,
    token,
<<<<<<< HEAD
    currentUser,
=======
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
}: {
    fetchUrl: string;
    optionals?: { [key: string]: string | string[] | undefined };
    token?: string;
<<<<<<< HEAD
    currentUser?: Profile;
=======
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
}) {
    const res = await getArticles(
        fetchUrl,
        {
            limit: Number(process.env.NEXT_PUBLIC_LIMIT_ARTICLE),
            page: 1,
            ...optionals,
        },
        token
    );

    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
<<<<<<< HEAD
            {res.data?.map((article: Article) => (
                <CardPost
                    article={article}
                    key={article.slug}
                    currentUser={currentUser}
                />
=======
            {res.data?.map((article: Article, index: number) => (
                <CardPost article={article} key={index} />
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
            ))}
            {res?.nextPage ? (
                <LoadMore
                    fetchUrl={fetchUrl}
                    optionals={optionals}
                    token={token}
<<<<<<< HEAD
                    currentUser={currentUser}
                ></LoadMore>
            ) : (
                <div className="w-100 text-center p-2 my-2">
                    Không còn bài viết
=======
                ></LoadMore>
            ) : (
                <div className="w-100 text-center p-2 my-2">
                    Đã hết bài viết
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
                </div>
            )}
        </Space>
    );
}
