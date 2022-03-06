import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";
import { Tooltip } from "react-tippy";
import { useEasybase } from "easybase-react";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const CheckoutModal: React.FC = () => {

    const { user, userCart, setUserCart } = React.useContext(ContextContainer) as ContextProps;
    const [open, setOpen] = React.useState<boolean>(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [paymentState, setPaymentState] = React.useState<string>("");
    const [totalPrice, setTotalPrice] = React.useState<number | undefined>(0);
    
    const { db, e } = useEasybase();
    
    async function updateUserBalance(newBalance: number) {
        await db("USERS").where(
            e.and(
                e.eq("email", user?.email!),
                e.eq("password", user?.password!)
            )
        ).set({ balance: newBalance }).one()
    }

    React.useEffect(() => {
        if (open || userCart) {
            const total = userCart?.reduce((acc, item) => {
                return acc + item.price
            }, 0)
            setTotalPrice(total)
        }

        if (confirmationModalOpen) {
            setIsLoading(true)
            setPaymentState("")
            if (user?.balance! >= totalPrice!) {
                updateUserBalance(user?.balance! - totalPrice!)
                setPaymentState("Payment completed.")
            } else {
                setPaymentState("Insufficient funds.")
            }
            setIsLoading(false)
        }
    }, [open, confirmationModalOpen, userCart])

    return (
        <Modal
            basic
            className="checkout-modal"
            open={open}
            size="small"
            trigger={
                <Tooltip
                    className="checkout-tooltip"
                    title="Checkout"
                >
                    <Button
                        className="checkout-button"
                        icon="cart"
                        onClick={() => setOpen(true)}
                    />
                    {userCart && userCart?.length > 0 && 
                        <div className="item-count">{userCart.length}</div>
                    }
                </Tooltip>
            }
        >
            <Header icon>
                <Icon name="payment"/>
                {totalPrice ? "Checkout" : "Your cart is empty."}
            </Header>
            <Modal.Content
                scrolling
            >
                {totalPrice ?
                    <>
                        <div className="checkout-header">
                            <div className="total-items-count">
                                Total items: {userCart?.length}
                            </div>
                            <div className="total-price">
                                Total price: £{totalPrice}
                            </div>
                        </div>
                        {userCart && userCart.map((item) => (
                            <div className="cart-item">
                                <Button
                                    className="remove-item"
                                    icon="close"
                                    color="red"
                                    onClick={() => {
                                        const array: any = [] 
                                        userCart?.forEach((cartItem) => {
                                            if (cartItem.name !== item.name) {
                                                array.push(cartItem)
                                            }
                                        })
                                        setUserCart(array)
                                    }}
                                />
                                <div className="item-details">
                                    <span>Name: {item.name}</span>
                                    <span>Price: £{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </> : 
                    <>
                    <div className="empty-cart-message">
                        Return back to the main page to purchase something.
                    </div>
                    </>
                }
                
            </Modal.Content>
            <Modal.Actions>
                <Button
                    disabled={totalPrice === undefined}
                    content="Make payment"
                    color="black"
                    onClick={() => setConfirmationModalOpen(true)}
                />
                <Button
                    content="Continue Shopping"
                    color="green"
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>

            <Modal
                basic
                className="confirmation-modal"
                open={confirmationModalOpen}
                size="small"
            >
                <Header icon>
                    <Icon name={paymentState === "" ? "circle notched" : paymentState === "Payment completed." ? "checkmark" : "close"}/>
                    {paymentState}
                </Header>
                <Modal.Content
                    scrolling
                >
                    {paymentState === "" ? "Payment is being made..." : paymentState === "Payment completed." ? "Payment has been made and your balance has been updated." : "You do not have enough money. Please add funds then finalise your purchase."}
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        disabled={isLoading}
                        content="Close"
                        color="green"
                        onClick={() => {
                            setConfirmationModalOpen(false)
                            setOpen(false)
                            if (paymentState === "Payment completed.") {
                                setUserCart(undefined)
                            }
                        }}
                    />
                </Modal.Actions>
            </Modal>
        </Modal>
    )
}

export default React.memo(CheckoutModal)