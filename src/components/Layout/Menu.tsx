import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  HeartOutlined,
  LoginOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/auth";
import { parseCookies } from "nookies";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MyMenu() {
  const { user, logout } = useAuth();
  const [selectedKey, setSelectedKey] = useState<string>("home");
  const MenuList = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      requireAuth: false,
      href: "/",
    },
    {
      key: "follow",
      label: "Following",
      icon: <PlusCircleOutlined />,
      requireAuth: true,
      href: "/",
    },
    {
      key: "favorites",
      label: "Favorites",
      icon: <HeartOutlined />,
      requireAuth: true,
      href: "/",
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
      requireAuth: true,
      href: "/profile",
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      requireAuth: false,
      href: "/",
    },
    {
      key: "signIn",
      label: "Sign In",
      icon: <LoginOutlined />,
      requireAuth: false,
      href: "/login",
    },
    {
      key: "signOut",
      label: "Sign Out",
      icon: <LoginOutlined />,
      requireAuth: true,
      href: "/",
      onClick: logout,
    },
  ];

  const name = user?.username;
  const cookies = parseCookies();
  const pathname = usePathname();
  const isAuthenticated = cookies.isAuthenticated === "true";

  const addLinkList = MenuList.map((item) => {
    if (item.key === "profile") {
      return {
        ...item,
        href: `/profile/${name}`,
        label: (
          <Link
            className="nav-link"
            href={isAuthenticated ? `/profile/${name}` : "/"}
          >
            Profile
          </Link>
        ),
      };
    }
    return {
      ...item,
      label: (
        <Link className="nav-link" href={item.href}>
          {item.label}
        </Link>
      ),
    };
  });

  const filterItem = addLinkList.filter(
    (item) => item.requireAuth === isAuthenticated || item.key === "home"
  );
  useEffect(() => {
    const matchingMenu = filterItem.find((item) => pathname === item.href);
    setSelectedKey(matchingMenu ? matchingMenu.key : "");
  }, [isAuthenticated, pathname]);

  return (
    <Menu
      theme="dark"
      items={filterItem}
      mode="inline"
      className="menuBar"
      selectedKeys={[selectedKey]}
      defaultSelectedKeys={["home"]}
    />
  );
}
