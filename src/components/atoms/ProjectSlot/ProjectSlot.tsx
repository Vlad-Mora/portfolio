import React, { CSSProperties } from "react";

import { ProjectProps } from "@pages/projects";

const NavItem: React.FC<ProjectProps> = ({ title, link, image, color, state }) => {

    return (
        <div className={`project-slot ${state}`} style={{ backgroundImage: `url(${image})`, "--state": `"${state}"`} as CSSProperties}>
            <a className="project-link" href={link} style={{ color: color}}>
                {title}
            </a>
        </div>
    );
};
export default React.memo(NavItem);
