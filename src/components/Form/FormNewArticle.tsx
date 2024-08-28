"use client";
import { Button, FormProps, Input, Form, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { postArticle } from "@/actions/handleArticle";
import { capitalizeFirstLetter } from "@/ultis/formatText";
import toast from "react-hot-toast";
import { PlusOutlined } from "@ant-design/icons";

type ValueType = string | null;

const FormNewArticle = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinish: FormProps<ArticleCredentials>["onFinish"] = (values) => {
    values.tagList = tags;
    console.log(values);
    setLoading(true);
    postArticle(values, user?.token!!).then((result) => {
      if (result.success) {
        toast.success("Create article successfully");
        router.replace(`/article/${result.data.slug}`);
      } else {
        const errors = result.message.errors;
        for (const key in errors) {
          const message = capitalizeFirstLetter(key) + " " + errors[key];
          toast.error(message);
        }
      }
      setLoading(false);
    });
  };

  const handleInputTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputValue("");
  };

  const handleClose = (removedTag: string) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  return (
    <Form
      name="article-form"
      size="large"
      layout="vertical"
      labelCol={{ span: 6 }}
      style={{ margin: "auto" }}
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete="on"
      onKeyDown={(e) => (e.keyCode === 13 ? e.preventDefault() : "")}
    >
      <Form.Item
        name="title"
        label="Article Title"
        rules={[{ required: true, message: "Please enter the article title!" }]}
      >
        <Input placeholder="Article Title" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please enter the article description!" },
        ]}
      >
        <Input placeholder="What's this article about?" />
      </Form.Item>
      <Form.Item
        name="body"
        label="Content"
        rules={[{ required: true, message: "Please enter the article body!" }]}
      >
        <Input.TextArea
          rows={6}
          placeholder="Write your article (in markdown)"
        />
      </Form.Item>
      <Form.Item name="tagList" label="Tags">
        <div>
          <Input
            placeholder="Enter tags"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleInputTag}
            suffix={<PlusOutlined />}
          />
          {tags.map((tag) => (
            <Tag key={tag} closable onClose={() => handleClose(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
      </Form.Item>

      <Form.Item name="submit">
        <Button type="primary" htmlType="submit" loading={loading}>
          Publish Article
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormNewArticle;
