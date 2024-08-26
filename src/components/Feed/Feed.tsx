import { getArticles } from "@/actions/handleArticle";
import CardPost from "../CardPost/CardPost";
import LoadMore from "../LoadMore/LoadMore";
import { Space } from "antd";

export default async function Feed({
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
      {res.data?.map((article: Article) => (
        <CardPost
          article={article}
          key={article.slug}
          currentUser={currentUser}
          
        />
      ))}
      {res?.nextPage ? (
        <LoadMore
          fetchUrl={fetchUrl}
          optionals={optionals}
          token={token}
          currentUser={currentUser}
        ></LoadMore>
      ) : (
        <div className="w-100 text-center p-2 my-2">Không còn bài viết</div>
      )}
    </Space>
  );
}
