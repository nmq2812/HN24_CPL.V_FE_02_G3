"use client";

<<<<<<< HEAD
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
=======
import { Input, List, Tag, Tooltip } from "antd";
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { getTags } from "@/actions/handleTags";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TagList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
                    <Tooltip title={tag} key={tag}>
                        <Tag
                            color={selectedTag === tag ? "blue" : "default"}
                            onClick={() => handleTagClick(tag)}
                            style={{
                                cursor: "pointer",
<<<<<<< HEAD
                                height: "1.4rem",
=======
                                marginBottom: 8,
                                padding: 0,
                                width: "100%",
                                textAlign: "center",
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
                            }}
                        >
                            {tag}
                        </Tag>
                    </Tooltip>
<<<<<<< HEAD
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
=======
                )}
                style={{ marginTop: 16 }}
            ></List>
        </div>
>>>>>>> parent of 5d8be52 (Merge pull request #28 from nmq2812/mquang)
    );
};

export default TagList;
