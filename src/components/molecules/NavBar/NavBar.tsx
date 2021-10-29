import React from "react";
import FooterItem from "@atoms/FooterItem/FooterItem";
import NavItem from "@atoms/NavItem/NavItem";

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
                    title="Projects"
                    link="/projects"
                />
                <NavItem
                    title="contact"
                    link="/contact"
                />
            </div>
            <div className="social-media">
                <FooterItem
                    title="Facebook"
                    icon="fab fa-facebook-square"
                    link="https://facebook.com/"
                />
                <FooterItem
                    title="Instagram"
                    icon="fab fa-instagram"
                    link="https://www.instagram.com"
                />
            </div>
        </div>
    );
};
export default React.memo(NavBar);
