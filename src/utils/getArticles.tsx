import axios from "axios";

export default function getArticles() {
    const articles: unknown[] = [];
    const apiUrl = "https://api.realworld.io/api/";
    axios
        .get(apiUrl + "articles")
        .then(function (response) {
            // xử trí khi thành công
            Object.values(response.data.articles).forEach((article) => {
                articles.push(article);
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {});
    return articles;
}
