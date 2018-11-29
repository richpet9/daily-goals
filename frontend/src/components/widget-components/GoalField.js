import React, { Component } from "react";
import Goal from "./Goal";

//Stylesheet
import "../../styles/GoalField.css";

export class GoalField extends Component {
    render() {
        let goals = null; //The <Goal /> elements we will return

        if (this.props.goals === null) {
            //there are not goals
            goals = "";
        } else {
            //there are goals
            const goalInfo = this.props.goals;
            goals = goalInfo.map(goal => {
                return (
                    <Goal
                        text={goal.goalText} //The text in the goal block
                        key={goal.goalId} //The Key for React
                        done={goal.goalDone}
                        goalId={goal.goalId}
                        onClick={this.props.onClickGoal}
                        handleSetGoal={this.props.handleSetGoal}
                    />
                );
            });
        }

        return (
            <div className="goal-field">
                {goals}
                <Goal onClickAdd={this.props.onClickAdd} button={true} />
            </div>
        );
    }
}

export default GoalField;
