import React, { Component } from "react";
import Link from "./Link";

//Stylesheet
import "../styles/Header.css";

export class Header extends Component {
    render() {
        return (
            <header>
                <Link className="brand" href="#">
                    DailyGoals
                </Link>
                <Nav
                    items={["DAY", "WEEK", "MONTH"]}
                    onClickFunc={this.props.onClickFunc}
                    current={this.props.currentDisplay}
                />
            </header>
        );
    }
}

const Nav = props => {
    let items = props.items.map(item => {
        return (
            <NavItem
                key={item}
                className={
                    props.current === item.toLowerCase() ? "current" : ""
                }
            >
                <Link onClickFunc={props.onClickFunc.bind(this, item)}>
                    {item}
                </Link>
            </NavItem>
        );
    });

    return (
        <nav>
            <ul>{items}</ul>
        </nav>
    );
};

const NavItem = props => {
    return <li className={"nav-item " + props.className}>{props.children}</li>;
};

export default Header;
