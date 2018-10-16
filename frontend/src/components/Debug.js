import React, { Component } from "react";

export class Debug extends Component {
    state = {
        hidden: true
    };

    style = {
        container: {
            position: "fixed",
            top: "60px",
            left: "100px",
            background: "#606060",
            padding: "8px",
            color: "white",
            zIndex: "10"
        },
        containerHidden: {
            position: "fixed",
            height: "50px",
            bottom: "0",
            left: "100px",
            background: "#606060",
            padding: "8px",
            color: "white",
            zIndex: "10"
        },
        button: {
            display: "block",
            padding: "3px",
            margin: "8px 0"
        }
    };

    handleHidePanel() {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        return (
            <div
                className="debug-controls"
                style={
                    !this.state.hidden
                        ? this.style.container
                        : this.style.containerHidden
                }
            >
                {!this.state.hidden && <p>Debug Panel</p>}
                {!this.state.hidden && (
                    <input
                        type="button"
                        value="log DayAPI.response"
                        onClick={this.props.logAPI.bind(this)}
                        style={this.style.button}
                    />
                )}
                {!this.state.hidden && (
                    <input
                        type="button"
                        value="log this.state.currentDay"
                        onClick={this.props.logCurrentDay.bind(this)}
                        style={this.style.button}
                    />
                )}
                <input
                    type="button"
                    value={
                        (!this.state.hidden && "hide debug panel") ||
                        "show panel"
                    }
                    onClick={this.handleHidePanel.bind(this)}
                    style={this.style.button}
                />
            </div>
        );
    }
}

export default Debug;
