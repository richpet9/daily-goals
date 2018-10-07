import React, { Component } from "react";

//Stylesheet
import "../../styles/DoneChart.css";

export class DoneChart extends Component {
    render() {
        let doneRatio = 0;

        //Get the done ratio if this day has goals
        if (this.props.day.dayGoals) {
            doneRatio = getDoneRatio(this.props.day);
        }

        //Push this finished chart to the screen
        return (
            <div
                className={
                    doneRatio === 1
                        ? "horizontal-chart full"
                        : "horizontal-chart"
                }
            >
                <div
                    className="chart-bar green"
                    style={{ width: doneRatio * 100 + "%" }}
                />
                <div className="chart-bar red" />
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
