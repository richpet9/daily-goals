import React, { Component } from "react";
import Goal from "./Goal";

//Stylesheet
import "../../styles/GoalField.css";

export class GoalField extends Component {
    constructor(props) {
        super(props);

        //Bind functions
    }

    render() {
        let goals = null; //The <Goal /> elements we will return

        if (this.props.day.dayGoals === null) {
            //there are not goals
            goals = "";
        } else {
            //there are goals
            const goalStrings = this.props.day.dayGoals;
            goals = goalStrings.map(goal => {
                return (
                    <Goal.Reg
                        text={goal.goalText} //The text in the goal block
                        key={goal.goalId} //The Key for React
                        done={goal.goalDone} //If goal is done, background should be green, else red
                        onClick={this.props.onClickGoal}
                        goalId={goal.goalId}
                    />
                );
            });
        }

        return (
            <div className="goal-field">
                {goals}
                <Goal.Button onClick={this.props.onClickAdd} />
            </div>
        );
    }
}

export default GoalField;
