import React, { Component } from "react";
import DayInfo from "./DayInfo";

//Stylesheet
import "../../styles/DoneChart.css";

export class DoneChart extends Component {
    constructor(props) {
        super(props);

        //Set the default doneRatio
        let doneRatio = 0;

        //Get the done ratio if this day has goals
        if (props.day.dayGoals.length > 0) {
            doneRatio = getDoneRatio(props.day);
        }

        //Assign these values to the state
        this.state = {
            doneRatio: doneRatio
        };
    }

    componentWillReceiveProps(props) {
        //If the props are identical, return
        if (props === this.props) return;

        //Create the variables we will need, default 0
        let doneRatio = 0;

        //Get the done ratio if this day has goals
        if (props.day.dayGoals.length > 0) {
            doneRatio = getDoneRatio(props.day);
        }

        //Assign the new state
        this.setState({
            doneRatio: doneRatio
        });
    }

    //Render a horizontal chart
    renderHorizontal() {
        return (
            <div
                className="chart-bar extend"
                style={{ width: this.state.doneRatio * 100 + "%" }}
            />
        );
    }

    //Render vertical chart
    renderVertical() {
        const { day } = this.props;
        const { doneRatio } = this.state;

        return (
            <div
                className="chart-container"
                onClick={this.props.goToDay.bind(this, this.props.day)}
            >
                <DayInfo day={day} doneRatio={doneRatio} />
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
