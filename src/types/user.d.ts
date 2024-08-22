interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
interface UserResponse {
  user: User;
}
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}
