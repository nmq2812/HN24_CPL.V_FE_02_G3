"use client";
import { signupAction } from "@/actions/authAction";
import { Button, FormProps, Input, Form } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import capitalizeFirstLetter  from "@/ultis/capitalize";
import toast from "react-hot-toast";

const FormLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin: FormProps<SignupCredentials>["onFinish"] = async (
    values
  ) => {
    setLoading(true);
    signupAction(values).then((result) => {
      if (result.success) {
        toast.success("Sign Up successfully");
        router.replace("/login");
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
      labelCol={{ span: 10 }}
      style={{ maxWidth: 500, margin: "auto" }}
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      autoComplete="on"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Enter your username" />
      </Form.Item>
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
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item style={{ float: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;
