import React, { Component } from "react";

//Stylesheet
import "../../styles/DoneChart.css";

export class DoneChart extends Component {
    render() {
        let doneRatio = 0;
        const { day } = this.props;
        let dayStyle;

        //Get the done ratio if this day has goals
        if (this.props.day.dayGoals.length > 0) {
            doneRatio = getDoneRatio(this.props.day);
        }

        //Determine how to style the day info
        if (this.props.type === "vertical") {
            if (doneRatio >= 0.75) {
                //If this bar is 75% to the top
                dayStyle = {
                    //Style for the day name and date
                    dayCont: {
                        top: (1 - doneRatio) * 100 + "%",
                        color: "white"
                    },
                    //Style for the percent
                    percs: {
                        top: "100%"
                    }
                };
            } else {
                dayStyle = {
                    dayCont: {
                        top: "calc(" + (1 - doneRatio) * 100 + "% - 74px)"
                    },
                    percs: {
                        top: "calc(100% + 8px)"
                    }
                };
            }
        }

        //Push this finished chart to the screen
        return (
            <div
                className={
                    doneRatio === 1
                        ? this.props.type + "-chart full"
                        : this.props.type + "-chart"
                }
            >
                {this.props.type === "horizontal" ? (
                    //Horizontal chart
                    <div
                        className="chart-bar extend"
                        style={{ width: doneRatio * 100 + "%" }}
                    />
                ) : (
                    //Vertical chart
                    <div
                        className="chart-container"
                        onClick={this.props.goToDay.bind(this, this.props.day)}
                    >
                        <div
                            className="chart-day-container"
                            style={dayStyle.dayCont}
                        >
                            <span
                                className="chart-day-percent"
                                style={dayStyle.percs}
                            >
                                {day.dayDate.getDate() + 1}
                            </span>
                            <div className="dayinfo-container">
                                <span className="chart-day-name">
                                    {day
                                        .getDayName()
                                        .substring(0, 3)
                                        .toUpperCase()}
                                </span>
                                <span className="chart-day-num">
                                    {Math.floor(doneRatio * 100).toString() +
                                        "%"}
                                </span>
                            </div>
                        </div>
                        <div
                            className="chart-bar extend"
                            style={{ height: doneRatio * 100 + "%" }}
                        />
                    </div>
                )}
            </div>
        );
    }
}

/**
 * getDoneRatio() will return the amount of done goals divided by the
 * total amount of goals
 * @param {JSON} day
 */
function getDoneRatio(day) {
    let doneGoals = 0;
    const totalGoals = day.dayGoals.length;

    day.dayGoals.forEach(goal => {
        if (goal.goalDone === true) doneGoals++;
    });

    return doneGoals / totalGoals;
}

export default DoneChart;
