import React, { CSSProperties } from "react";
import { useRouter } from "next/router";

import { IProject } from "@context/index";


const ProjectSlot: React.FC<IProject> = ({ name, href, colors }) => {

    const router = useRouter();

    return (
        <div className="project" style={{ "--primaryColour": colors.primaryColour, "--secondaryColour": colors.secondaryColour, "--accentColour": colors.accentColour } as CSSProperties}>
            <div className="project-title" onClick={() => router.push(`/${href}`)}>
                {name}
            </div>
        </div>
    );
};

export default React.memo(ProjectSlot);