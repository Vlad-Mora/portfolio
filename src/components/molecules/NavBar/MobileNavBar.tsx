import React, { CSSProperties } from "react";
import FooterItem from "@atoms/FooterItem/FooterItem";
import NavItem from "@atoms/NavItem/NavItem";
import Button from "@atoms/Button/Button";

const MobileNavBar: React.FC = () => {

    const [isActive, setIsActive] = React.useState(false);

    return (
        <>
            <div className="mobile-navbar">
                <div className="navbar-icon">
                    <img src="assets/images/banner.png"/>
                    <div className="header-name">Swift<span className="split-text">Crate</span></div>
                </div>
                <div className={`page-opacity ${isActive ? "open" : ""}`} onClick={() => setIsActive(!isActive)}/>
                <div className={`navbar-slide ${isActive ? "open" : ""}`}>
                    <Button
                        icon="angle left"
                        className="slide-button"
                        onClick={() => {
                            setIsActive(!isActive)
                        }}
                    />
                    <div className="slide-content">
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
                </div>
            </div>
        </>
    );
};
export default React.memo(MobileNavBar);
