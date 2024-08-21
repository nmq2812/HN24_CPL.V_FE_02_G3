"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme, Button, Drawer, Grid } from "antd";
import Menu from "./Menu";
import Logo from "./Logo";
import "@/style/sideBar.css";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClose = () => {
    setCollapsed(false);
  };

  return (
    <Layout hasSider>
      {!screens.md && (
        <Drawer
          placement="left"
          onClose={onClose}
          closable={false}
          open={collapsed}
          className="hideOnDesktop"
          style={{ backgroundColor: "#001529", padding: "0" }}
          width={250}
        >
          <Logo />
          <Menu />
        </Drawer>
      )}

      <Sider
        className="sideBar hideOnMobile"
        trigger={null}
        collapsed={collapsed}
        collapsible
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <Logo />
        <Menu />
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          ></Button>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
