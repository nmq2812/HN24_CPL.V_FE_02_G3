"use client";

//Giao diện cũ
/*
import { useEffect, useState } from 'react';
import { fetchArticles } from '@/services/articles';

import Banner from '@/components/banner';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const articles = await fetchArticles();
                setArticles(articles);
            } catch (err) {
                if (err instanceof Error)
                    setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Banner />
            <h1>Articles</h1>
            <ul>
                {articles.map((article: any) => (
                    <li key={article.slug}>
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
*/

//Giao diện ant design hiện tại.
/*
import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const items1 = [
    { key: '1', label: 'Home' },
    { key: '2', label: 'Settings' },
    { key: '3', label: 'Profile' }
  ];

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    <Sider style={{ background: colorBgContainer }} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items2}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                </Layout>
            </Content>
        </Layout>
    );
};

export default App;
 */

//Giao diện ant design test.
import React, { useState } from 'react';
import { Layout, Input, Tag, Col, Row } from 'antd';
import ArticleList from '@/components/articles';

const { Content } = Layout;

const tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'];

const HomePage: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // State để lưu trữ các thẻ tag được chọn

    const handleTagChange = (value: string) => {
        if (selectedTags.includes(value)) {
            setSelectedTags(selectedTags.filter(tag => tag !== value));
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '20px' }}>
                <Row gutter={16}>
                    {/* Bên trái: Danh sách bài viết */}
                    <Col span={16}>
                        <ArticleList/>
                    </Col>

                    {/* Bên phải: Danh sách thẻ tag */}
                    <Col span={8}>
                        <Input.Search placeholder="Tìm kiếm thẻ tag" style={{ marginBottom: 20 }} />
                        <div>
                            {tags.map(tag => (
                                <Tag.CheckableTag
                                    key={tag}
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                >
                                    {tag}
                                </Tag.CheckableTag>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default HomePage;
