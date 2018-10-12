import React from "react";

//Stylesheet
import "../../styles/Goal.css";

export const Goal = {
    Reg: props => {
        const classes = props.done ? "goal done" : "goal";
        return (
            <div
                className={classes}
                onClick={props.onClick.bind(this, props.goalId)}
            >
                <div className="goal-body">{props.text}</div>
            </div>
        );
    },

    Button: props => {
        return (
            <div className="goal button">
                <div
                    className="goal-plus"
                    onClick={props.onClick.bind(this, "Hi!", false)}
                >
                    +
                </div>
            </div>
        );
    }
};

export default Goal;
