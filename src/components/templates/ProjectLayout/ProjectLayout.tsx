import React, { CSSProperties } from "react";

interface IPageLayouProperties {
    title: string;
    descriptionLink: string;
    input: React.ReactElement[];
    output: any;
    button: React.ReactElement;
}

const PageLayout: React.FC<IPageLayouProperties> = ({ title, descriptionLink, input, output, button }) => {

    return (
        <div className="project-wrapper">
            <div>
            <a className="project-title" target="_blank" href={`https://www.hackerrank.com/challenges/${descriptionLink}/problem`}>{title}</a>
            </div>
            <div className="project-content">
                <div className="project-input" style={{ "--inputCount": input.length } as CSSProperties}>
                    {input}
                </div>
                {button}
                <div className="project-output">
                    Output: {output}
                </div>
            </div>
        </div>
    );
}

export default React.memo(PageLayout);