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
  author: Profile;
}

interface OptionalArticleParams {
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
