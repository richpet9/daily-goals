import React, { Component } from "react";

/**
 * WidgetControls class creates a widget control + title menu
 */
class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: this.props.expanded,
            widgetTitle: this.props.title
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
        const options = this.props.options.map(item => {
            const classes =
                item === this.props.title
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
                <span className="widget-date">
                    {this.props.day.dayMonth +
                        "/" +
                        this.props.day.dayNum +
                        "/" +
                        this.props.day.dayYear}
                </span>
                <span
                    className={
                        this.state.expanded
                            ? "widget-carot expanded"
                            : "widget-carot"
                    }
                />

                {this.state.expanded ? (
                    <div className="widget-options expanded">{options}</div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default DropDown;
