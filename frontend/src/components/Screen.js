import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Debug from "./Debug";

//Stylesheet
import "../styles/Screen.css";

//temp
import resDays from "../userDays.json";
import DayAPI from "../classes/DayAPI";
const dayAPI = new DayAPI(resDays);

class Screen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDisplay: "day", //Default dispaly
            currentDay: dayAPI.getToday() //Default day
        };

        //Bind functions
        this.handleNavClick = this.handleNavClick.bind(this);
        this.goToDay = this.goToDay.bind(this);
        this.setDay = this.setDay.bind(this);

        //Bind debug methods
        this.logCurrentDay = this.logCurrentDay.bind(this);
    }

    handleNavClick(view) {
        if (this.state.currentDay.dayGoals !== 0) {
            dayAPI.pushDay(this.state.currentDay);
        }
        //Set the currentDisplay to what is clicked
        this.setState({ currentDisplay: view.toLowerCase() });
    }

    /**
     * Note: This method will change the view to day AND change the current day
     *
     */
    goToDay(day) {
        this.setState({
            currentDisplay: "day",
            currentDay: dayAPI.getDayByDate(day.dayDate)
        });
    }

    /**
     * Note: This method is ONLY change the current day set
     *
     */
    setDay(day) {
        const lastDay = this.state.currentDay;
        const newDay = day;

        this.setState({ currentDay: newDay });
    }

    //DEBUG
    logAPI() {
        dayAPI.logAPIResponse();
    }

    logCurrentDay() {
        console.log(this.state.currentDay);
    }

    render() {
        return (
            <div className="container">
                <Header onClickFunc={this.handleNavClick} />
                <Dashboard
                    currentDisplay={this.state.currentDisplay}
                    currentDay={this.state.currentDay}
                    goToDay={this.goToDay}
                    dayAPI={dayAPI}
                    setDay={this.setDay}
                />
                <Debug
                    logAPI={this.logAPI}
                    logCurrentDay={this.logCurrentDay}
                />
            </div>
        );
    }
}

export default Screen;
