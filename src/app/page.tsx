import ArticleList from "@/components/articleList";
import "./page.module.css";
import TagList from "@/components/tagList";
import "antd/dist/reset.css";
import GlobalFeed from "@/components/Feed/GlobalFeed";

export default function Home() {
  return (
    <div className="home-page">
      <div className="container page">
        <div className="row">
          <GlobalFeed/>

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
