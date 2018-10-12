import React, { Component } from "react";
import DropDown from "../widget-components/DropDown";
import DoneChart from "../widget-components/DoneChart";
import GoalField from "../widget-components/GoalField";

//Stylesheet
import "../../styles/DisplayDay.css";

export class DisplayDay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //This variable will control when the goals should update
            goals: this.props.currentDay.dayGoals
        };

        this.onClickGoal = this.onClickGoal.bind(this);
        this.onClickControlItem = this.onClickControlItem.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentDay.dayGoals !== this.state.goals) {
            this.setState({ goals: newProps.currentDay.dayGoals });
        }
    }

    /**
     * onClickControlItem() will fire when an item in the control menu is selected
     */
    onClickControlItem(item) {
        //Get the dayAPI from props
        const { dayAPI } = this.props;

        //Before we do anything, save the day by pushing to file/database
        dayAPI.pushDay(this.props.currentDay);

        //Get Today's Day
        const today = dayAPI.getToday();

        //Do something based on the item clicked
        switch (item) {
            case "Today":
                this.props.setDay(today);
                break;
            case "Yesterday":
                this.props.setDay(dayAPI.getPreviousDay(today));
                break;
            case "Tomorrow":
                this.props.setDay(dayAPI.getNextDay(today));
                break;
            default:
                break;
        }
    }

    /**
     * onClickAdd() will fire when the "add goal" box is clicked
     */
    onClickAdd(goalText, goalDone) {
        const { currentDay } = this.props;
        this.setState({
            goals: currentDay.addGoal(goalText, goalDone).dayGoals
        });
    }

    /**
     * onClickGoal() will fire when a goal block is clicked, toggling it's done state
     */
    onClickGoal(id) {
        const { currentDay } = this.props;
        this.setState({ goals: currentDay.toggleGoal(id).dayGoals });
    }

    render() {
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <div className="widget-controls">
                        <span className="widget-title">
                            {this.props.currentDay.getDayName()}
                        </span>
                        <DropDown
                            options={[
                                "Today",
                                "Yesterday",
                                "Tomorrow",
                                "CALENDAR"
                            ]}
                            function={this.onClickControlItem}
                            expanded={false}
                            day={this.props.currentDay}
                        />
                    </div>
                </div>
                <div className="widget-body">
                    <DoneChart day={this.props.currentDay} type="horizontal" />

                    <GoalField
                        goals={this.state.goals}
                        onClickGoal={this.onClickGoal}
                        onClickAdd={this.onClickAdd}
                    />
                </div>
            </div>
        );
    }
}

export default DisplayDay;
