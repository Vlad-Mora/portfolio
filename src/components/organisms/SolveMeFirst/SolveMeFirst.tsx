import React from 'react';
import Button from 'src/components/atoms/Button/Button';
import InputField from 'src/components/atoms/InputField';
import ProjectLayout from 'src/components/templates/ProjectLayout/ProjectLayout';

interface ISolveMeFirstProperties {}

const SolveMeFirst: React.FC<ISolveMeFirstProperties> = ({  }) => {

    const [output, setOutput] = React.useState<number | string>();

    const [firstNumber, setFirstNumber] = React.useState<number>();
    const [secondNumber, setSecondNumber] = React.useState<number>();

    const [isDisabled, setIsDisabled] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (firstNumber !== undefined && firstNumber > 0) {
            if (secondNumber !== undefined && secondNumber > 0) {
                setIsDisabled(false);
            } else {
                setIsDisabled(true);
            }
        }
    }, [firstNumber, secondNumber])

    return (
        <ProjectLayout
            title="SolveMeFirst"
            description="
                Input two numbers, A and B, then add them together.

                Example:
                Input: A: 2  B: 3
                Output: 5
            "
            input={
                <>
                    <InputField
                        placeHolder="Value for A"
                        setInput={setFirstNumber}
                        isInputNumber={true}
                    />
                    <InputField
                        placeHolder="Value for B"
                        setInput={setSecondNumber}
                        isInputNumber={true}
                    />
                </>
            }
            output={output}
            button={
                <>
                    <Button
                        text="Add"
                        onClick={() => {
                            (firstNumber !== undefined && secondNumber !== undefined) &&
                            setOutput(firstNumber + secondNumber)
                        }}
                        disabled={isDisabled}
                    />
                </>
            }
        />
    );
};

export default SolveMeFirst;
