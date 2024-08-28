"use client";
import { Button, FormProps, Input, Form, Tag } from "antd";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useAuth } from "@/contexts/auth";
import { putUser } from "@/actions/handleUser";
import toast from "react-hot-toast";
import { getProfile } from "@/actions/handleProfile";

const FormUpdateProfile = () => {
  const { user, update } = useAuth();
  const cookies = parseCookies();
  const token = cookies.token;


  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const res = await getProfile(user?.username!!);
          if (res) {

            form.setFieldsValue({
              username: res.profile.username,
              bio: res.profile.bio,
              following: res.profile.following,
              image: res.profile.image,
            });
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      }
    })();
  }, [user]);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish: FormProps<Profile>["onFinish"] = async (values) => {
    const isFieldUpdated = Object.values(values).some((field) => field);
    if (!isFieldUpdated) {
      return form.setFields([
        {
          name: "username",
          errors: ["At least one field is required"],
        },
      ]);
    }

    setLoading(true);
    try {
      const result = await putUser(values, token);
      if (result.success) {
        toast.success("User updated successfully");

        update(result.data);
      } else {
        toast.error("Error updating");
      }
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name="update-user-form"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
    >
      <Form.Item name="username" label="Username">
        <Input placeholder="Enter your username" />
      </Form.Item>

      <Form.Item name="email" label="Email">
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item name="bio" label="Bio">
        <Input.TextArea rows={4} placeholder="Enter your bio" />
      </Form.Item>

      <Form.Item name="image" label="Profile Image URL">
        <Input placeholder="Enter your profile image URL" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormUpdateProfile;
