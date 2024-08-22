

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

interface GlobalArticleParams {
  limit: number;
  page: number;
  author?: string;
  favorited?: string;
  tag?: string;
}

// Định nghĩa kiểu dữ liệu trả về từ API
interface ArticleResponse {
  articles: Article[];
  articlesCount: number;
}
