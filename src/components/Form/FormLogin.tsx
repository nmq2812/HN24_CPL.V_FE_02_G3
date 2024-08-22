"use client";
import { Button, FormProps, Input, Form } from "antd";
import { loginAction } from "@/actions/authAction";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { capitalizeFirstLetter } from "@/ultis/formatText";
import toast from "react-hot-toast";

const FormSignup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const handleLogin: FormProps<LoginCredentials>["onFinish"] = (values) => {
    setLoading(true);
    loginAction(values).then((result) => {
      if (result.success) {
        login(result.data);
        toast.success("Sign In successfully");
        router.replace("/");
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

  return (
    <Form
      name="basic"
      size="large"
      layout="vertical"
      labelCol={{ span: 6 }}
      style={{ maxWidth: 500, margin: "auto" }}
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      autoComplete="on"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your email!",
          },
          {
            type: "email",
            message: "The input is not a valid email!",
          },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item style={{ float: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormSignup;
