import ArticleList from "@/components/articleList";
import "./page.module.css";
import Banner from "@/components/banner";
import TagList from "@/components/tagList";

export default function Home() {
  return (
    <div className="home-page">
      <Banner></Banner>
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
