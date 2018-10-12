import React, { Component } from "react";

export class Debug extends Component {
    style = {
        container: {
            position: "fixed",
            top: "60px",
            left: "100px",
            background: "#3a3a3a",
            padding: "16px",
            color: "white"
        },
        button: {
            padding: "3px",
            margin: "8px 0"
        }
    };

    render() {
        return (
            <div className="debug-controls" style={this.style.container}>
                <p>Debug Panel</p>
                <input
                    type="button"
                    value="log DayAPI.response"
                    onClick={this.props.logAPI.bind(this)}
                    style={this.style.button}
                />
                <br />
                <input
                    type="button"
                    value="log this.state.currentDay"
                    onClick={this.props.logCurrentDay.bind(this)}
                    style={this.style.button}
                />
            </div>
        );
    }
}

export default Debug;
