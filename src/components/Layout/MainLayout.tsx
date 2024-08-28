"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme, Button, Drawer, Grid } from "antd";
import Menu from "./Menu";
import Logo from "./Logo";
<<<<<<< HEAD
import Link from "next/link";
=======
import "@/style/sideBar.css";
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
<<<<<<< HEAD
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const screens = useBreakpoint();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
=======
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)

    const onClose = () => {
        setCollapsed(false);
    };

<<<<<<< HEAD
    return (
        <Layout>
            {!screens.md ? (
                <Drawer
                    placement="left"
                    onClose={onClose}
                    closable={false}
                    open={collapsed}
                    className="hideOnDesktop"
                    style={{ padding: "0" }}
                    width={250}
                >
                    <Logo />
                    <Menu onClose={onClose} />
                </Drawer>
            ) : (
                <Sider
                    className="sideBar hideOnMobile"
                    trigger={null}
                    collapsed={collapsed}
                    collapsible
                    style={{
                        background: colorBgContainer,
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
                    className="d-flex align-items-center"
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
                    <div className="navbar-brand flex-grow-1 text-center cursor-pointer">
                        <Link href="/">
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    router.push("/");
                                    router.refresh();
                                }}
                            >
                                CONDUIT
                            </span>
                        </Link>
                    </div>
                </Header>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
=======
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
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
}
