interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}
interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}