import React, { Component } from "react";
import DisplayDay from "./widget-types/DisplayDay";
import DisplayWeek from "./widget-types/DisplayWeek";
import DisplayMonth from "./widget-types/DisplayMonth";

//Stylesheet
import "../styles/Dashboard.css";

export class Dashboard extends Component {
    constructor(props) {
        super(props);

        //These are styles for transitions but I removed those
        this.styles = {
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
    }

    render() {
        const { currentDisplay } = this.props;

        return (
            <main id="dashboard-container">
                {currentDisplay === "day" && (
                    <DisplayDay
                        currentDay={this.props.currentDay}
                        dayAPI={this.props.dayAPI}
                        setDay={this.props.setDay}
                    />
                )}

                {currentDisplay === "week" && (
                    <DisplayWeek
                        currentDay={this.props.currentDay}
                        dayAPI={this.props.dayAPI}
                        goToDay={this.props.goToDay}
                        setDay={this.props.setDay}
                    />
                )}

                {currentDisplay === "month" && (
                    <DisplayMonth
                        currentDay={this.props.currentDay}
                        dayAPI={this.props.dayAPI}
                        goToDay={this.props.goToDay}
                        setDay={this.props.setDay}
                    />
                )}
            </main>
        );
    }
}

export default Dashboard;
