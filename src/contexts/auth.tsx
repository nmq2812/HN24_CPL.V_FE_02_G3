"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setCookie, destroyCookie } from "nookies";
import { getCurrentUser } from "@/actions";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isExpired(token)) {
      getCurrentUser(token)
        .then((user) => login(user.user))
        .catch(logout);
    } else {
      logout();
    }
  }, []);

  const isExpired = (token: string) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp ? decodedToken.exp < currentTime : true;
    } catch (error) {
      console.error("Token không hợp lệ: ", error);
      return true;
    }
  };

  const login = (user: User) => {
    setUser(user);
    setCookie(null, "isAuthenticated", "true", {
      maxAge: 30 * 24 * 60 * 60, // Cookie có thời hạn 30 ngày
      path: "/",
    });
    setIsAuthenticated(true);
    localStorage.setItem("token", user.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    destroyCookie(null, "isAuthenticated");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth sử dụng trong AuthProvider");
  }
  return context;
};
