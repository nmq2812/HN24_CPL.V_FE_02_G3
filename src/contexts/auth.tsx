"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/actions/authAction";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const route = useRouter();
  const cookies = parseCookies();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const cookies = parseCookies();
      const token = localStorage.getItem("token");
      if (cookies.isAuthenticated === "true" && token && !isExpired(token)) {
        await getCurrentUser(token).then((result) => {
          if (result.success) {
            login(result.data);
          } else {
            setUser(null);
            setIsAuthenticated(false);
            destroyCookie(null, "isAuthenticated");
            localStorage.removeItem("token");
          }
        });
      }
      setLoading(false);
    })();
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
      maxAge: 30 * 24 * 60 * 60,
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
    route.push("/");
  };

  const contextValue = useMemo(
    () => ({ user, isAuthenticated, loading, login, logout }),
    [user, isAuthenticated, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth sử dụng trong AuthProvider");
  }
  return context;
};
