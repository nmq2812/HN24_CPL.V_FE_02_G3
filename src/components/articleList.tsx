import getArticles from "@/apis/articles";

const ArticlesList = async () => {
  // const [articles, setArticles] = useState<Article[]>();
  // useEffect(() => {
  //     (async function () {
  //         setArticles(await getArticles());
  //     })();
  // });

  const articles = await getArticles();

  return (
    <div className="">
      {articles.map((item) => (
        <div className="article-preview">
          <div className="article-meta">
            <a href="profile.html">
              <img src={item.author.image} />
            </a>
            <div className="info">
              <a href="" className="author">
                {item.author.username}
              </a>
              <span className="date">{formatDate(item.updatedAt)}</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
              <i className="ion-heart"></i> {item.favoritesCount}
            </button>
          </div>
          <a href="" className="preview-link">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <span>Read more...</span>
            <ul className="tag-list">
              {item.tagList.map((tag) => (
                <li className="tag-default tag-pill tag-outline">{tag}</li>
              ))}
            </ul>
          </a>
        </div>
      ))}
    </div>
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

export default ArticlesList;
