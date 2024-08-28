import { Card } from "antd";
import CardPostHeader from "./CardPostHeader";
import CardPostContent from "./CardPostContent";
import CardPostFooter from "./CardPostFooter";
import { CommentType } from "@/types/enums";
import CardPostComment from "./CardPostComment";
import { getComment } from "@/actions/handleComments";

export default async function CardPost({
  article,
  token,
  commentType,
}: {
  article: Article;
  token?: string;
  commentType: CommentType;
}) {
  const comments = await getComment(article.slug);

  return (
    <>
      <Card>
        <CardPostHeader
          slug={article.slug}
          author={article.author}
          commentType={commentType}
          updatedAt={article.updatedAt}
        ></CardPostHeader>
        <CardPostContent
          commentType={commentType}
          article={article}
        ></CardPostContent>
        <CardPostFooter
          article={article}
          commentType={commentType}
          commentsSize={comments.length}
        ></CardPostFooter>
        <CardPostComment
          comments={comments}
          commentType={commentType}
          slug={article.slug}
          token={token}
        ></CardPostComment>
      </Card>
    </>
  );
}
