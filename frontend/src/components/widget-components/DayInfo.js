import React, { Component } from "react";

//Stylesheet
import "../../styles/DayInfo.css";

export class DayInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayStyle: this.getDayStyle(props)
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ dayStyle: this.getDayStyle(props) });
    }

    getDayStyle(props) {
        const { doneRatio } = props;
        //Determine how to style the day info
        if (doneRatio >= 0.75) {
            //If this bar is 75% to the top
            return {
                //Style for the day name and date
                dayCont: {
                    top: (1 - doneRatio) * 100 + "%",
                    color: "white"
                },
                //Style for the percent
                num: {
                    top: "100%"
                }
            };
        } else {
            return {
                dayCont: {
                    top: "calc(" + (1 - doneRatio) * 100 + "% - 58px)"
                },
                num: {
                    top: "calc(100% + 8px)"
                }
            };
        }
    }

    render() {
        const { day } = this.props;
        const { dayStyle } = this.state;

        return (
            <div className="chart-day-container" style={dayStyle.dayCont}>
                <span className="chart-day-num" style={dayStyle.num}>
                    {day.dayDate.getUTCDate()}
                </span>
                <div className="dayinfo-container">
                    <span className="chart-day-name">
                        {day
                            .getDayName()
                            .substring(0, 3)
                            .toUpperCase()}
                    </span>
                    <span className="chart-day-percent">
                        {Math.floor(this.props.doneRatio * 100).toString() +
                            "%"}
                    </span>
                </div>
            </div>
        );
    }
}

export default DayInfo;
