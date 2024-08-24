"use client";

import { Col, Input, Tag, Tooltip } from "antd";
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
              color={selectedTag === tag ? "blue" : "default"}
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

export default TagList;
