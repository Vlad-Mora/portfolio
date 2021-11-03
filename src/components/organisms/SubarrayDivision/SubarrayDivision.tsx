import React from 'react';
import Button from '@atoms/Button/Button';
import InputField from '@atoms/InputField';
import ProjectLayout from '@templates/ProjectLayout/ProjectLayout';

const SubarrayDivision: React.FC = () => {

    const [output, setOutput] = React.useState<number>();
    const [s, setS] = React.useState<number[]>([]);
    const [d, setD] = React.useState<number>(0);
    const [m, setM] = React.useState<number>(0);

    function birthday(s: number[], d: number, m: number): any {
        let matchCount = 0;
        let index = 0;
        
        while (index <= (s.length - m)) {
            let sum = 0
            const subArray = s.slice(index, index + m)
            subArray.length > 1 
            ? subArray.forEach((int) => {
                sum += int;
            })
            : sum = subArray[0];
            
            if (sum === d) {
                matchCount++;
            }
            index++;
        }
        
        setOutput(matchCount);
    }
    
    return (
        <ProjectLayout
            title="SubarrayDivision"
            descriptionLink="the-birthday-bar"
            input={
                [
                    <InputField
                        placeHolder="Value for S"
                        setInput={setS}
                        isInputNumber={true}
                        isInputArray={true}
                    />,
                    <InputField
                        placeHolder="Value for D"
                        setInput={setD}
                        isInputNumber={true}
                        isInputArray={false}
                    />,
                    <InputField
                        placeHolder="Value for M"
                        setInput={setM}
                        isInputNumber={true}
                        isInputArray={false}
                    />
                ]
            }
            output={output}
            button={
                <>
                    <Button
                        text="Test"
                        onClick={() => {
                            birthday(s, d, m);
                        }}
                    />
                </>
            }
        />
    );
};

export default SubarrayDivision;