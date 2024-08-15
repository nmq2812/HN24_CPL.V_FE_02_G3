import axios from "../libs/axios";

class ConditionalProps {
    tag: string = "";
    author: string = "";
    favorited: string = "";
    limit: number = 10;
    offset: number = 0;
}

export const getArticles = async (): Promise<ArticleResponse> => {
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

export const getConditionalArticle = async (
    condition: ConditionalProps
): Promise<ArticleResponse> => {
    try {
        const response = await axios.get<ArticleResponse>("/articles", {
            params: condition,
        });
        return response.data;
    } catch {
        const result: ArticleResponse = {
            articles: [],
            articlesCount: 0,
        };
        return result;
    }
};
