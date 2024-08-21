import ArticleList from "@/components/articleList";
import "./page.module.css";
import TagList from "@/components/tagList";
import "antd/dist/reset.css";

export default function Home() {
  return (
    <div className="home-page">
      <div className="container page">
        <div className="row">
          <ArticleList></ArticleList>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <TagList></TagList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
