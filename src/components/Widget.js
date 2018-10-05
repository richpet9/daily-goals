import React, { Component } from "react";
import DoneChart from "./widget-components/DoneChart";
import DayAPI from "../classes/DayAPI";
import GoalField from "./widget-components/GoalField";

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
            day: dayAPI.getToday()
        };

        this.onClickGoal = this.onClickGoal.bind(this);
    }
    /**
     * onClickGoal() will fire when a goal block is clicked, toggling it's done state
     */
    onClickGoal(id) {
        this.setState({ day: this.state.day.toggleGoal(id) });
    }

    /**
     * renderToday() will render the current day widget.
     */
    renderToday() {
        return (
            <div className="widget">
                <div className="widget-title">Today</div>
                <div className="widget-body">
                    <div className="widget-section-header">Progress:</div>
                    <DoneChart day={this.state.day} />
                    <div className="widget-section-header">Goals:</div>

                    <GoalField
                        day={this.state.day}
                        onClickGoal={this.onClickGoal}
                    />
                </div>
            </div>
        );
    }

    render() {
        return this.renderToday();
    }
}

export default Widget;
