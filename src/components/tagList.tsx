"use client";

import { Input, List, Tag, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { getTags } from "@/actions/handleTags";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TagList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const current = new URLSearchParams(Array.from(searchParams));

    const [tags, setTags] = useState<string[]>();

    useEffect(() => {
        if (selectedTag) {
            current.set("tag", selectedTag);
            const query = `?${current.toString()}`;
            router.push(`${pathname}${query}`);
        } else {
            router.push("/");
        }
    }, [selectedTag]);

    useEffect(() => {
        getTags().then((tags) => {
            setTags(tags);
        });
    }, []);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleTagClick = (tag: string) => {
        tag !== selectedTag ? setSelectedTag(tag) : setSelectedTag(null);
    };

    const filteredTags = tags?.filter(
        (tag) => tag.includes(searchValue) && tag !== ""
    );

    return (
        <div className="">
            <Input
                placeholder="Search tag"
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={handleSearch}
            />

            <List
                size="large"
                dataSource={filteredTags}
                grid={{ gutter: 16, column: 5, xs: 1, xl: 6 }}
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: filteredTags?.length!! / 10,
                    showSizeChanger: false,
                    size: "small",
                }}
                renderItem={(tag) => (
                    <Tooltip title={tag} key={tag}>
                        <Tag
                            color={selectedTag === tag ? "blue" : "default"}
                            onClick={() => handleTagClick(tag)}
                            style={{
                                cursor: "pointer",
                                marginBottom: 8,
                                padding: 0,
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            {tag}
                        </Tag>
                    </Tooltip>
                )}
                style={{ marginTop: 16 }}
            ></List>
        </div>
    );
};

export default TagList;
