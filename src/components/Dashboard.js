import React, { Component } from "react";
import DisplayDay from "./widget-types/DisplayDay";
import DisplayWeek from "./widget-types/DisplayWeek";
import DisplayMonth from "./widget-types/DisplayMonth";

//Stylesheet
import "../styles/Dashboard.css";

export class Dashboard extends Component {
    styles = {
        leftX2: {
            left: "-200%"
        },
        left: {
            left: "-100%"
        },
        main: {
            left: "0%"
        },
        right: {
            left: "100%"
        },
        rightX2: {
            left: "200%"
        }
    };

    render() {
        const currentDisplay = this.props.currentDisplay;
        const { styles } = this;

        //Figure out styles
        let dayStyle, weekStyle, monthStyle;

        //If the day is current
        if (currentDisplay === "day") {
            //Day should be main, week should be right, month should be right * 2
            dayStyle = styles.main;
            weekStyle = styles.right;
            monthStyle = styles.rightX2;
        } else if (currentDisplay === "week") {
            //Day should be left, week should be main, month should be right
            dayStyle = styles.left;
            weekStyle = styles.main;
            monthStyle = styles.right;
        } else if (currentDisplay === "month") {
            //Day should be left * 2, week should be left, month should be main
            dayStyle = styles.leftX2;
            weekStyle = styles.left;
            monthStyle = styles.main;
        }

        return (
            <main id="dashboard-container">
                <DisplayDay style={dayStyle} />
                <DisplayWeek style={weekStyle} />
                <DisplayMonth style={monthStyle} />
            </main>
        );
    }
}

export default Dashboard;
