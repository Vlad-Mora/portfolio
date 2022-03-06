import React from "react";

import DisplayItem from "@atoms/DisplayItem";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const VendingMachineDisplay: React.FC = () => {

    const { items } = React.useContext(ContextContainer) as ContextProps;

    function displayItems() {
        const array: React.ReactElement[] = [];
        items.forEach((item) => {
            array.push(<DisplayItem itemCode={item.code} price={item.price}/>)
        })
        return array;
    }

    return (
        <div className="vending-machine-display">
            {displayItems()}
        </div>
    );
};

export default React.memo(VendingMachineDisplay);
