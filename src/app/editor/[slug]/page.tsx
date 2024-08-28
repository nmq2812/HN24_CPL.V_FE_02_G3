import FormUpdateArticle from "@/components/Form/FormArticle";

const UpdateArticle = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  console.log(slug);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormUpdateArticle slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateArticle;
