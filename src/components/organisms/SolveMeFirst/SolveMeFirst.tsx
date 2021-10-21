import React from 'react';
import { Input, Button } from "semantic-ui-react";

interface ISolveMeFirstProperties {}

const SolveMeFirst: React.FC<ISolveMeFirstProperties> = ({  }) => {

    const [total, setTotal] = React.useState<number | string>();

    const [firstNumber, setFirstNumber] = React.useState<number>(0);
    const [secondNumber, setSecondNumber] = React.useState<number>(0);

    return (
        <>
            <h1>SolveMeFirst</h1>
            <p>Input two numbers, A and B, then press "Calculate" to add them together.</p>
            <div className="output">
                Output: {total}
            </div>
            <div className="inputs">
                <Input
                    className="custom-input-field"
                    placeholder="Value for A"
                    onChange={(_, data) => {
                        setFirstNumber(parseInt(data.value));
                    }}
                />
                <Input
                    className="custom-input-field"
                    placeholder="Value for B"
                    onChange={(_, data) => {
                        setSecondNumber(parseInt(data.value));
                    }}
                />
            </div>
            <Button
                className="custom-button"
                onClick={() => {
                    setTotal(firstNumber + secondNumber)
                }}
            >
                Add
            </Button>
        </>
    );
};

export default SolveMeFirst;
