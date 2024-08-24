"use client";
import "./page.module.css";
import "antd/dist/reset.css";
import { Layout, Row, Col, Input, Tag, Tooltip } from "antd";
import GlobalFeed from "@/components/Feed/GlobalFeed";
import { Content } from "antd/es/layout/layout";
import { getTags } from "@/actions/handleTags";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, ChangeEvent } from "react";

export default function Home() {
    return (
        <Layout
            className="col-12 col-md-10 col-xl-8"
            style={{ minHeight: "100vh", margin: "0 auto" }}
        >
            <Content style={{ padding: "0 24px", marginTop: "16px" }}>
                <Row gutter={24} align="top" className="gap-4">
                    <Col xs={24} md={16} lg={16} style={{ padding: "0" }}>
                        <GlobalFeed />
                    </Col>

                    <Col
                        xs={24}
                        md={6}
                        lg={6}
                        style={{
                            padding: "0",
                            // position: "-webkit-sticky",
                            position: "sticky",
                            top: "80px",
                        }}
                    >
                        <TagList />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

const TagList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [tags, setTags] = useState<string[]>();

    useEffect(() => {
        (async function () {
            setTags(await getTags());
        })();
    }, []);

    const handleTagChange = (value: string) => {
        if (selectedTags.includes(value)) {
            setSelectedTags(selectedTags.filter((tag) => tag !== value));
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((t) => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const filteredTags = tags?.filter((tag) => tag.includes(searchValue));

    return (
        <div>
            <Input
                placeholder="Search tag"
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={handleSearch}
            />
            <div style={{ marginTop: 16 }}>
                {filteredTags?.map((tag) => (
                    <Tooltip title={tag} key={tag}>
                        <Tag
                            color={
                                selectedTags.includes(tag) ? "blue" : "default"
                            }
                            onClick={() => handleTagClick(tag)}
                            style={{ cursor: "pointer", marginBottom: 8 }}
                        >
                            {tag}
                        </Tag>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};
