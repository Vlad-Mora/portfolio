import React from 'react';
import Button from 'src/components/atoms/Button/Button';
import InputField from 'src/components/atoms/InputField';
import ProjectLayout from 'src/components/templates/ProjectLayout/ProjectLayout';

interface ISimpleArraySumProperties {}

const SimpleArraySum: React.FC<ISimpleArraySumProperties> = ({  }) => {

    const [output, setOutput] = React.useState<number>();
    const [array, setArray] = React.useState<string>();

    function handleClick() {
        let total = 0;
        array?.replace(" ", "").split(",").forEach(number => {
            total += parseInt(number);
        });
        setOutput(total);
    };

    return (
        <ProjectLayout
            title="SimpleArraySum"
            description="
                Input an list of numbers, then return the sum of them.
            "
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
