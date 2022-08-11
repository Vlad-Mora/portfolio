import React from "react";
import { Button } from "semantic-ui-react";

import { ContextContainer, ContextProps } from "@context/VendingMachine";

const ItemContainer: React.FC = () => {

    const { feedbackMessage, setFeedbackMessage, balance, setBalance } = React.useContext(ContextContainer) as ContextProps;

    React.useEffect(() => {
        if (balance == 0) {
            setFeedbackMessage("Balance: £0")
            setTimeout(function () {
                setFeedbackMessage("Insert coins")
            }, 1000);
        } else (
            setFeedbackMessage(`Balance: £${balance}`)
        )
    }, [balance]);

    return (
        <div className="machine-display">
            <div className="display">{feedbackMessage}</div>
            <div className="coin-gap"/>
            <Button
                className="coin-insert-btn"
                onClick={() => {
                    // So users can't spam more than £30 since it's pointless for this project
                    if (balance < 30) {
                        setBalance(balance + 1)
                    }
                }}
            >
                Insert £1
            </Button>
        </div>
    );
};

export default React.memo(ItemContainer);