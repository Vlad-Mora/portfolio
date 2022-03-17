import React, { CSSProperties } from "react";

export interface ItemSlotProps {
    children?: React.ReactNode;
    className?: string;
    colour?: string;
    image?: string;
    label?: string;
    labelColour?: string;
    onClick?: () => void;
}

const ItemSlot: React.FC<ItemSlotProps> = ({ onClick, className, children, image, colour, label, labelColour }) => {

    return (
        <div 
            className={`item-slot label ${className ?? ""}`}
            style={{
                color: `${colour ?? ""}`,
                "--label": `"${label ?? ""}"`,
                "--labelColour": `${labelColour ?? ""}`
                } as CSSProperties}
            onClick={onClick}
        >
            <img className="item-image" src={image ?? ""}/>
            {children}
        </div>
    );
};
export default React.memo(ItemSlot);
