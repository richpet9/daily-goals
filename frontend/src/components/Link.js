import React, { Component } from "react";

//Stylesheet
import "../styles/Link.css";

export class Link extends Component {
    constructor(props) {
        super(props);

        //Set States
        this.state = {
            //Styles
            styles: {
                //The style for the color of the brand
                brand: {
                    color: "#3a3a3a"
                }
            },
            //lastColor is the last color the hover went to, this avoids repeats :)
            lastColor: "#3a3a3a"
        };

        //Bind functions
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    /**
     * handleMouseEnter() will change the color of the brand image
     * according to a predefined set of colors, stored in colors[].
     */
    handleMouseEnter() {
        const colors = [
            "#ec4040", //Red
            "#6fe482", //Green
            "#ec7940", //orange
            "#40b1ec", //Light Blue
            "#4060ec" //Dark Blue/Purple
        ];

        //Generate a random number out of the possible colors
        const randomNumber = Math.floor(Math.random() * colors.length);

        //If the last color is this color, do it again
        if (this.state.lastColor === colors[randomNumber]) {
            this.handleMouseEnter();
        } else {
            //Set the color style to the value of colors at that index
            this.setState({
                styles: { brand: { color: colors[randomNumber] } },
                lastColor: colors[randomNumber]
            });
        }
    }
    /**
     * handleMouseLeave() will change the color of the brand image
     * to the default value: #3a3a3a
     */
    handleMouseLeave() {
        this.setState({ styles: { brand: { color: "#3a3a3a" } } });
    }

    render() {
        return (
            <a
                className={this.props.className}
                href={this.props.href}
                style={this.state.styles.brand}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.props.onClickFunc}
            >
                {this.props.children}
            </a>
        );
    }
}

export default Link;
