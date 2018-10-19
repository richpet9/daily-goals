import React, { Component } from "react";
import WidgetControls from "../widget-components/WidgetControls";
import Calendar from "../widget-components/Calendar";

export class DisplayWeek extends Component {
    constructor(props) {
        super(props);

        //Bind methods
        this.handleDayNav = this.handleDayNav.bind(this);
        this.onClickControlItem = this.onClickControlItem.bind(this);
    }

    handleDayNav(direction) {
        const { setDay, dayAPI, currentDay } = this.props;
        const currentMonth = currentDay.dayDate.getUTCMonth();
        const currentYear = currentDay.dayDate.getUTCFullYear();

        if (direction === ">") {
            setDay(
                dayAPI.getDayByDate(new Date(currentYear, currentMonth + 1, 1))
            );
        } else if (direction === "<") {
            setDay(
                dayAPI.getDayByDate(new Date(currentYear, currentMonth - 1, 1))
            );
        }
    }

    onClickControlItem(item) {
        //Get the dayAPI from props
        const { dayAPI, setDay } = this.props;

        //Get Today's Info
        const today = dayAPI.getToday();
        const currentMonth = today.dayDate.getUTCMonth();
        const currentYear = today.dayDate.getUTCFullYear();

        //Do something based on the item clicked
        switch (item) {
            case "This Month":
                //Set day to today
                setDay(today);
                break;
            case "Last Month":
                //Set day to first of last month
                setDay(
                    dayAPI.getDayByDate(
                        new Date(currentYear, currentMonth - 1, 1)
                    )
                );
                break;
            case "Next Month":
                //Set day to seven days from now
                setDay(
                    dayAPI.getDayByDate(
                        new Date(currentYear, currentMonth + 1, 1)
                    )
                );
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <WidgetControls
                        type={"month"}
                        currentDay={this.props.currentDay}
                        monthData={this.props.monthData}
                        weekData={this.props.weekData}
                        handleDayNav={this.handleDayNav}
                        onClickControlItem={this.onClickControlItem}
                        setDay={this.props.setDay}
                    />
                </div>
                <div className="widget-body">
                    <Calendar
                        day={this.props.currentDay}
                        goToDay={this.props.goToDay}
                        monthData={this.props.monthData}
                    />
                </div>
            </div>
        );
    }
}

export default DisplayWeek;
