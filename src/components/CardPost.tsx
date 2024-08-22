import { Card, Avatar } from "antd";
import Link from "next/link";

interface ArticleProp {
    article: Article;
}

const CardPost: React.FC<ArticleProp> = ({ article }) => {
    return (
        <Card className="article-meta">
            <Link href={`/profile/${article.author.username}`}>
                <Avatar src={article.author.image} />
            </Link>
            <div className="info">
                <Link
                    href={`/profile/${article.author.username}`}
                    className="author"
                >
                    {article.author.username}
                </Link>
                <span className="date">{formatDate(article.updatedAt)}</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i> {article.favoritesCount}
            </button>
            <Link href={`article/${article.slug}`} className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
                <ul className="tag-list">
                    {article.tagList.map((tag, i) => (
                        <li
                            className="tag-default tag-pill tag-outline"
                            key={i}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            </Link>
        </Card>
    );
};

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
}

export default CardPost;
