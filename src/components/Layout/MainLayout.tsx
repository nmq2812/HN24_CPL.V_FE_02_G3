"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme, Button, Drawer, Grid } from "antd";
import { usePathname, useRouter } from "next/navigation";
import "@/style/sideBar.css";
import Menu from "./Menu";
import Logo from "./Logo";
import Link from "next/link";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
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
}
