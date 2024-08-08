"use client";

import "./page.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/app/login/page";
import Banner from "@/components/banner";
import axios from "axios";
import { useState } from "react";
import HomeTags from "@/components/homeTags";
import ArticleList from "@/components/articleList";
import getArticles from "@/utils/getArticles";

export default function App() {
    // Bug ở đây :))))
    // axios
    //     .post(apiUrl + "/users", {
    //         user: {
    //             email: "jake@jake.jake",
    //             bio: "I like to skateboard",
    //             image: "https://i.stack.imgur.com/xHWG8.jpg",
    //         },
    //     })
    //     .then(function (response) {
    //         // xử trí khi thành công
    //         console.log(response.data.articles);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .finally(function () {});
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
        </Router>
    );
}

function Home() {
    const [feedState, getFeedState] = useState(`global`);
    console.log(getArticles());
    return (
        <div className="home-page">
            <Header state="home"></Header>
            <Banner></Banner>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${
                                            feedState === "your" ? "active" : ""
                                        }`}
                                        href="#"
                                        onClick={() => getFeedState("your")}
                                    >
                                        Your Feed
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${
                                            feedState === "global"
                                                ? "active"
                                                : ""
                                        }`}
                                        href="#"
                                        onClick={() => getFeedState("global")}
                                    >
                                        Global Feed
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <ArticleList></ArticleList>
                    </div>

                    <HomeTags></HomeTags>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
