import React from "react";
import { Button } from "semantic-ui-react";

import { ContextContainer, ContextProps } from "@context/VendingMachine";

interface ItemContainerProps {
    image: string;
    price: number;
}

const ItemContainer: React.FC<ItemContainerProps> = ({ image, price }) => {

    const { balance, setBalance, setFeedbackMessage} = React.useContext(ContextContainer) as ContextProps;

    function performPurchase() {
        if (balance >= price) {
            setFeedbackMessage("Purchased")
            setTimeout(function () {
                setBalance(balance - price)
            }, 1000);
        } else {
            setFeedbackMessage("Not enough money..")
            setTimeout(function () {
                setFeedbackMessage("Insert coins")
            }, 1000);
        }
    };

    return (
        <div
            className="display-item"
        >
            <img 
                src={image}
                className="item-banner"
            />
            <Button
                className="select-button"
                onClick={performPurchase}
            />
        </div>
    );
};

export default React.memo(ItemContainer);