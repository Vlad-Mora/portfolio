import React from "react";

import DisplayItem from "@atoms/DisplayItem";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const VendingMachineDisplay: React.FC = () => {

    const { items } = React.useContext(ContextContainer) as ContextProps;

    return (
        <div className="vending-machine-display">
            {items.map((item) => (
                <DisplayItem itemCode={item.code} price={item.price}/>
            ))}
        </div>
    );
};

export default React.memo(VendingMachineDisplay);
