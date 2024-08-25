export interface Comments {
    id: string;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
}

export interface Author {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  }