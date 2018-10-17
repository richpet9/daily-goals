import React, { Component } from "react";
import WidgetControls from "../widget-components/WidgetControls";
import Calendar from "../widget-components/Calendar";

export class DisplayWeek extends Component {
    constructor(props) {
        super(props);

        //Bind methods
        this.renderMonthDays = this.renderMonthDays.bind(this);
    }

    handleDayNav() {
        return null;
    }

    onClickControlItem() {
        return null;
    }

    renderMonthDays() {
        let monthData = this.props.dayAPI.getMonthOf(this.props.currentDay);
        console.log(monthData);
        //TODO: Create a calandar component that can also go in DropDown?
        return <Calendar monthData={monthData} goToDay={this.props.goToDay} />;
    }

    render() {
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <WidgetControls
                        type={"month"}
                        currentDay={this.props.currentDay}
                        handleDayNav={this.handleDayNav}
                        onClickControlItem={this.onClickControlItem}
                    />
                </div>
                <div className="widget-body">{this.renderMonthDays()}</div>
            </div>
        );
    }
}

export default DisplayWeek;
