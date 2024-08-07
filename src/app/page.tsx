"use client";

import "./page.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Home from "@/components/pages/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/app/login/page";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={renderApp(<Home></Home>)}></Route>
                <Route
                    path="/login"
                    element={renderApp(<Login></Login>)}
                ></Route>
            </Routes>
        </Router>
    );
}

function renderApp(p0: any) {
    return (
        <div className="">
            <Header></Header>
            {p0}
            <Footer></Footer>
        </div>
    );
}
