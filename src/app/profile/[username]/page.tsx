"use client";
import { getProfile } from "@/apis/profile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export enum ProfileTab {
    MyArticles = "my-articles",
    FavoritedArticles = "favorited-articles",
}

type Params = {
    username: string;
};

interface Props {
    defaultTab: ProfileTab.MyArticles | ProfileTab.FavoritedArticles;
}

/** 
  const profileQuery = (username: string) => ({
    queryKey: ['profile', username],
    queryFn: () => getProfile(username), //api
  });
*/

export default function ProfilePage() {
    const username = usePathname().substring(9);
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
                                        <i className="ion-gear-a" /> Edit
                                        Profile Settings
                                    </a>
                                </div>
                            </div>
                            {/** 
              <Image
                src={ }
                className="user-img"
                alt="profile avatar"
              />
              <h4>{ user name }</h4>
              <p>{ bio }</p>
              {isAuthor && (
                <Link
                  href={}
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-gear-a"></i> Edit Profile Settings
                </Link> 
              )}

              {!isAuthor && (
                <FollowButton
                  username={profile.username}
                  following={profile.following}
                />
               )} */}
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
                                {/** 
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === ProfileTab.MyArticles ? "active" : ""
                    }`}
                    href=""
                    onClick={(event) => switchTab(ProfileTab.MyArticles, event)}
                  >
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === ProfileTab.FavoritedArticles ? "active" : ""
                    }`}
                    href=""
                    onClick={(event) =>
                      switchTab(ProfileTab.FavoritedArticles, event)
                    }
                  >
                    Favorited Articles
                  </a>
                </li>*/}
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
                        {/** 
            {isFetchingArticles && <div>Loading articles...</div>}
            {!isFetchingArticles &&
              articles &&
              articles.articles &&
              articles.articles.map((article: Article) => (
                <ArticlePreview article={article} key={article.slug} />
              ))}
            {!isLoadingArticles &&
              articles &&
              articles.articles &&
              articles.articles.length === 0 && (
                <div>No articles are here... yet.</div>
              )}

            {!isFetchingArticles && articles && articles.articlesCount > 10 && (
              <Pagination
                count={articles.articlesCount}
                limit={10}
                update={setPage}
              />
            )}*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
