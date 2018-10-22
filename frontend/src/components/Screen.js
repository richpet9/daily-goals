import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Debug from "./Debug";
import DayAPI, { Day } from "../classes/DayAPI";

//Stylesheet
import "../styles/Screen.css";

//Initialize the day interface API
const dayAPI = new DayAPI();

class Screen extends Component {
    dummyDayData = {
        _id: 0,
        dayDate: new Date(0),
        dayGoals: [
            {
                goalId: 0,
                goalDone: false,
                goalText: ""
            }
        ]
    };

    dummyDay = new Day(this.dummyDayData);

    constructor(props) {
        super(props);

        this.state = {
            currentDay: null,
            currentDisplay: "week" //Default dispaly
        };

        //Bind functions
        this.handleNavClick = this.handleNavClick.bind(this);
        this.goToDay = this.goToDay.bind(this);
        this.setDay = this.setDay.bind(this);

        //Bind debug methods
        this.logAPI = this.logAPI.bind(this);
        this.logCurrentDay = this.logCurrentDay.bind(this);
    }

    componentWillMount() {
        fetch("/api/days")
            .then(res => res.json())
            .then(response => {
                dayAPI.setResDays(response);
                this.setState({ currentDay: dayAPI.getToday() });
            });
    }

    /**
     *  hanldleNavClick() will handle what happens whent he navbar is clicked
     */
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

        fetch("/api/days", {
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
        const currentDay = this.state.currentDay
            ? this.state.currentDay
            : this.dummyDay;

        const today = dayAPI.getToday();

        const monthData = dayAPI.getMonthOf(currentDay);
        const weekData = dayAPI.getWeekOf(currentDay);

        return (
            <div className="container">
                <Header
                    onClickFunc={this.handleNavClick}
                    currentDisplay={
                        this.state.currentDisplay
                            ? this.state.currentDisplay
                            : "week"
                    }
                />
                <Dashboard
                    weekData={weekData}
                    monthData={monthData}
                    currentDisplay={
                        this.state.currentDisplay
                            ? this.state.currentDisplay
                            : "week"
                    }
                    currentDay={currentDay}
                    today={today}
                    goToDay={this.goToDay}
                    dayAPI={dayAPI}
                    setDay={this.setDay}
                />
                <Debug
                    logAPI={this.logAPI}
                    logCurrentDay={this.logCurrentDay}
                    monthData={monthData}
                />
            </div>
        );
    }
}

export default Screen;
