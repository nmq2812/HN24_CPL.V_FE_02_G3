"use client";
import React from "react";
import { Typography } from "antd";

const { Text } = Typography;
export const TruncateText = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const truncatedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  return <Text>{truncatedText}</Text>;
};
