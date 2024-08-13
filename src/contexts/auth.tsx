"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCurrentUser } from "@/apis/user";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Bạn có thể kiểm tra và cập nhật user từ token
      getCurrentUser(token)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("token", user.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // Có thể thêm các bước để xử lý khi logout (ví dụ: chuyển trang)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
