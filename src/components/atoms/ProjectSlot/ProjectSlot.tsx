import React from "react";

interface INavItemProperties {
  title: string;
  link: string;
  image: string;
  color: string;
}

const NavItem: React.FC<INavItemProperties> = ({ title, link, image, color }) => {

    return (
        <div className="project-slot" style={{ backgroundImage: `url(${image})` }}>
            <a className="project-link" href={link} style={{ color: color}}>
                {title}
            </a>
        </div>
    );
};
export default React.memo(NavItem);
