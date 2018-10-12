import React, { Component } from "react";
import DropDown from "./DropDown";

//Stylesheet
import "../../styles/WidgetControls.css";

export class WidgetControls extends Component {
    render() {
        return (
            <div className="widget-controls">
                <span className="widget-title">
                    {this.props.type === "day"
                        ? this.props.currentDay.getDayName()
                        : "Week of " +
                          this.props.weekData[0].getDateFormatted("/")}
                </span>
                <span
                    className="widget-previous"
                    onClick={this.props.handleDayNav.bind(this, "<")}
                >
                    &lt;
                </span>
                <DropDown
                    options={
                        this.props.type === "day"
                            ? ["Today", "Yesterday", "Tomorrow", "CALENDAR"]
                            : [
                                  "This Week",
                                  "Last Week",
                                  "Next Week",
                                  "CALENDAR"
                              ]
                    }
                    function={this.props.onClickControlItem}
                    expanded={false}
                    day={this.props.currentDay}
                />

                <span
                    className="widget-next"
                    onClick={this.props.handleDayNav.bind(this, ">")}
                >
                    &gt;
                </span>
            </div>
        );
    }
}

export default WidgetControls;
