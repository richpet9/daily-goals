import React, { Component } from "react";
import DoneChart from "../widget-components/DoneChart";
import WidgetControls from "../widget-components/WidgetControls";

//Stylesheet
import "../../styles/DisplayWeek.css";

export class DisplayWeek extends Component {
    constructor(props) {
        super(props);

        //Bind Functions
        this.onClickControlItem = this.onClickControlItem.bind(this);
        this.handleDayNav = this.handleDayNav.bind(this);
    }

    onClickControlItem(item) {
        //Get the dayAPI from props
        const { dayAPI, setDay } = this.props;

        //Get Today's Day
        const today = dayAPI.getToday();
        const sevenDaysInMs = 86400000 * 7;

        //Do something based on the item clicked
        switch (item) {
            case "This Week":
                //Set day to today
                setDay(today);
                break;
            case "Last Week":
                //Set day to seven days ago
                setDay(
                    dayAPI.getDayByDate(
                        new Date(today.dayDate.getTime() - sevenDaysInMs)
                    )
                );
                break;
            case "Next Week":
                //Set day to seven days from now
                setDay(
                    dayAPI.getDayByDate(
                        new Date(today.dayDate.getTime() + sevenDaysInMs)
                    )
                );
                break;
            default:
                break;
        }
    }

    /**
     * handleDayNav fires when a directional arrow is clicked in widget-controls
     * @param {string} direction The direction to get the consecutive day
     */
    handleDayNav(direction) {
        const { setDay, dayAPI, currentDay } = this.props;
        const sevenDaysInMs = 86400000 * 7;

        if (direction === ">") {
            setDay(
                dayAPI.getDayByDate(
                    new Date(currentDay.dayDate.getTime() + sevenDaysInMs)
                )
            );
        } else if (direction === "<") {
            setDay(
                dayAPI.getDayByDate(
                    new Date(currentDay.dayDate.getTime() - sevenDaysInMs)
                )
            );
        }
    }

    getWeekData(day) {
        const weekData = this.props.dayAPI.getWeekOf(day);
        return (
            <div className="widget" style={this.props.style}>
                <div className="widget-controls-container">
                    <WidgetControls
                        type={"week"}
                        currentDay={this.props.currentDay}
                        weekData={weekData}
                        handleDayNav={this.handleDayNav}
                        onClickControlItem={this.onClickControlItem}
                    />
                </div>
                <div className="widget-body week">
                    {weekData.map(data => {
                        return (
                            <DoneChart
                                day={data}
                                type="vertical"
                                goToDay={this.props.goToDay}
                                key={Math.random().toPrecision(3)}
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
