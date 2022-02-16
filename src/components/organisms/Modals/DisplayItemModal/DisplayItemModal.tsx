import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

import { ItemProps } from "@interfaces/index";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

interface DisplayItemModalProps {
    item: ItemProps;
}

const DisplayItemModal: React.FC<DisplayItemModalProps> = ({ item }) => {

    const { userCart, setUserCart } = React.useContext(ContextContainer) as ContextProps;
    const [open, setOpen] = React.useState<boolean>(false);
    const [purchased, setPurchased] = React.useState<boolean>(false);

    React.useEffect(() => {
        console.log(userCart)
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

    return (
        <Modal
            basic
            open={open}
            size="small"
            className="item-modal"
            trigger={
                <Button
                    className={`item-modal-trigger-button ${open && "open"}`}
                    style={{ backgroundImage: `url(${item.photo})`}}
                    onClick={() => setOpen(true)}
                >
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
                    <span>Price: £{item.price}</span>
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
                            price: item.price
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