import React, { Component } from "react";

//Stylesheet
import "../../styles/DropDown.css";
import Calendar from "./Calendar";

class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: this.props.expanded
        };

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    //toggleExpanded() will toggle the value of this.state.expanded
    toggleExpanded() {
        this.setState({ expanded: !this.state.expanded });
    }

    //Handle what happens when we click
    handleClick = e => {
        if (!this.node.contains(e.target)) {
            //The click was outside, so toggle expanded to false
            this.setState({ expanded: false });
        }
    };

    componentWillMount() {
        //Add an event listiner for when a click occurs, track when this comp is mounted
        document.addEventListener("mousedown", this.handleClick, false);
    }

    componentWillUnmount() {
        //Remove the event listener on unmount
        document.removeEventListener("mousedown", this.handleClick, false);
    }

    render() {
        //Shortcut a dayDate variable for later use
        const { day } = this.props;

        //The list of options in the drop down
        const options = this.props.options.map(item => {
            const classes =
                item === this.props.currentSet
                    ? "widget-item current"
                    : "widget-item";
            return (
                <li
                    className={classes}
                    onClick={this.props.function.bind(this, item)}
                    key={item}
                >
                    {item}
                </li>
            );
        });

        return (
            <div
                className="drop-down-container"
                onClick={this.toggleExpanded}
                ref={node => (this.node = node)}
            >
                <span className="widget-date">{day.getDateFormatted("/")}</span>
                <span
                    className={
                        this.state.expanded
                            ? "widget-carot expanded"
                            : "widget-carot"
                    }
                />

                {this.state.expanded ? (
                    <ul className="widget-options expanded">
                        {options}
                        <Calendar
                            monthData={this.props.monthData}
                            goToDay={this.props.setDay}
                            inNav={true}
                        />
                    </ul>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default DropDown;
