"use client";
import { loginAPI } from "@/actions/index";
import { Button, FormProps, Input, Form } from "antd";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin: FormProps<LoginCredentials>["onFinish"] = async (
        values
    ) => {
        const res = await loginAPI(values);
        if (res.status === 200) {
            login(res.response.user);
            router.push("/");
        } else if (res.status === 422) {
            throw new Error(res.response);
        }
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link href="/login">Have an account?</Link>
                        </p>

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
                                        message:
                                            "The input is not a valid email!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item<LoginCredentials>
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Enter your password" />
                            </Form.Item>

                            <Form.Item style={{ float: "right" }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
