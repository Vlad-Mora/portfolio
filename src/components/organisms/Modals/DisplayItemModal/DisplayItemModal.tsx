import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

import { TripItemProps } from "@interfaces/index";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

interface DisplayItemModalProps {
    item: TripItemProps;
}

const DisplayItemModal: React.FC<DisplayItemModalProps> = ({ item }) => {

    const { userCart, setUserCart } = React.useContext(ContextContainer) as ContextProps;
    const [open, setOpen] = React.useState<boolean>(false);
    const [purchased, setPurchased] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (userCart) {
            userCart?.forEach((cartItem) => {
                if (cartItem.name !== item.landmark) {
                    setPurchased(false)
                } else {
                    setPurchased(true)
                }
            })
        } else {
            setPurchased(false)
        }
    }, [userCart])

    var itemPrice = item.discount && (item.price * (1 - item.discount)).toString()
    if (itemPrice && itemPrice.toString().split(".").length > 1) {
        if (itemPrice.toString().split(".")[1].length !== 2) {
            itemPrice = itemPrice.toString() + "0";
        }
    }

    return (
        <Modal
            basic
            open={open}
            size="large"
            className="item-modal"
            trigger={
                <Button
                    className={`item-modal-trigger-button ${open ? "open" : ""}`}
                    style={{ backgroundImage: `url(${item.photo})` }}
                    onClick={() => setOpen(true)}
                >
                    {item.discount && (<div className="discount">{item.discount * 100}% OFF</div>)}
                    <div className="item-shade"/>
                    <div className="pop-up">
                        MORE DETAILS
                    </div>
                </Button>
            }
        >
            <Header icon>
                <Icon name="plane"/>
                {item.landmark}
            </Header>
            <Modal.Content>
                <div className="display-item-details">
                    <span>Location: {item.landmark}</span>
                    <span className="item-price">
                        {item.discount ? (
                            <>
                                New Price: £{itemPrice ?? item.price}
                                <span className="old-price">
                                    Old Price: £{item.price}
                                </span>
                            </>
                        ) : (
                            <>
                                <span style={{ color: "white" }}>
                                    Price: £{item.price}
                                </span>
                            </>
                        )}
                    </span>
                </div>
            </Modal.Content>
            <Modal.Actions>
                {purchased &&
                    <Button
                        icon="close"
                        content="Remove"
                        color="red"
                        inverted
                        onClick={() => {
                            const array: any = [] 
                            userCart?.forEach((cartItem) => {
                                if (cartItem.name !== item.landmark) {
                                    array.push(cartItem)
                                }
                            })
                            setUserCart(array)
                            setPurchased(false)
                        }}
                    />
                }
                <Button
                    icon={purchased && "checkmark"}
                    disabled={purchased}
                    content="Add to cart"
                    color="green"
                    inverted
                    onClick={() => {
                        const array: any = []
                        userCart?.forEach((item) => array.push(item))
                        array?.push({
                            name: item.landmark,
                            price: itemPrice ?? item.price
                        })
                        setUserCart(array)
                        setPurchased(true)
                    }}
                />
                <Button 
                    content="Close"
                    color="black"
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default React.memo(DisplayItemModal)