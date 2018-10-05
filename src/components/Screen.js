import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";

//Stylesheet
import "../styles/Screen.css";

class Screen extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Dashboard />
            </div>
        );
    }
}

export default Screen;
