"use client";
// app/components/Post.tsx
import React from 'react';
import { Card, Button, Avatar, Row, Col } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';

interface PostProps {
  title: string;
  content: string;
  author: string;
  avatarUrl: string;
  time: string;
}

const Post: React.FC<PostProps> = ({ title, content, author, avatarUrl, time }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <Row align="middle" style={{ marginBottom: '10px' }}>
        <Col xs={2}>
          <Avatar src={avatarUrl} />
        </Col>
        <Col xs={20}>
          <strong>{author}</strong> <br />
          <small>{time}</small>
        </Col>
      </Row>
      <h2>{title}</h2>
      <p>{content}</p>
      <Row justify="space-between">
        <Col>
          <Button icon={<LikeOutlined />} className="mr-2">
            Thích
          </Button>
          <Button icon={<CommentOutlined />} className="mr-2">
            Bình luận
          </Button>
          <Button icon={<ShareAltOutlined />}>
            Chia sẻ
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Post;

