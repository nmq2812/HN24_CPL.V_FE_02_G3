import axios from "axios";
import { useEffect, useState } from "react";

export default function ArticleList() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios
            .get<ArticleResponse>("https://api.example.com/articles")
            .then((response) => {
                // Cập nhật state với dữ liệu nhận được
                setArticles(response.data.articles);
            })
            .catch((error) => {
                console.error("Error fetching the articles:", error);
            });
    }, []);

    // sửa lại cái này đẻ render
    return (
        <div className="">
            <div className="article-preview">
                <div className="article-meta">
                    <a href="profile.html">
                        <img src="http://i.imgur.com/Qr71crq.jpg" />
                    </a>
                    <div className="info">
                        <a href="" className="author">
                            Eric Simons
                        </a>
                        <span className="date">January 20th</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                        <i className="ion-heart"></i> 29
                    </button>
                </div>
                <a href="" className="preview-link">
                    <h1>How to build webapps that scale</h1>
                    <p>This is the description for the post.</p>
                    <span>Read more...</span>
                </a>
            </div>

            <div className="article-preview">
                <div className="article-meta">
                    <a href="profile.html">
                        <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                    </a>
                    <div className="info">
                        <a href="" className="author">
                            Albert Pai
                        </a>
                        <span className="date">January 20th</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                        <i className="ion-heart"></i> 32
                    </button>
                </div>
                <a href="" className="preview-link">
                    <h1>
                        The song you won't ever stop singiNo matter how hard you
                        try.
                    </h1>
                    <p>This is the description for the post.</p>
                    <span>Read more...</span>
                </a>
            </div>
        </div>
    );
}

function renderArticle(article: Article) {
    return (
        <div className="article-preview">
            <div className="article-meta">
                <a href="profile.html">
                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                    <a href="" className="author">
                        Albert Pai
                    </a>
                    <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 32
                </button>
            </div>
            <a href="" className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.body}</p>
                <span>Read more...</span>
            </a>
        </div>
    );
}
