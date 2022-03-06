import React from "react";
import { Tooltip } from "react-tippy";

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
                <Tooltip
                    title={title}
                >
                    <i className={`link-icon ${icon}`}/>
                </Tooltip>
            </div>
        </div>
    );
};
export default React.memo(NavItem);
