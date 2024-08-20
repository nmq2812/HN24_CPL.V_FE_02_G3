"use client";
import { Button, FormProps, Input, Form } from "antd";
import toast from "react-hot-toast";
import { loginAction } from "@/actions/index";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { capitalizeFirstLetter } from "@/ultis/capitalize";

const FormLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const handleLogin: FormProps<LoginCredentials>["onFinish"] = (values) => {
    setLoading(true);
    loginAction(values).then((res) => {
      if (res.status === 200) {
        login(res.response.user);
        toast.success("Đăng nhập thành công");
        router.replace("/");
      } else if (res.status === 422) {
        setLoading(false);
        const errors = res.response.errors;
        for (const key in errors) {
          const message = capitalizeFirstLetter(key) + " " + errors[key];
          toast.error(message);
        }
      }
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
      <Form.Item<LoginCredentials>
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

export default FormLogin;
