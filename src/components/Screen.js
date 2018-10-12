import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";

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
            currentDisplay: "week",
            currentDay: dayAPI.getToday()
        };

        //Bind functions
        this.handleNavClick = this.handleNavClick.bind(this);
        this.goToDay = this.goToDay.bind(this);
        this.setDay = this.setDay.bind(this);
    }

    handleNavClick(view) {
        //Set the currentDisplay to what is clicked
        this.setState({ currentDisplay: view.toLowerCase() });
    }

    goToDay(day) {
        this.setState({
            currentDisplay: "day",
            currentDay: dayAPI.getDayByDate(day.dayDate)
        });
    }

    //EUREKA:
    //Create a changeDay() method that simply changes the day to any
    //specified day. Pass this method to all children. The child
    //elements will have their own methods for determining
    //which day to change to!! this is genius!!
    //Also, get DayAPI and ResData out of every other class.
    setDay(day) {
        this.setState({ currentDay: day });
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
            </div>
        );
    }
}

export default Screen;
