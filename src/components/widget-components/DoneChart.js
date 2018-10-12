import React, { Component } from "react";

//Stylesheet
import "../../styles/DoneChart.css";

export class DoneChart extends Component {
    constructor(props) {
        super(props);
        let dayStyle,
            doneRatio = 0;

        //Get the done ratio if this day has goals
        if (props.day.dayGoals.length > 0) {
            doneRatio = getDoneRatio(props.day);
        }

        //TODO: work on removing the dayInfo from this component
        dayStyle = this.getDayStyle(props, doneRatio);

        //Assign these values to the state
        this.state = {
            dayStyle: dayStyle,
            doneRatio: doneRatio
        };
    }

    componentWillReceiveProps(props) {
        //If the props are identical, return
        if (props === this.props) return;

        //Create the variables we will need
        let dayStyle,
            doneRatio = 0;

        //Get the done ratio if this day has goals
        if (props.day.dayGoals.length > 0) {
            doneRatio = getDoneRatio(props.day);
        }

        dayStyle = this.getDayStyle(props, doneRatio);

        //Assign the new state
        this.setState({
            dayStyle: dayStyle,
            doneRatio: doneRatio
        });
    }

    getDayStyle(props, doneRatio) {
        //Determine how to style the day info
        if (props.type === "vertical") {
            if (doneRatio >= 0.75) {
                //If this bar is 75% to the top
                return {
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
                return {
                    dayCont: {
                        top: "calc(" + (1 - doneRatio) * 100 + "% - 74px)"
                    },
                    percs: {
                        top: "calc(100% + 8px)"
                    }
                };
            }
        }
    }

    //Render a horizontal chart
    renderHorizontal() {
        return (
            <div
                className="chart-bar extend"
                style={{ width: this.doneRatio * 100 + "%" }}
            />
        );
    }

    renderVertical() {
        const { day } = this.props;
        const { doneRatio, dayStyle } = this.state;

        return (
            <div
                className="chart-container"
                onClick={this.props.goToDay.bind(this, this.props.day)}
            >
                <div className="chart-day-container" style={dayStyle.dayCont}>
                    <span className="chart-day-percent" style={dayStyle.percs}>
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
                            {Math.floor(doneRatio * 100).toString() + "%"}
                        </span>
                    </div>
                </div>
                <div
                    className="chart-bar extend"
                    style={{ height: doneRatio * 100 + "%" }}
                />
            </div>
        );
    }

    render() {
        const { doneRatio } = this;

        //Push this finished chart to the screen
        return (
            <div
                className={
                    doneRatio === 1
                        ? this.props.type + "-chart full"
                        : this.props.type + "-chart"
                }
            >
                {this.props.type === "horizontal"
                    ? //Horizontal chart
                      this.renderHorizontal()
                    : //Vertical chart
                      this.renderVertical()}
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
