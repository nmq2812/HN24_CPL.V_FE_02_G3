"use client";
import { followUser, unfollowUser } from "@/actions/handleFollow";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ButtonActionProfile({
  isMe,
  profile,
  token,
}: {
  isMe: boolean;
  profile: Profile;
  token?: string;
}) {
  const router = useRouter();
  const handleClickFollow = () => {
    if (token) {
      if (profile.following) {
        unfollowUser(profile.username, token);
      } else {
        followUser(profile.username, token);
      }
    } else {
      toast.error("You need login to do more");
      router.push("/login");
    }
  };

  return (
    <div className="btn btn-primary rounded">
      {isMe ? (
        <div>
          <Link href="/settings">
            <EditOutlined /> Edit Profile Settings
          </Link>
        </div>
      ) : (
        <div onClick={handleClickFollow}>
          {" "}
          <UserAddOutlined /> {profile.following ? "Followed" : "Follow"}
        </div>
      )}
    </div>
  );
}
