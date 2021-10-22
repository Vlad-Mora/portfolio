import React from "react";

interface IPageLayouProperties {
    title: string;
    description: string;
    input: React.ReactElement;
    output: any;
    button: React.ReactElement;
}

const PageLayout: React.FC<IPageLayouProperties> = ({ title, description, input, output, button }) => {

    return (
        <div className="project-wrapper">
            <h1 className="project-title">{title}</h1>
            <div className="project-description">{description}</div>
            <div className="project-content">
                <div className="project-input">
                    {input}
                </div>
                <div className="project-output">
                    Output: {output}
                </div>
                {button}
            </div>
        </div>
    );
}

export default React.memo(PageLayout);