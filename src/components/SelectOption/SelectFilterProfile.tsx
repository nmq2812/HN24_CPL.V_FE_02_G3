"use client";
import React from "react";
import { Select, Space } from "antd";
import { usePathname, useRouter } from "next/navigation";

const SelectFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    router.push(`${pathname}?fetchUrl=${value}`);
  };

  return (
    <Space wrap>
      <Select
        defaultValue="Timeline"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "/articles", label: "Timeline" },
          { value: "/articles/feed", label: "Following" },
        ]}
      />
    </Space>
  );
};

export default SelectFilter;
