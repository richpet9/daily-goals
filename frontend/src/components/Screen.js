import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Debug from "./Debug";
import DayAPI from "../classes/DayAPI";

//Stylesheet
import "../styles/Screen.css";

const dayAPI = new DayAPI();

class Screen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDay: null,
            currentDisplay: "day" //Default dispaly\
        };

        //Bind functions
        this.handleNavClick = this.handleNavClick.bind(this);
        this.goToDay = this.goToDay.bind(this);
        this.setDay = this.setDay.bind(this);

        //Bind debug methods
        this.logAPI = this.logAPI.bind(this);
        this.logCurrentDay = this.logCurrentDay.bind(this);
    }

    componentDidMount() {
        fetch("/api/days")
            .then(res => res.json())
            .then(response => {
                dayAPI.setResDays(response);
                this.setDay(dayAPI.getToday());
            });
    }

    handleNavClick(view) {
        if (this.state.currentDay.dayGoals.length !== 0) {
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
        this.setState({ currentDay: day });
    }

    //DEBUG
    logAPI() {
        dayAPI.logAPIResponse();
    }

    logCurrentDay() {
        console.log(this.state.currentDay);
    }

    setDbValues() {
        const response = dayAPI.getResDays();

        fetch("/api/days/post", {
            method: "post",
            body: response,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(res => res.json())
            .then(response => console.log(response));
    }

    render() {
        return this.state.currentDay ? (
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
        ) : (
            <div className="container">
                Could not get current day from database.
                <Debug
                    logAPI={this.logAPI}
                    logCurrentDay={this.logCurrentDay}
                />
            </div>
        );
    }
}

export default Screen;
