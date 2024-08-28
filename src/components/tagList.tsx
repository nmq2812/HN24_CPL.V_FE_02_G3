"use client";

import {
    Card,
    Col,
    Input,
    List,
    Pagination,
    Skeleton,
    Tag,
    Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getTags } from "@/actions/handleTags";

const PAGE_SIZE = 20;

const TagList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [tags, setTags] = useState<string[]>([]);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    console.log(tags);

    useEffect(() => {
        if (!searchParams.has("tag")) {
            setSelectedTag(null);
        }
    }, [searchParams]);

    useEffect(() => {
        const query = new URLSearchParams(Array.from(searchParams));
        if (selectedTag) {
            query.set("tag", selectedTag);
        } else {
            query.delete("tag");
        }
        router.push(`${pathname}?${query.toString()}`);
    }, [selectedTag, pathname, router, searchParams]);

    useEffect(() => {
        getTags().then((tags) => {
            setTags(tags);
        });
    }, [selectedTag]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        setSearchValue(e.target.value);
    };

    const handleTagClick = useCallback((tag: string) => {
        setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
    }, []);

    const filteredTags = tags.filter(
        (tag) => tag.includes(searchValue) && tag !== ""
    );

    const indexOfLastTag = currentPage * PAGE_SIZE;
    const indexOfFirstTag = indexOfLastTag - PAGE_SIZE;
    const currentTags = filteredTags.slice(indexOfFirstTag, indexOfLastTag);

    return (
        <Card title="Tags">
            <Input
                prefix={<SearchOutlined />}
                className="mb-2"
                placeholder="Search tag"
                value={searchValue}
                onChange={handleSearch}
            />
            {currentTags.length === 0 && (
                <Skeleton active paragraph={{ rows: 4 }} />
            )}
            <div
                style={{
                    height: "250px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                }}
            >
                {currentTags.map((tag) => (
                    <Tooltip title={tag} key={tag}>
                        <Tag
                            color={selectedTag === tag ? "blue" : "default"}
                            onClick={() => handleTagClick(tag)}
                            style={{
                                cursor: "pointer",
                                height: "1.4rem",
                            }}
                        >
                            {tag}
                        </Tag>
                    </Tooltip>
                ))}
            </div>
            <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={filteredTags.length}
                onChange={setCurrentPage}
                style={{ marginTop: 16 }}
                showSizeChanger={false}
                hideOnSinglePage={true}
                simple
            />
        </Card>
    );
};

export default TagList;
