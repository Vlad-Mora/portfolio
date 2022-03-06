import React from "react";
import { Button } from "semantic-ui-react";

import KeypadDisplay from "@molecules/KeypadDisplay";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const KeyPad: React.FC = () => {

    const { currentBalance, insertAmount, selectedItems, totalCost, setTotalCost, setSelectedItems, setCurrentBalance, setInsertAmount } = React.useContext(ContextContainer) as ContextProps;

    function getKeypadKeys() {
        const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"]
        const keyButtons: React.ReactElement[] = [];
        keys.forEach((key) => {
            keyButtons.push(
                <Button
                    className="key"
                    content={key}
                    onClick={() => {
                        if (insertAmount === "0.00") {
                            setInsertAmount("" + key)
                        } else {
                            setInsertAmount(insertAmount + key)
                        }
                    }}
                    disabled={insertAmount.includes(".") ? insertAmount.split(".")[1].length >= 2 : false}
                />
            )
        });

        return keyButtons;
    }

    return (
        <div className="vending-machine-keypad">
            <KeypadDisplay/>
            <div className="keypad-keys">
                {getKeypadKeys()}
                <Button
                    className="return-key"
                    icon="left arrow"
                    onClick={() => setInsertAmount(insertAmount.toString().slice(0, -1))}
                    disabled={insertAmount.length <= 0 || (insertAmount[0] === "0" && insertAmount[1] !== ".")}
                />
            </div>
            <Button
                content="confirm"
                className="keypad-confirm-button"
                icon="checkmark"
                onClick={() => {
                    setCurrentBalance(currentBalance + parseFloat(insertAmount))
                    setInsertAmount("0")
                }}
                disabled={parseFloat(insertAmount) <= 0}
            />
            <Button
                content="purchase"
                className="keypad-purchase-button"
                icon="shop"
                onClick={() => {
                    setCurrentBalance(currentBalance - totalCost)
                    setSelectedItems([])
                    setTotalCost(0)
                }}
                disabled={selectedItems.length === 0}
            />
        </div>
    );
};
export default React.memo(KeyPad);
