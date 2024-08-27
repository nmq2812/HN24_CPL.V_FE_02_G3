import FormNewArticle from "@/components/Form/FormNewArticle";
import { Button } from "antd";

const NewArticle = () => {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormNewArticle />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewArticle;
