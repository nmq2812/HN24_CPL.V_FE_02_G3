interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}
interface ArticleCredentials {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}
