import React from "react";
import { Input } from "semantic-ui-react";

interface IInputFieldProperties {
    className?: string;
    isInputNumber: boolean;
    placeHolder: string;
    setInput: Function;
    focus?: boolean;
    disabled?: boolean;
    error?: boolean;
    icon?: string;
}
 
const InputField: React.FC<IInputFieldProperties> = ({ className, placeHolder, setInput, focus, disabled, error, icon, isInputNumber }) => {

    return (
        <Input
            className={`custom-input-field ${className ?? ""}`}
            placeholder={placeHolder}
            onChange={(_, data) => {
                isInputNumber
                ? setInput(parseInt(data.value))
                : setInput(data.value);
            }}
            focus={focus}
            disabled={disabled}
            error={error}
            icon={icon}
        />
    );
};
export default React.memo(InputField);
