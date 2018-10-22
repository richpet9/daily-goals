import React, { Component } from "react";
import CalendarDay from "../widget-components/CalendarDay";

import "../../styles/Calendar.css";

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.getMonthData = this.getMonthData.bind(this);
    }

    getMonthData(monthData) {
        //The columns of elements to display
        let sunday = [];
        let monday = [];
        let tuesday = [];
        let wednesday = [];
        let thursday = [];
        let friday = [];
        let saturday = [];

        //For every day in this month,
        for (let day of monthData) {
            //Do a switch case for the day, insert it into that day
            switch (day.dayDate.getUTCDay()) {
                case 0:
                    sunday.push(day);
                    break;
                case 1:
                    monday.push(day);
                    break;
                case 2:
                    tuesday.push(day);
                    break;
                case 3:
                    wednesday.push(day);
                    break;
                case 4:
                    thursday.push(day);
                    break;
                case 5:
                    friday.push(day);
                    break;
                case 6:
                    saturday.push(day);
                    break;
                default:
                    break;
            }
        }

        //The array of day arrays
        const days = [
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday
        ];

        //Remap the above array of arrays to make each sub array have day info elements
        const render = days.map(col => {
            return (
                <div className="calendar-col" key={days.indexOf(col)}>
                    {col.map(day => {
                        //If this day's month is not equal to the month data's 8th day's (must be in current month) month.
                        const classes = day => {
                            if (
                                day.dayDate.getUTCMonth() !==
                                monthData[8].dayDate.getUTCMonth()
                            ) {
                                return "calendar-day previous";
                            }

                            if (day.isEqual(this.props.day)) {
                                return "calendar-day current";
                            }

                            if (day.isEqual(this.props.today)) {
                                return "calendar-day today";
                            }

                            return "calendar-day";
                        };

                        return (
                            <CalendarDay
                                day={day}
                                classes={classes(day)}
                                key={col.indexOf(day)}
                                onClick={this.props.goToDay}
                                inNav={this.props.inNav}
                            />
                        );
                    })}
                </div>
            );
        });

        //Return that remapped array
        return render;
    }

    render() {
        return (
            <div
                className={
                    this.props.inNav
                        ? "calendar-container in-nav"
                        : "calendar-container"
                }
            >
                {this.props.inNav && (
                    <div className="calendar-nav">
                        <span
                            className="calendar-nav-arrow"
                            onClick={this.props.handleDayNav.bind(this, "<")}
                        >
                            &lt;
                        </span>
                        <span className="calendar-nav-month">
                            {this.props.day.getMonthName()}
                        </span>
                        <span
                            className="calendar-nav-arrow"
                            onClick={this.props.handleDayNav.bind(this, ">")}
                        >
                            &gt;
                        </span>
                    </div>
                )}
                {this.getMonthData(this.props.monthData)}
            </div>
        );
    }
}

export default Calendar;
