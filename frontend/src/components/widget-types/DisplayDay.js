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
        const { setDay, dayAPI } = this.props;

        //Before we do anything, save the day by pushing to file/database
        dayAPI.pushDay(this.props.currentDay);

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
     * handleDayNav fires when a directional arrow is clicked in widget-controls
     * @param {string} direction The direction to get the consecutive day
     */
    handleDayNav(direction) {
        const { setDay, dayAPI, currentDay } = this.props;

        if (currentDay.dayGoals.length !== 0) {
            this.props.dayAPI.pushDay(currentDay);
        }

        if (direction === ">") {
            setDay(dayAPI.getNextDay(currentDay));
        } else if (direction === "<") {
            setDay(dayAPI.getPreviousDay(currentDay));
        }
    }

    //TODO: Extract widget-controls to it's own component "Widget" with type="day" DONE.
    //AFTER DOING THAT: Making animations between the widgets should be much easier
    //QUESTION FOR MYSELF: Should DisplayDay's Widgets be a different component than DisplayWeek's?
    render() {
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <WidgetControls
                        type={"day"}
                        currentDay={this.props.currentDay}
                        handleDayNav={this.handleDayNav}
                        onClickControlItem={this.onClickControlItem}
                    />
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
