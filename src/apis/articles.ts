import axios from "../libs/axios";

const getArticles = async (): Promise<ArticleResponse> => {
    const response = await axios.get<ArticleResponse>(
        "https://node-express-conduit.appspot.com/api/articles"
    );
    return response.data;
};

export default getArticles;