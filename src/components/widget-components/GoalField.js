import React, { Component } from "react";
import Goal from "./Goal";

//Stylesheet
import "../../styles/GoalField.css";

export class GoalField extends Component {
    render() {
        let goals = null; //The <Goal /> elements we will return

        const goalStrings = this.props.day.dayGoals;
        goals = goalStrings.map(goal => {
            return (
                <Goal
                    text={goal.goalText} //The text in the goal block
                    key={goal.goalText} //The Key for React
                    done={goal.goalDone} //If goal is done, background should be green, else red
                    onClick={this.props.onClickGoal}
                    goalId={goal.goalId}
                />
            );
        });

        return <div className="goal-field">{goals}</div>;
    }
}

export default GoalField;
