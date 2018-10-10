import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";

//Stylesheet
import "../styles/Screen.css";

class Screen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDisplay: "week"
        };

        //Bind functions
        this.handleNavClick = this.handleNavClick.bind(this);
    }

    handleNavClick(view) {
        //Set the currentDisplay to what is clicked
        this.setState({ currentDisplay: view.toLowerCase() });
    }

    render() {
        return (
            <div className="container">
                <Header onClickFunc={this.handleNavClick} />
                <Dashboard currentDisplay={this.state.currentDisplay} />
            </div>
        );
    }
}

export default Screen;
