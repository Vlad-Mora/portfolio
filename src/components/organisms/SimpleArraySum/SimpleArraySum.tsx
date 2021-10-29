import React from 'react';
import Button from '@atoms/Button/Button';
import InputField from '@atoms/InputField';
import ProjectLayout from '@templates/ProjectLayout/ProjectLayout';
import { inputToArray } from '@helpers/inputToArray';


const SimpleArraySum: React.FC = () => {

    const [output, setOutput] = React.useState<number>();
    const [array, setArray] = React.useState<string>("");

    function handleClick() {
        let total = 0;
        inputToArray(array, true).forEach(number => {
            total += parseInt(number);
        });
        setOutput(total);
    };

    return (
        <ProjectLayout
            title="SimpleArraySum"
            descriptionLink="simple-array-sum"
            input={
                [
                    <InputField
                        placeHolder="E.g 1, 2, 3, 4"
                        setInput={setArray}
                        isInputNumber={false}
                    />
                ]
            }
            output={output}
            button={
                <>
                    <Button
                        text="Add"
                        onClick={() => {
                            (array !== undefined) &&
                            handleClick();
                        }}
                    />
                </>
            }
        />
    );
};

export default SimpleArraySum;
