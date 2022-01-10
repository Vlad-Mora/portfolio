import React from "react";

interface INavItemProperties {
  title: string;
  link: string;
  image: string;
}

const NavItem: React.FC<INavItemProperties> = ({ title, link, image }) => {

    return (
        <div className="project-slot" style={{ backgroundImage: `url(${image})` }}>
            <a className="project-link" href={link}>
                {title}
            </a>
        </div>
    );
};
export default React.memo(NavItem);
