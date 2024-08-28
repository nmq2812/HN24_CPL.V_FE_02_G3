import { getSingleArticle } from "@/actions/handleArticle";
import CardPost from "@/components/CardPost/CardPost";
import { CommentType } from "@/types/enums";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function Post({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await getSingleArticle(slug, token);
  console.log(res);
  if (!res.success) {
    redirect("/");
  }

  return (
    <div className="container mt-3">
      <div className="card p-3">
        <CardPost
          article={res.data}
          token={token}
          commentType={CommentType.DetailComment}
        ></CardPost>
      </div>
    </div>
  );
}

export default Post;
