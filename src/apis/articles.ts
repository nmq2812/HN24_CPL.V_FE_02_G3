import axios from "../libs/axios";

const getArticles = async (): Promise<ArticleResponse> => {
    const response = await axios.get<ArticleResponse>("/articles");
    return response.data;
};

export default getArticles;