import React from "react";
import { Button } from "semantic-ui-react";

interface IInputFieldProperties {
    className?: string;
    text: string;
    onClick: () => void;
    icon?: string;
    disabled?: boolean;
    positive?: boolean;
    negative?: boolean;
}
 
const InputField: React.FC<IInputFieldProperties> = ({ className, text, onClick, disabled, icon, positive, negative }) => {

    return (
        <Button
            className={`custom-button ${className ?? ""}`}
            content={text}
            onClick={onClick}
            icon={icon}
            disabled={disabled}
            positive={positive}
            negative={negative}
        />
    );
};
export default React.memo(InputField);
