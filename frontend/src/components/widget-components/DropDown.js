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
            return (
                <li
                    className="widget-item"
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
                ref={node => (this.node = node)}
            >
                <div className="drop-down-button" onClick={this.toggleExpanded}>
                    <span className="widget-date">
                        {day.getDateFormatted("/")}
                    </span>
                    <span
                        className={
                            this.state.expanded
                                ? "widget-carot expanded"
                                : "widget-carot"
                        }
                    />
                </div>

                {this.state.expanded ? (
                    <ul className="widget-options expanded">
                        {options}
                        <li className="widget-item calendar">
                            <Calendar
                                day={this.props.day}
                                today={this.props.today}
                                monthData={this.props.monthData}
                                goToDay={this.props.setDay}
                                inNav={true}
                                handleDayNav={this.props.handleDayNav}
                            />
                        </li>
                    </ul>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default DropDown;
