import React from "react";
import { Input } from "semantic-ui-react";
import { inputToArray } from "@helpers/inputToArray";

interface IInputFieldProperties {
    className?: string;
    isInputNumber: boolean;
    isInputArray: boolean;
    placeHolder: string;
    setInput: Function;
    focus?: boolean;
    disabled?: boolean;
    error?: boolean;
    icon?: string;
}
 
const InputField: React.FC<IInputFieldProperties> = ({ className, placeHolder, setInput, isInputArray, focus, disabled, error, icon, isInputNumber }) => {

    return (
        <Input
            className={`custom-input-field ${className ?? ""}`}
            placeholder={placeHolder}
            onChange={(_, data) => {
                isInputArray ?
                    (isInputNumber
                    ? setInput(inputToArray(data.value, true))
                    : setInput(inputToArray(data.value, false))
                    )
                : (isInputNumber
                    ? setInput(parseInt(data.value))
                    : setInput(data.value));
            }}
            focus={focus}
            disabled={disabled}
            error={error}
            icon={icon}
        />
    );
};
export default React.memo(InputField);
