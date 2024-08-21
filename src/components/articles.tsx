import React, { useState, useEffect } from 'react';
import { Card, List, Row, Col, Select, Avatar, Button } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Article } from '@/types/articles';
import { fetchArticles } from '@/services/articles';

const { Meta } = Card;
const { Option } = Select;

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [viewMode, setViewMode] = useState('grid'); // State để chuyển đổi chế độ hiển thị

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articlesData = await fetchArticles();  // Gọi API để lấy danh sách bài viết
        setArticles(articlesData);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    loadArticles();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Select defaultValue="grid" onChange={setViewMode} style={{ width: 120 }}>
          <Option value="grid">Dạng lưới</Option>
          <Option value="list">Dạng danh sách</Option>
          <Option value="card">Dạng thẻ</Option>
        </Select>
      </div>
      <div>
        {viewMode === 'grid' && (
          <Row gutter={16}>
            {articles.map((article) => (
              <Col span={8} key={article.slug}>
                <Card hoverable style={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px', fontSize: '18px', fontWeight: 'bold' }}>
                    {article.title.substring(0, 100)}...
                  </div>
                  <div style={{ padding: '0 16px 16px 16px', fontSize: '14px', color: '#555' }}>
                    {article.body.substring(0, 100)}...
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px 16px 16px' }}>
                    <Avatar src={article.author.image} />
                    <div style={{ marginLeft: '10px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{article.author.username}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>
                        {new Date(article.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button type="text" icon={<LikeOutlined />} size="small">
                        Thích
                      </Button>
                      <Button type="text" icon={<CommentOutlined />} size="small">
                        Xem
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {viewMode === 'list' && (
          <List
            itemLayout="vertical"
            dataSource={articles}
            renderItem={(article) => (
              <List.Item key={article.slug}>
                <List.Item.Meta
                  avatar={<Avatar src={article.author.image} />}
                  title={article.author.username}
                  description={`${new Date(article.createdAt).toLocaleDateString()}`}
                />
                <div><h3>{`${article.title.substring(0, 100)}...`}</h3></div>
                <div>{`${article.body.substring(0, 100)}...`}</div>
                <div>
                  <Button icon={<LikeOutlined />} type="text">Thích</Button>
                  <Button icon={<CommentOutlined />} type="text">Xem</Button>
                </div>
              </List.Item>
            )}
          />
        )}
        {viewMode === 'card' && (
          <div>
            {articles.map((article) => (
              <Card
                style={{ width: '100%', marginBottom: '20px' }}
                bordered={false}
              >
                <Row>
                  <Col md={1}>
                    <Avatar src={article.author.image} />
                  </Col>
                  <Col md={11}>
                    <Meta
                      title={article.author.username}
                      description={`${new Date(article.createdAt).toLocaleDateString()}`}
                      style={{ marginLeft: '10px' }}
                    />
                  </Col>
                </Row>

                <div style={{ marginTop: '15px' }}>
                  <h3>{article.body}</h3>
                  <p>{article.description}</p>
                </div>

                <div>
                  <Button icon={<LikeOutlined />} type="text">Thích</Button>
                  <Button icon={<CommentOutlined />} type="text">Xem</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
