import React, { Component } from "react";
import DayInfo from "./DayInfo";

//Stylesheet
import "../../styles/DoneChart.css";

export class DoneChart extends Component {
    constructor(props) {
        super(props);

        //Set the default doneRatio
        const doneRatio = props.day.getDoneRatio();

        //Assign these values to the state
        this.state = {
            doneRatio: doneRatio
        };
    }

    componentWillReceiveProps(props) {
        //If the props are identical, return
        if (props === this.props) return;

        //Create the variables we will need, default 0
        const doneRatio = props.day.getDoneRatio();

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

export default DoneChart;
