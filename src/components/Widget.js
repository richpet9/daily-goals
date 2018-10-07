import React, { Component } from "react";
import DoneChart from "./widget-components/DoneChart";
import DayAPI from "../classes/DayAPI";
import GoalField from "./widget-components/GoalField";
import DropDown from "./DropDown";

//Temporarily getting days like so
import resDays from "../userDays.json";

//Stylesheet
import "../styles/Widget.css";

//Initialize the API with some placeholder data
const dayAPI = new DayAPI(resDays);

export class Widget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: dayAPI.getToday(),
            widgetTitle: "Today"
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
     * onClickControlIrem() will fire when an item in the control menu is selected
     */
    onClickControlItem(item) {
        //Set the state of the control widget to close it and change title
        this.setState({ widgetTitle: item });

        //Change things about this widget to reflect what was clicked
        const today = dayAPI.getToday();

        switch (item) {
            case "Today":
                this.setState({
                    day: today
                });
                break;
            case "Yesterday":
                this.setState({
                    day: dayAPI.getDayByDate(
                        today.dayNum - 1,
                        today.dayMonth,
                        today.dayYear
                    )
                });
                break;
            case "Tomorrow":
                this.setState({
                    day: dayAPI.getDayByDate(
                        today.dayNum + 1,
                        today.dayMonth,
                        today.dayYear
                    )
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

    /**
     * renderToday() will render the current day widget.
     */
    renderToday() {
        return (
            <div className="widget">
                <div className="widget-controls-container">
                    <div className="widget-controls">
                        <span className="widget-title">
                            {this.state.day.dayName}
                        </span>
                        <DropDown
                            title={this.state.widgetTitle}
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
                    <div className="widget-section-header">Progress:</div>
                    <DoneChart day={this.state.day} />
                    <div className="widget-section-header">Goals:</div>

                    <GoalField
                        day={this.state.day}
                        onClickGoal={this.onClickGoal}
                        onClickAdd={this.onClickAdd}
                    />
                </div>
            </div>
        );
    }

    render() {
        //Depending on type, render certain widgets
        if (this.props.type === "day") return this.renderToday();
        if (this.props.type === "week") return this.renderToday();
        if (this.props.type === "month") return this.renderToday();
    }
}

export default Widget;
