import React, { Component } from "react";

//Stylesheet
import "../../styles/Goal.css";

export class Goal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };

        //Bind functions
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleGoalClick = this.handleGoalClick.bind(this);
        this.handleBodyClick = this.handleBodyClick.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            const newText = document.getElementById(
                this.props.goalId + "-input"
            ).value;
            this.props.handleSetGoal(this.props.goalId, newText);
            this.setState({ editing: false });
        }
    }

    handleGoalClick(goalId) {
        //Check if we clicked on an input, or if we are curently editing
        if (this.state.editing) {
            //If so, clicking should stop editing
            const newText = document.getElementById(
                this.props.goalId + "-input"
            ).value;
            this.props.handleSetGoal(this.props.goalId, newText);
            this.setState({ editing: false });
        } else {
            //If not editing, toggle the button
            this.props.onClick(goalId);
        }
    }

    handleBodyClick() {
        //If already editing, do nothing
        if (this.state.editing) {
            return;
        } else {
            this.setState({ editing: true });
        }
    }

    reg = props => {
        const classes = props.done ? "goal done" : "goal";
        return (
            <div className={classes}>
                <a
                    className="bg-link"
                    href={() => {
                        return null;
                    }}
                    onClick={this.handleGoalClick.bind(this, props.goalId)}
                >
                    {" "}
                </a>
                <div
                    className={
                        this.state.editing ? "goal-body editing" : "goal-body"
                    }
                    onClick={this.handleBodyClick}
                >
                    {this.state.editing && ( //If editing, show the text input
                        <input
                            type="text"
                            className="goal-input"
                            id={props.goalId + "-input"}
                            defaultValue={props.text}
                            onKeyPress={this.handleKeyPress}
                            autoFocus
                        />
                    )}

                    {!this.state.editing && props.text}
                </div>
            </div>
        );
    };

    button = props => {
        return (
            <div className="goal button">
                <div
                    className="goal-plus"
                    onClick={props.onClickAdd.bind(this, "New Goal", false)}
                >
                    +
                </div>
            </div>
        );
    };

    render() {
        if (this.props.button) {
            return this.button(this.props);
        } else {
            return this.reg(this.props);
        }
    }
}

export default Goal;
