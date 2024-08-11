import ArticleList from "@/components/articleList";
import "./page.module.css";
import Banner from "@/components/banner";

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

                        <ArticleList articles={[]}></ArticleList>
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                <a href="" className="tag-pill tag-default">
                                    programming
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    javascript
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    emberjs
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    angular
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    react
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    mean
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    node
                                </a>
                                <a href="" className="tag-pill tag-default">
                                    rails
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
