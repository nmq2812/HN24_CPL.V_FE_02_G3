"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
    (async () => {
      const token = localStorage.getItem("token");
      if (!token || isExpired(token)) {
        logout();
      } else {
        try {
          const user = await getCurrentUser(token);
          console.log(user);
          login(user.user);
        } catch (e) {
          logout();
          throw e;
        }
      }
    })();
  }, []);

  function isExpired(token: string) {
    try {
      const decodeToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodeToken.exp ? decodeToken.exp < currentTime : true;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  }

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("token", user.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
