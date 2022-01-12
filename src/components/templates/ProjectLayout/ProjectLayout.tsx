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
        <div className="problem-solving-wrapper">
            <a className="problem-solving-title" target="_blank" href={`https://www.hackerrank.com/challenges/${descriptionLink}/problem`}>{title}</a>
            <div className="problem-solving-content">
                <div className="problem-solving-input" style={{ "--inputCount": input.length } as CSSProperties}>
                    {input}
                </div>
                {button}
                <div className="problem-solving-output">
                    Output: {output}
                </div>
            </div>
        </div>
    );
}

export default React.memo(PageLayout);