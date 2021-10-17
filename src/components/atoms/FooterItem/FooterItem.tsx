import React from "react";

interface INavItemProperties {
  title: string;
  icon: string;
  link: string;
}

const NavItem: React.FC<INavItemProperties> = ({ title, icon, link }) => {

    return (
        <div 
            className="footer-item" 
            onClick={() => {
                window.open(link);
            }}
        >
            <div className="link-wrapper">
                <i className={`link-icon ${icon}`}/>
            </div>
            <h2 className="link-title">
                {title}
            </h2>
        </div>
    );
};
export default React.memo(NavItem);
