import React, { Component } from "react";
import DayInfo from "./DayInfo";

import "../../styles/Calendar.css";

class Calendar extends Component {
    state = { monthData: this.props.monthData };

    getMonthData() {
        //The columns of elements to display
        let sunday = [];
        let monday = [];
        let tuesday = [];
        let wednesday = [];
        let thursday = [];
        let friday = [];
        let saturday = [];

        //For every day in this month,
        for (let day of this.state.monthData) {
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
                <div className="calendar-col">
                    {col.map(day => {
                        return (
                            <div
                                className="calendar-day"
                                onClick={this.props.goToDay.bind(this, day)}
                            >
                                {day.dayDate.getUTCDate()}
                            </div>
                        );
                    })}
                </div>
            );
        });

        //Return that remapped array
        return render;
    }

    render() {
        return <div className="calendar-container">{this.getMonthData()}</div>;
    }
}

export default Calendar;
