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
    token: { colorBgContainer },
  } = theme.useToken();

  const onClose = () => {
    setCollapsed(false);
  };

  return (
      <Layout>
          {!screens.md ? (
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
          ) : (
              <Sider
                  className="sideBar hideOnMobile"
                  trigger={null}
                  collapsed={collapsed}
                  collapsible
                  style={{
                      position: "fixed",
                      height: "100vh",
                      left: 0,
                      top: 0,
                      zIndex: 1000,
                      color: "#fff",
                      width: collapsed ? 80 : 200,
                  }}
              >
                  <Logo />
                  <Menu />
              </Sider>
          )}
          <Layout
              style={{
                  marginLeft: screens.md ? (collapsed ? 80 : 200) : 0,
                  minHeight: "100vh",
              }}
          >
              <Header
                  style={{
                      position: "sticky",
                      top: 0,
                      padding: 0,
                      zIndex: 1,
                      background: colorBgContainer,
                  }}
              >
                  <Button
                      type="text"
                      className="toggle"
                      onClick={() => setCollapsed(!collapsed)}
                      icon={
                          collapsed ? (
                              <MenuUnfoldOutlined />
                          ) : (
                              <MenuFoldOutlined />
                          )
                      }
                  ></Button>
              </Header>
              <Content>{children}</Content>
          </Layout>
      </Layout>
  );
}
