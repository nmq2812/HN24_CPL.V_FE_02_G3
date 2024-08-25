import { getArticles } from "@/actions/handleArticle";
import CardPost from "../CardPost/CardPost";
import LoadMore from "../LoadMore/LoadMore";
import { Space } from "antd";

export default async function Feed({
    fetchUrl,
    optionals,
    token,
}: {
    fetchUrl: string;
    optionals?: { [key: string]: string | string[] | undefined };
    token?: string;
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
            {res.data?.map((article: Article, index: number) => (
                <CardPost article={article} key={index} />
            ))}
            {res?.nextPage ? (
                <LoadMore
                    fetchUrl={fetchUrl}
                    optionals={optionals}
                    token={token}
                ></LoadMore>
            ) : (
                <div className="w-100 text-center p-2 my-2">
                    Đã hết bài viết
                </div>
            )}
        </Space>
    );
}
