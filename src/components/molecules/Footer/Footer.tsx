import React from "react";
import FooterItem from "src/components/atoms/FooterItem/FooterItem";

const Footer: React.FC = () => {

    return (
        <div className="footer">
            <div className="footer-items">
                <FooterItem
                    title="facebook"
                    icon="fab fa-facebook-square"
                    link="https://facebook.com/"
                />
                <FooterItem
                    title="instagram"
                    icon="fab fa-instagram"
                    link="https://www.instagram.com"
                />
            </div>
        </div>
    );
};
export default React.memo(Footer);
