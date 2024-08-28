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
import { getProfile } from "@/actions/handleProfile";

interface AuthContextType {
  user: Profile | undefined;
  loading: boolean;
  login: (user: Profile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const route = useRouter();
  const [user, setUser] = useState<Profile | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const cookies = parseCookies();
      const token = cookies.token;
      if (cookies.isAuthenticated === "true" && token && !isExpired(token)) {
        try {
          const userResult = await getCurrentUser(token);
          console.log("hello cập nhật");
          if (userResult.success) {
            const username = userResult.data.username;
            const profileResult = await getProfile(username);
            const combine = {
              ...userResult.data,
              ...profileResult.profile,
            };

            login(combine);
          } else {
            setUser(undefined);
            destroyCookie(null, "isAuthenticated");
            destroyCookie(null, "token");
          }
        } catch (error) {
          console.error("Lỗi trong quá trình lấy dữ liệu:", error);
        }
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

  const login = (newuser: Profile) => {
    if (newuser.token) {
      const decodedToken = jwtDecode(newuser.token);
      const currentTime = Math.floor(Date.now() / 1000);
      setUser({ ...user, ...newuser });
      setCookie(null, "isAuthenticated", "true", {
        maxAge: decodedToken.exp!! - currentTime,
        path: "/",
      });
      setCookie(null, "token", newuser.token, {
        maxAge: decodedToken.exp!! - currentTime,
        path: "/",
      });
    }
  };

  const logout = () => {
    console.log("hello logout");
    setUser(undefined);
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
