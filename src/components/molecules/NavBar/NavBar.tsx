import React, { CSSProperties } from "react";
import { useRouter } from "next/router";

import FooterItem from "@atoms/FooterItem/FooterItem";
import NavItem from "@atoms/NavItem/NavItem";

const NavBar: React.FC = () => {

    const router = useRouter();
    
    return (
        <div className="navbar">
            <div className="navbar-icon noselect" onClick={() => router.push("/")}>
                <img src="assets/images/banner.png"/>
                <div className="header-name">Swift<span className="split-text">Crate</span></div>
            </div>
            <div className="navbar-items">
                <NavItem
                    title="home"
                    link="/"
                />
                <NavItem
                    title="projects"
                    link="/projects"
                />
                <NavItem
                    title="contact"
                    link="/contact"
                />
            </div>
            <div className="social-media" style={{ "--social-count": 2} as CSSProperties}>
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
