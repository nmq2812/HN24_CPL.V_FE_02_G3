"use client";
import React, { useState } from "react";
import { Layout, theme, Button } from "antd";
import Menu from "./Menu";
import Logo from "./Logo";
import "@/style/sideBar.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout hasSider>
            <Sider
                className="sideBar"
                trigger={null}
                collapsed={collapsed}
                collapsible
            >
                <Logo />
                <Menu />
            </Sider>
            <Layout style={{ minHeight: "100vh" }}>
                <Header
                    style={{
                        margin: "0 0 20px 0",
                        paddingLeft: 10,
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
