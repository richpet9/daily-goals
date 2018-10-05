import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Footer from "./Footer";

//Stylesheet
import "../styles/Screen.css";

class Screen extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Dashboard />
                <Footer />
            </div>
        );
    }
}

export default Screen;
