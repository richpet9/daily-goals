import React from "react";

//Stylesheet
import "../../styles/Goal.css";

export const Goal = props => {
    const classes = props.done ? "goal done" : "goal";
    return (
        <div
            className={classes}
            onClick={props.onClick.bind(this, props.goalId)}
        >
            <div className="goal-body">{props.text}</div>
        </div>
    );
};

export default Goal;
