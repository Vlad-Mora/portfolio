import React from "react";

import ProjectSlot from "@atoms/ProjectSlot";

export interface IProject {
    name: string;
    href: string;
    colors: IProjectColor;
}

interface IProjectColor {
    primaryColour: string;
    secondaryColour: string;
    accentColour: string;
}

const ProjectContent: React.FC = () => {
    
    const projectsArray: IProject[] = [
        {
            name: "Coming Soon",
            href: "",
            colors: {
                primaryColour: "#2a2b2d",
                secondaryColour: "#2da8d8",
                accentColour: "#d9514e"
            }
        },
        {
            name: "Coming Soon",
            href: "",
            colors: {
                primaryColour: "#f2bc94",
                secondaryColour: "#30110d",
                accentColour: "#722620"
            }
        },
        {
            name: "Coming Soon",
            href: "",
            colors: {
                primaryColour: "#a2d5c6",
                secondaryColour: "#077b8a",
                accentColour: "#5c3c92"
            }
        }
    ];

    return (
        <div className="project-content">
            <div className="content-header">Projects Built</div>
            <div className="project-slots">
                {projectsArray.map((project) => (
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