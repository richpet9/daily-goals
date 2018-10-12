import React, { Component } from "react";
import DoneChart from "../widget-components/DoneChart";
import DropDown from "../widget-components/DropDown";

//Stylesheet
import "../../styles/DisplayWeek.css";

export class DisplayWeek extends Component {
    constructor(props) {
        super(props);

        this.onClickControlItem = this.onClickControlItem.bind(this);
    }

    onClickControlItem(item) {
        //Get the dayAPI from props
        const { dayAPI } = this.props;

        //Get Today's Day
        const today = this.props.dayAPI.getToday();
        const sevenDaysInMs = 86400000 * 7;

        //Do something based on the item clicked
        switch (item) {
            case "This Week":
                //Set day to today
                this.props.setDay(today);
                break;
            case "Last Week":
                //Set day to seven days ago
                this.props.setDay(
                    dayAPI.getDayByDate(
                        new Date(today.dayDate.getTime() - sevenDaysInMs)
                    )
                );
                break;
            case "Next Week":
                //Set day to seven days from now
                this.props.setDay(
                    dayAPI.getDayByDate(
                        new Date(today.dayDate.getTime() + sevenDaysInMs)
                    )
                );
                break;
            default:
                break;
        }
    }

    getWeekData(day) {
        const weekData = this.props.dayAPI.getWeekOf(day);
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <div className="widget-controls">
                        <div className="widget-title">
                            Week of {weekData[0].getDateFormatted("/")}
                        </div>
                        <DropDown
                            options={[
                                "This Week",
                                "Last Week",
                                "Next Week",
                                "CALENDAR"
                            ]}
                            function={this.onClickControlItem}
                            expanded={false}
                            day={this.props.currentDay}
                        />
                    </div>
                </div>
                <div className="widget-body week">
                    {weekData.map(data => {
                        return (
                            <DoneChart
                                day={data}
                                type="vertical"
                                goToDay={this.props.goToDay}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

    render() {
        return this.getWeekData(this.props.currentDay);
    }
}

export default DisplayWeek;
