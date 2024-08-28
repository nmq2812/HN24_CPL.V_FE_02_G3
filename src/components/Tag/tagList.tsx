"use client";

import { Card, Col, Input, List, Pagination, Tag, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

const PAGE_SIZE = 20;

export default function TagList({
  searchParams,
  tags,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
  tags: string[];
}) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(searchParams);
    const query = new URLSearchParams(searchParams as any);
    const tag = query.get("tag");
    console.log(tag);
    setSelectedTag(tag);
  }, [searchParams]);

  useEffect(() => {
    const query = new URLSearchParams(searchParams as any);
    if (selectedTag) {
      query.set("tag", selectedTag);
      const page = query.get("page");
      if (page) {
        query.set("page", "1");
      }
    } else {
      query.delete("tag");
    }
    router.push(`${pathname}?${query.toString()}`);
  }, [selectedTag]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchValue(e.target.value);
  };

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  }, []);

  const filteredTags = tags.filter((tag) => tag.includes(searchValue));
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
}
