import React from "react";
import { Button } from "semantic-ui-react";

interface IInputFieldProperties {
    onClick?: () => void;
    className?: string;
    text?: React.ReactNode;
    icon?: string;
    href?: string;
    disabled?: boolean;
    positive?: boolean;
    negative?: boolean;
}
 
const InputField: React.FC<IInputFieldProperties> = ({ className, text, onClick, disabled, icon, positive, negative, href }) => {

    return (
        <Button
            href={href}
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
