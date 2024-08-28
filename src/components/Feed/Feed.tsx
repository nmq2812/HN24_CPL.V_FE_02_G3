import { getArticles } from "@/actions/handleArticle";
import CardPost from "../CardPost/CardPost";
import { Space } from "antd";
import { CommentType } from "@/types/enums";
import PaginationArticle from "../Pagination";

export default async function Feed({
  fetchUrl,
  optionals,
  token,
  commentType,
}: {
  fetchUrl: string;
  optionals?: { [key: string]: string | string[] | undefined };
  token?: string;
  commentType: CommentType;
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
      {res.data.articles?.map((article: Article) => (
        <CardPost
          token={token}
          article={article}
          key={article.slug}
          commentType={commentType}
        />
      ))}
      <div className="me-3 text-center">
        {res.nextPage ? (
          <PaginationArticle
            total={res.data.articlesCount}
            currentPage={res.data.page}
          />
        ) : (
          "Đã hết bài viết "
        )}
      </div>
    </Space>
  );
}
