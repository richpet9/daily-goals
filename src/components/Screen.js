import React, { Component } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Footer from "./Footer";

//Stylesheet
import "../styles/Screen.css";

class Screen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWidget: "day"
        };

        //Bind functions
        this.handleNavClick = this.handleNavClick.bind(this);
    }

    handleNavClick(view) {
        //Set the currentWidget to what is clicked
        this.setState({ currentWidget: view.toLowerCase() });
    }

    render() {
        return (
            <div className="container">
                <Header onClickFunc={this.handleNavClick} />
                <Dashboard currentWidget={this.state.currentWidget} />
                <Footer />
            </div>
        );
    }
}

export default Screen;
