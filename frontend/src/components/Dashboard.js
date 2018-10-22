import React, { Component } from "react";
import DisplayDay from "./widget-types/DisplayDay";
import DisplayWeek from "./widget-types/DisplayWeek";
import DisplayMonth from "./widget-types/DisplayMonth";

//Stylesheet
import "../styles/Dashboard.css";

export class Dashboard extends Component {
    render() {
        const { currentDisplay } = this.props;

        return (
            <main id="dashboard-container">
                {currentDisplay === "day" && (
                    <DisplayDay
                        weekData={this.props.weekData}
                        monthData={this.props.monthData}
                        currentDay={this.props.currentDay}
                        today={this.props.today}
                        dayAPI={this.props.dayAPI}
                        setDay={this.props.setDay}
                    />
                )}

                {currentDisplay === "week" && (
                    <DisplayWeek
                        weekData={this.props.weekData}
                        monthData={this.props.monthData}
                        currentDay={this.props.currentDay}
                        today={this.props.today}
                        dayAPI={this.props.dayAPI}
                        goToDay={this.props.goToDay}
                        setDay={this.props.setDay}
                    />
                )}

                {currentDisplay === "month" && (
                    <DisplayMonth
                        weekData={this.props.weekData}
                        monthData={this.props.monthData}
                        currentDay={this.props.currentDay}
                        today={this.props.today}
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
