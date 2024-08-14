import axios from "../libs/axios";

const getArticles = async (): Promise<ArticleResponse> => {
    try {
        const response = await axios.get<ArticleResponse>("/articles");
        return response.data;
    } catch {
        const result: ArticleResponse = {
            articles: [],
            articlesCount: 0,
        };
        return result;
    }
    
};

export default getArticles;
