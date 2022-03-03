import React, { CSSProperties } from "react";

import { ProjectProps } from "@pages/projects";

const NavItem: React.FC<ProjectProps> = ({ title, link, image, color, state, backgroundColour }) => {

    return (
        <div className={`project-slot item-label`} style={{ backgroundImage: `url(${image})`, "--content": `"${state}"`, "--background": `${backgroundColour}`} as CSSProperties}>
            <a className="project-link" href={link} style={{ color: color}}>
                {title}
            </a>
        </div>
    );
};
export default React.memo(NavItem);
