"use client";
import { getProfile } from "@/actions/profile";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { List } from "antd";

export default function ProfilePage({
    params,
}: {
    params: { username: string };
}) {
    const username = params.username;
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        (async function () {
            const profile = await (await getProfile(username)).profile;
            setProfile(profile);
        })();
    }, []);


    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <div className="row">
                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <img
                                        src={profile?.image}
                                        className="user-img"
                                        alt="profile avatar"
                                    />
                                    <h4>{profile?.username}</h4>
                                    <p>{profile?.bio}</p>
                                    <a
                                        className="btn btn-sm btn-outline-secondary action-btn"
                                        href="/settings"
                                    >
                                        <i className="ion-gear-a" /> Edit
                                        Profile Settings
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <List></List>
            </div>
        </div>
    );
}
