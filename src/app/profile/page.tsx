"use client";
import { getProfile } from "@/apis/profile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Space } from "antd";

// export enum ProfileTab {
//     MyArticles = "my-articles",
//     FavoritedArticles = "favorited-articles",
// }

// type Params = {
//     username: string;
// };

// interface Props {
//     defaultTab: ProfileTab.MyArticles | ProfileTab.FavoritedArticles;
// }

/** 
  const profileQuery = (username: string) => ({
    queryKey: ['profile', username],
    queryFn: () => getProfile(username), //api
  });
*/

function ProfilePage() {
    const router = useSearchParams();
    const username = router.get("user");
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        if (typeof username === "string") {
            (async function () {
                const profile = await await getProfile(username);
                setProfile(profile.profile);
                console.log(profile.profile);
            })();
        } else console.log("error");
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
                                    <p></p>
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
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link active" href="">
                                        {username}'s articles
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="article-preview">
                            <div className="article-meta">
                                <a href="profile.html">
                                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                                </a>
                                <div className="info">
                                    <a href="" className="author">
                                        Eric Simons
                                    </a>
                                    <span className="date">January 20th</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i> 29
                                </button>
                            </div>
                            <a href="" className="preview-link">
                                <h1>How to build webapps that scale</h1>
                                <p>This is the description for the post.</p>
                                <span>Read more...</span>
                            </a>
                        </div> */}
                        <div className="">No articles are here... yet.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;