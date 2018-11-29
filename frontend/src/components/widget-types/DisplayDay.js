import React, { Component } from "react";
import WidgetControls from "../widget-components/WidgetControls";
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

        //Bind Functions
        this.onClickGoal = this.onClickGoal.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickControlItem = this.onClickControlItem.bind(this);
        this.handleSetGoal = this.handleSetGoal.bind(this);
        this.handleDayNav = this.handleDayNav.bind(this);
    }

    //This method will update the goals whenever currentDay changes
    componentWillReceiveProps(newProps) {
        if (newProps.currentDay.dayGoals !== this.state.goals) {
            this.setState({ goals: newProps.currentDay.dayGoals });
        }
    }

    /**
     * onClickControlItem() will fire when an item in the control menu is selected
     */
    onClickControlItem(item) {
        //Get the dayAPI and setDay function from props
        const { setDay, dayAPI, currentDay } = this.props;

        //If the day we are leaving has goals, update the day in memory
        if (currentDay.dayGoals.length !== 0) {
            this.props.dayAPI.pushDay(currentDay);
        }

        //Get Today's Day
        const today = dayAPI.getToday();

        //Do something based on the item clicked
        switch (item) {
            case "Today":
                setDay(today);
                break;
            case "Yesterday":
                setDay(dayAPI.getPreviousDay(today));
                break;
            case "Tomorrow":
                setDay(dayAPI.getNextDay(today));
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

    /**
     * onClickGoal() will fire when a goal block is clicked, toggling it's done state
     */
    handleSetGoal(id, text) {
        const { currentDay } = this.props;
        this.setState({ goals: currentDay.setGoal(id, text).dayGoals });
    }

    /**
     * handleDayNav fires when a directional arrow is clicked in widget-controls
     * @param {string} direction The direction to get the consecutive day
     */
    handleDayNav(direction) {
        const { setDay, dayAPI, currentDay } = this.props;

        //If the day we are leaving has goals, update the day in memory
        if (currentDay.dayGoals.length !== 0) {
            this.props.dayAPI.pushDay(currentDay);
        }

        if (direction === ">") {
            setDay(dayAPI.getNextDay(currentDay));
        } else if (direction === "<") {
            setDay(dayAPI.getPreviousDay(currentDay));
        }
    }

    render() {
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <WidgetControls
                        weekData={this.props.weekData}
                        monthData={this.props.monthData}
                        type={"day"}
                        currentDay={this.props.currentDay}
                        today={this.props.today}
                        handleDayNav={this.handleDayNav}
                        onClickControlItem={this.onClickControlItem}
                        setDay={this.props.setDay}
                    />
                </div>
                <div className="widget-body">
                    <DoneChart day={this.props.currentDay} type="horizontal" />

                    <GoalField
                        goals={this.state.goals}
                        onClickGoal={this.onClickGoal}
                        onClickAdd={this.onClickAdd}
                        handleSetGoal={this.handleSetGoal}
                    />
                </div>
            </div>
        );
    }
}

export default DisplayDay;
