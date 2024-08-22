"use client";
import { getProfile } from "@/apis/profile";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
  console.log(profile?.username);

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
                    <i className="ion-gear-a" /> Edit Profile Settings
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
                  <a className="nav-link disabled" href="">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>
            <div className="article-preview">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
