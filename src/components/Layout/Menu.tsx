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

export default function MyMenu({ onClose }: { onClose?: () => void }) {
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
      key: "create",
      label: "New Article",
      icon: <PlusCircleOutlined />,
      requireAuth: true,
      href: "/editor",
    },
    {
      key: "favorites",
      label: "Favorites",
      icon: <HeartOutlined />,
      requireAuth: true,
      href: "/favorites",
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
      requireAuth: true,
      href: `/profile/${user?.username}`,
    },
    {
      key: "signIn",
      label: "Sign In/Sign Up",
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

  const cookies = parseCookies();
  const pathname = usePathname();
  const isAuthenticated = cookies.isAuthenticated === "true";

  const addLinkList = MenuList.map((item) => {
    return {
      ...item,
      label: (
        <Link className="nav-link" href={item.href}>
          {item.label}
        </Link>
      ),
    };
  });

  const filterItem = addLinkList
    .filter(
      (item) => item.requireAuth === isAuthenticated || item.key === "home"
    )
    .map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      href: item.href,
      onClick: item.onClick,
    }));
  useEffect(() => {
    const matchingMenu = filterItem.find((item) => pathname === item.href);
    setSelectedKey(matchingMenu ? matchingMenu.key : "");
  }, [isAuthenticated, pathname, user?.username]);

  return (
    <Menu
      onClick={onClose}
      items={filterItem}
      mode="inline"
      className="menuBar"
      selectedKeys={[selectedKey]}
      defaultSelectedKeys={["home"]}
    />
  );
}
