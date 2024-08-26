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
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const route = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      (async () => {
          const cookies = parseCookies();
          const token = cookies.token;
          if (
              cookies.isAuthenticated === "true" &&
              token &&
              !isExpired(token)
          ) {
              await getCurrentUser(token).then((result) => {
                  if (result.success) {
                      login(result.data);
                  } else {
                      setUser(null);
                      destroyCookie(null, "isAuthenticated");
                      destroyCookie(null, "token");
                      destroyCookie(null, "username");
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
      const decodedToken = jwtDecode(user.token);
      const currentTime = Math.floor(Date.now() / 1000);
      setUser(user);
      setCookie(null, "isAuthenticated", "true", {
          maxAge: decodedToken.exp!! - currentTime,
          path: "/",
      });
      setCookie(null, "token", user.token, {
          maxAge: decodedToken.exp!! - currentTime,
          path: "/",
      });
      setCookie(null, "username", user.username, {
          maxAge: decodedToken.exp!! - currentTime,
          path: "/",
      });
  };

  const logout = () => {
      setUser(null);
      destroyCookie(null, "isAuthenticated");
      destroyCookie(null, "token");
      destroyCookie(null, "username");
      toast.success("Sign out successfully");
      route.push("/");
  };

  const contextValue = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
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
