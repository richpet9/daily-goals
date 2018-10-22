import React, { Component } from "react";
import DropDown from "./DropDown";

//Stylesheet
import "../../styles/WidgetControls.css";

export class WidgetControls extends Component {
    render() {
        let title, options;

        switch (this.props.type) {
            case "day":
                title = this.props.currentDay.getDayName();
                options = ["Today"];
                break;
            case "week":
                title =
                    "Week of " + this.props.weekData[0].getDateFormatted("/");
                options = ["This Week"];
                break;
            case "month":
                title = this.props.currentDay.getMonthName();
                options = ["This Month"];
                break;
            default:
                title = this.props.currentDay.getDayName();
                options = ["error"];
                break;
        }

        //The date is January 1, 1970, display the loading text
        if (
            this.props.currentDay.dayDate.toString() === new Date(0).toString()
        ) {
            title = "Loading...";
        }

        return (
            <div className="widget-controls">
                <span className="widget-title">{title}</span>
                <span
                    className="widget-previous"
                    onClick={this.props.handleDayNav.bind(this, "<")}
                >
                    &lt;
                </span>
                <DropDown
                    options={options}
                    function={this.props.onClickControlItem}
                    expanded={false}
                    day={this.props.currentDay}
                    today={this.props.today}
                    monthData={this.props.monthData}
                    weekData={this.props.weekData}
                    setDay={this.props.setDay}
                    handleDayNav={this.props.handleDayNav}
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
