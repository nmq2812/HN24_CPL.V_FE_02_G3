"use client";

import { Col, Input, Tag, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { getTags } from "@/actions/handleTags";
import { useRouter, usePathname, useSearchParams } from "next/navigation";


const TagList = () => {
    
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  //Thêm dữ liệu query
  current.set("query", "232");
  const query = current.toString();

  router.push(`${pathname}?${query}`);


  const [tags, setTags] = useState<string[]>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  return (
    <Col>
      <Input.Search
        placeholder="Tìm kiếm thẻ tag"
        style={{ marginBottom: 20 }}
      />
      <div>
        {tags?.map((tag) => (
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
  );
};

export default TagList;
