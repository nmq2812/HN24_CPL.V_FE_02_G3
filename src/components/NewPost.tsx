"use client";
import { Avatar, Button, Card, Input } from "antd";
import { useAuth } from "@/contexts/auth";

export default function NewPost() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <div className="border rounded mb-3">
        {" "}
        <Card>
          <div className="d-flex flex-row align-items-center">
            <Avatar className="me-2" size={40} src={user?.image} />
            <Input
              className="flex-grow-1"
              placeholder="Create a new article..."
              style={{ width: "initial", height: "80%" }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
