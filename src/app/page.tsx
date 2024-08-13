
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
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              <ArticleList></ArticleList>
            </div>

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
