import React, { Component } from "react";
import DayAPI from "../../classes/DayAPI";

import resDays from "../../userDays.json";

//Initialize the API with some placeholder data
const dayAPI = new DayAPI(resDays);

export class DisplayWeek extends Component {
    constructor(props) {
        super(props);

        const today = dayAPI.getToday();

        this.state = {
            day: today,
            weekData: dayAPI.getWeekOf(today)
        };
    }
    render() {
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <div className="widget-title">
                        Week of {this.state.weekData}
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayWeek;
