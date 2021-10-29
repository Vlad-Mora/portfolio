import React from 'react';
import Button from '@atoms/Button/Button';
import InputField from '@atoms/InputField';
import ProjectLayout from '@templates/ProjectLayout/ProjectLayout';

const SolveMeFirst: React.FC = () => {

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
            descriptionLink="solve-me-first"
            input={
                [
                    <InputField
                        placeHolder="Value for A"
                        setInput={setFirstNumber}
                        isInputNumber={true}
                        isInputArray={false}
                    />,
                    <InputField
                        placeHolder="Value for B"
                        setInput={setSecondNumber}
                        isInputNumber={true}
                        isInputArray={false}
                    />
                ]
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
