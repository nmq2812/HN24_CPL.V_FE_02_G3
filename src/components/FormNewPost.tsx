"use client";
import { Layout, Card, Avatar, Button } from "antd";
import { profile } from "console";
import Feed from "./Feed/Feed";
import { useAuth } from "@/contexts/auth";
import Link from "antd/es/typography/Link";

const { Content } = Layout;

function FormNewPost() {
    const { user } = useAuth();
    return user ? (
        <Card
            style={{
                width: "100%",
                marginBottom: 24,
                borderColor: "lightgray",
                border: "none",
                backgroundColor: "inherit",
            }}
        >
            <Link href={`/profile/${user?.username}`}>
                <Avatar
                    size={45}
                    src={user?.image}
                    style={{ marginRight: "24px" }}
                />
            </Link>

            <Button
                type="text"
                style={{
                    padding: "24px 0",
                    backgroundColor: "lightgray",
                    color: "black",
                    borderRadius: "24px",
                    width: "88%",
                }}
                // onClick={createPost}
            >
                What’s on your mind, {user?.username}?
            </Button>
        </Card>
    ) : (
        <div className=""></div>
    );
}

export default FormNewPost;
