"use client";
import { getTags } from "@/actions/handleTags";
import { Col, Input, Tag } from "antd";
import { useEffect, useState } from "react";

const TagList = () => {
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
        <Col span={8}>
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
