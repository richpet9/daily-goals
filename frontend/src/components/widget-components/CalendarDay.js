import React, { Component } from "react";

import "../../styles/CalendarDay.css";

class CalendarDay extends Component {
    render() {
        const { day, onClick, inNav } = this.props;
        let classes = inNav
            ? this.props.classes + " in-nav"
            : this.props.classes;

        const doneRatio = Math.floor(day.getDoneRatio() * 100);

        return (
            <div className={classes} onClick={onClick.bind(this, day)}>
                <span className="calendar-date">
                    {day.dayDate.getUTCDate()}
                </span>
                {!inNav && (
                    <div>
                        <div className="calendar-perc">{doneRatio + "%"}</div>
                        <div className="goal-container">
                            {day.dayGoals.map(goal => {
                                const classes = goal => {
                                    if (goal.goalDone) {
                                        return "mini-goal done";
                                    } else {
                                        return "mini-goal undone";
                                    }
                                };
                                return (
                                    <div
                                        className={classes(goal)}
                                        key={goal.goalId}
                                    >
                                        {goal.goalText}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default CalendarDay;
