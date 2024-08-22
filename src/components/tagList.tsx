"use client";
// import { getTags } from "@/actions/handleTags";
// import { Col, Input, Tag } from "antd";
// import { useEffect, useState } from "react";

// const TagList = () => {
//   const [tags, setTags] = useState<string[]>();
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);

//   useEffect(() => {
//     (async function () {
//       setTags(await getTags());
//     })();
//   }, []);

//   const handleTagChange = (value: string) => {
//     if (selectedTags.includes(value)) {
//       setSelectedTags(selectedTags.filter((tag) => tag !== value));
//     } else {
//       setSelectedTags([...selectedTags, value]);
//     }
//   };

//   return (
//     <>
//       <Input.Search
//         placeholder="Tìm kiếm thẻ tag"
//         style={{ marginBottom: 20 }}
//       />
//       <div>
//         {tags?.map((tag) => (
//           <Tag.CheckableTag
//             key={tag}
//             checked={selectedTags.includes(tag)}
//             onChange={() => handleTagChange(tag)}
//           >
//             {tag}
//           </Tag.CheckableTag>
          
//         ))}
//       </div>
//     </>
//   );
// };

import { Input, Tag, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';

const TagSelector: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags: string[] = ['#user', '#1', '#111', '#12211', '#123123', '#124124', '#222', '#ADU', '#Dinoooooo'];

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

  const filteredTags = tags.filter((tag) => tag.includes(searchValue));

  return (
    <div>
      <Input
        placeholder="Search tag"
        prefix={<SearchOutlined />}
        value={searchValue}
        onChange={handleSearch}
      />
      <div style={{ marginTop: 16 }}>
        {filteredTags.map((tag) => (
          <Tooltip title={tag} key={tag}>
            <Tag
              color={selectedTags.includes(tag) ? 'blue' : 'default'}
              onClick={() => handleTagClick(tag)}
              style={{ cursor: 'pointer', marginBottom: 8 }}
            >
              {tag}
            </Tag>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
