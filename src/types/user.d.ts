interface Profile {
  email?: string;
  token?: string;
  username: string;
  bio: string;
  image: string;
  admin?: boolean;
  following?: boolean;
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
