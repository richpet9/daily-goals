import React, { Component } from "react";

//Stylesheet
import "../../styles/DoneChart.css";

export class DoneChart extends Component {
    render() {
        //If the days prop is the special keyword "today"
        const doneRatio = getDoneRatio(this.props.day); //Get the done ratio

        //Push this finished chart to the screen
        return (
            <div className="horizontal-chart">
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
