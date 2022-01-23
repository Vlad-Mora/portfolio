import React from "react";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

export interface IDisplayItemProperties {
    itemCode: string;
    price: number;
}
 
const InputField: React.FC<IDisplayItemProperties> = ({ itemCode, price }) => {

    const { currentBalance, selectedItems, totalCost, setTotalCost, setSelectedItems } = React.useContext(ContextContainer) as ContextProps;
    const [selected, setSelected] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (selectedItems.length === 0) {
            setSelected(false)
        }
    }, [selectedItems]);

    return (
        <div 
            className={`noselect item-wrapper ${(currentBalance - totalCost) >= price ? "" : "unaffordable"} ${selected ? "selected" : ""}`} 
            onClick={() => {
                if (selected) {
                    setSelected(false)
                    setSelectedItems(selectedItems.filter((selectedItemCode) => selectedItemCode !== itemCode))
                    setTotalCost(totalCost - price)
                } else {
                    if ((currentBalance - totalCost) >= price) {
                        setSelected(true)
                        setSelectedItems([...selectedItems, itemCode])
                        setTotalCost(totalCost + price)
                    }
                }
            }}
        >
            {itemCode}
        </div>
    );
};
export default React.memo(InputField);
