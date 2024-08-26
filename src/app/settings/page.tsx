"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { putUser } from "@/actions/handleUser";
import { parseCookies } from "nookies";
import { useAuth } from "@/contexts/auth";
import { Button, Form, Input, Select, Space, notification } from "antd";
import toast from "react-hot-toast";

const SettingsPage: React.FC = () => {
    const { user, login } = useAuth();
    const [api] = notification.useNotification();
    const router = useRouter();
    const [image, setImage] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [bio, setBio] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);

    const token = user?.token;

    const openNotification = (title: string, body: string) => {
        api.error({
            message: title,
            description: body,
            duration: 5,
        });
    };
    const handleUpdateSettings = async (e: React.FormEvent) => {
        //e.preventDefault();
        const userData = {
            email: user?.email,
            username: user?.username,
            bio: user?.bio,
            image: user?.image,
        };
        if (image) userData.image = image;
        if (username) userData.username = username;
        if (bio) userData.bio = bio;
        if (email) userData.email = email;

        if (Object.keys(userData).length === 0) {
            openNotification("No changes to update.", "");
            return;
        }
        try {
            await putUser(userData, token!!);

            router.push(`/profile/${username}`);
            router.refresh();
            toast.success("Updated setting successfully");
            // tạm thời giải quyết bằng cách cho đăng nhập lại
            login({
                email: email!!,
                token: user?.token!!,
                username: username!!,
                bio: bio!!,
                image: image!!,
                following: user?.following,
            });
            console.log(user);
        } catch (error) {
            toast.error("failed");

            throw error;
        }
    };

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <Form layout="vertical" onFinish={handleUpdateSettings}>
                            <Form.Item
                                label="New URL of profile picture"
                                name="image"
                            >
                                <Input
                                    placeholder="New URL of profile picture"
                                    onChange={(e) =>
                                        setImage(e.target.value || undefined)
                                    }
                                />
                            </Form.Item>

                            <Form.Item label="New username" name="username">
                                <Input
                                    placeholder="New username"
                                    onChange={(e) =>
                                        setUsername(e.target.value || undefined)
                                    }
                                />
                            </Form.Item>

                            <Form.Item
                                label="New short bio about you"
                                name="bio"
                            >
                                <Input.TextArea
                                    rows={8}
                                    placeholder="New short bio about you"
                                    onChange={(e) =>
                                        setBio(e.target.value || undefined)
                                    }
                                />
                            </Form.Item>

                            <Form.Item label="New email" name="email">
                                <Input
                                    placeholder="New email"
                                    onChange={(e) =>
                                        setEmail(e.target.value || undefined)
                                    }
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Update Settings
                                </Button>
                            </Form.Item>
                        </Form>

                        {/* <form onSubmit={handleUpdateSettings}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="New URL of profile picture"
                                        onChange={(e) =>
                                            setImage(
                                                e.target.value || undefined
                                            )
                                        }
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="New username"
                                        onChange={(e) =>
                                            setUsername(
                                                e.target.value || undefined
                                            )
                                        }
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        rows={8}
                                        placeholder="New short bio about you"
                                        onChange={(e) =>
                                            setBio(e.target.value || undefined)
                                        }
                                    ></textarea>
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="New email"
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value || undefined
                                            )
                                        }
                                    />
                                </fieldset>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary pull-xs-right"
                                >
                                    Update Settings
                                </button>
                            </fieldset>
                        </form> */}
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
