import React, { Component } from "react";
import DayAPI from "../../classes/DayAPI";
import DropDown from "../widget-components/DropDown";
import DoneChart from "../widget-components/DoneChart";
import GoalField from "../widget-components/GoalField";

//Stylesheet
import "../../styles/DisplayDay.css";

//Temporarily getting days like so
import resDays from "../../userDays.json";

//Initialize the API with some placeholder data
const dayAPI = new DayAPI(resDays);

export class DisplayDay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: dayAPI.getToday(),
            currentSet: "Today"
        };

        this.onClickGoal = this.onClickGoal.bind(this);
        this.onClickControlItem = this.onClickControlItem.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
    }
    /**
     * onClickGoal() will fire when a goal block is clicked, toggling it's done state
     */
    onClickGoal(id) {
        this.setState({ day: this.state.day.toggleGoal(id) });
    }

    /**
     * onClickControlItem() will fire when an item in the control menu is selected
     */
    onClickControlItem(item) {
        //Before we do anything, save the day by pushing to file/database
        dayAPI.pushDay(this.state.day);

        //Change things about this widget to reflect what was clicked
        const today = dayAPI.getToday();

        //Set the currentSet
        this.setState({ currentSet: item });

        switch (item) {
            case "Today":
                this.setState({
                    day: today
                });
                break;
            case "Yesterday":
                this.setState({
                    day: dayAPI.getPreviousDay(today)
                });
                break;
            case "Tomorrow":
                this.setState({
                    day: dayAPI.getNextDay(today)
                });
                break;
            default:
                break;
        }
    }

    /**
     * onClickAdd() will fire when the "add goal" box is clicked
     */
    onClickAdd(goalText, goalDone) {
        this.sendNewGoals(goalText);
    }

    /**
     * sendNewGoals() will update the current day object with new goals
     * @param {String} goalText The text for the goal
     * @param {Boolean} goalDone If the goal is done or not
     */
    sendNewGoals(goalText, goalDone) {
        goalDone = goalDone || false;
        const newDay = this.state.day.addGoal(goalText, goalDone);
        this.setState({ day: newDay });
    }

    render() {
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <div className="widget-controls">
                        <span className="widget-title">
                            {this.state.day.getDayName()}
                        </span>
                        <DropDown
                            currentSet={this.state.currentSet}
                            options={[
                                "Today",
                                "Yesterday",
                                "Tomorrow",
                                "CALENDAR"
                            ]}
                            function={this.onClickControlItem}
                            expanded={false}
                            day={this.state.day}
                        />
                    </div>
                </div>
                <div className="widget-body">
                    <DoneChart day={this.state.day} type="horizontal" />

                    <GoalField
                        day={this.state.day}
                        onClickGoal={this.onClickGoal}
                        onClickAdd={this.onClickAdd}
                    />
                </div>
            </div>
        );
    }
}

export default DisplayDay;
