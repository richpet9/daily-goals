import React from "react";
import Link from "./Link";

//Stylesheet
import "../styles/Footer.css";

export const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-copy">
                Built by{" "}
                <Link href="https://www.richardpetrosino.com">Richie</Link>
            </div>
        </div>
    );
};

export default Footer;
