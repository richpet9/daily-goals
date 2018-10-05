import React, { Component } from "react";
import Widget from "./Widget";

//Stylesheet
import "../styles/Dashboard.css";

export class Dashboard extends Component {
    render() {
        return (
            <main id="dashboard-container">
                <Widget type="today" />
            </main>
        );
    }
}

export default Dashboard;
