import React from "react";
import NavItem from "src/components/atoms/NavItem/NavItem";

const NavBar: React.FC = () => {

    return (
        <div className="navbar">
            <div className="navbar-icon">
                <img src="assets/images/banner.png"/>
            </div>
            <div className="navbar-items">
                <NavItem
                    title="home"
                    link="/"
                />
                <NavItem
                    title="contact"
                    link="/contact"
                />
            </div>
        </div>
    );
};
export default React.memo(NavBar);
