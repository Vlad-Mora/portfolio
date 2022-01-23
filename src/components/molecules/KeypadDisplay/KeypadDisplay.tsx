import React from "react";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const KeypadDisplay: React.FC = () => {

    const { insertAmount, setInsertAmount, currentBalance } = React.useContext(ContextContainer) as ContextProps;

    React.useEffect(() => {
        if (insertAmount.length > 0) {
            if ((insertAmount[0] === "0" && insertAmount[1] !== ".") && insertAmount.length > 1) {
                setInsertAmount(insertAmount.substring(1))
            }
            if (insertAmount[0] === ".") {
                setInsertAmount("0.")
            }
        } else {
            setInsertAmount("0")
        }
    }, [insertAmount])

    return (
        <div className="keypad-display">
            Insert: £{insertAmount}
            <br/>
            Balance: £{currentBalance.toString()}
        </div>
    );
};
export default React.memo(KeypadDisplay);
