import React from "react";

import ProjectSlot from "@atoms/ProjectSlot";

import { ContextContainer, ContextProps } from "@context/index";

const ProjectContent: React.FC = () => {
    
    const { projects } = React.useContext(ContextContainer) as ContextProps;

    return (
        <div className="project-content">
            <div className="content-header">Projects Built</div>
            <div className="project-slots">
                {projects.map((project) => (
                    <ProjectSlot
                        name={project.name}
                        href={project.href}
                        colors={project.colors}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(ProjectContent);