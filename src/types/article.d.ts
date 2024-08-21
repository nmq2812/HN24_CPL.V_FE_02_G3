interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
    };
}

// Định nghĩa kiểu dữ liệu trả về từ API
interface ArticleResponse {
    articles: Article[];
    articlesCount: number;
    page : number;
}
