import { getArticles } from "@/actions/handleArticle";
import CardPost from "../CardPost/CardPost";
import LoadMore from "./LoadMore/LoadMore";
import { Space } from "antd";

export default async function GlobalFeed() {
  const res = await getArticles({ limit: 4, page: 1 });
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {res.data.map((article: Article) => (
        <CardPost key={article.slug} article={article} />
      ))}
      <LoadMore></LoadMore>
    </Space>
  );
}
