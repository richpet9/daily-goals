import React, { Component } from "react";
import DayAPI from "../../classes/DayAPI";
import DoneChart from "../widget-components/DoneChart";
import DropDown from "../widget-components/DropDown";

import resDays from "../../userDays.json";

//Stylesheet
import "../../styles/DisplayWeek.css";

//Initialize the API with some placeholder data
const dayAPI = new DayAPI(resDays);

export class DisplayWeek extends Component {
    constructor(props) {
        super(props);

        const today = dayAPI.getToday();

        this.state = {
            day: today
        };

        this.onClickControlItem = this.onClickControlItem.bind(this);
    }

    onClickControlItem() {
        this.setState({ day: dayAPI.getDayByDate(new Date("11/21/2018")) });
    }

    getWeekData(day) {
        const weekData = dayAPI.getWeekOf(day);
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <div className="widget-controls">
                        <div className="widget-title">
                            Week of {weekData[0].getDateFormatted("/")}
                        </div>
                        <DropDown
                            currentSet={this.state.currentSet}
                            options={[
                                "Today",
                                "Yesterday",
                                "Tomorrow",
                                "CALENDAR"
                            ]}
                            function={this.onClickControlItem}
                            expanded={false}
                            day={this.state.day}
                        />
                    </div>
                </div>
                <div className="widget-body week">
                    <DoneChart day={weekData[0]} type="vertical" />
                    <DoneChart day={weekData[1]} type="vertical" />
                    <DoneChart day={weekData[2]} type="vertical" />
                    <DoneChart day={weekData[3]} type="vertical" />
                    <DoneChart day={weekData[4]} type="vertical" />
                    <DoneChart day={weekData[5]} type="vertical" />
                    <DoneChart day={weekData[6]} type="vertical" />
                </div>
            </div>
        );
    }

    render() {
        const { day } = this.state;
        return this.getWeekData(day);
    }
}

export default DisplayWeek;
