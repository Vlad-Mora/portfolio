import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

import { ContextContainer, ContextProps } from "@context/ContextContainer";
import { useEasybase } from "easybase-react";

const MyWalletModal: React.FC = () => {

    const { db, e } = useEasybase();
    const { user } = React.useContext(ContextContainer) as ContextProps;
    const [open, setOpen] = React.useState<boolean>(false);
    const [isFundsModalOpen, setIsFundsModalOpen] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function updateUserBalance() {
        setIsLoading(true)
        await db("USERS").where(
            e.and(
                e.eq("email", user?.email!),
                e.eq("password", user?.password!)
            )
        ).set({ balance: 100000 }).one()
        setIsLoading(false)
    }

    return (
        <Modal
            basic
            open={open}
            size="small"
            trigger={
                <Button
                    content="My Wallet"
                    className="my-wallet"
                    icon="money"
                    onClick={() => setOpen(true)}
                />
            }
        >
            <Header icon>
                <Icon name="money"/>
                My Wallet
            </Header>
            <Modal.Content>
                <p>
                    Your current balance is: <u>£{user?.balance}</u>
                    <br/>
                    <br/>
                    {user?.balance! < 100000 ? "Would you like to add funds?" : "*You cannot add more funds."}
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    disabled={user?.balance! >= 100000}
                    className="addfunds-button" 
                    content="Add funds"
                    color="green" 
                    inverted 
                    onClick={() => {
                        updateUserBalance()
                        setIsFundsModalOpen(true)
                    }}
                />
                <Button 
                    content="Close"
                    basic
                    color="red"
                    inverted
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>

            <Modal
                basic
                open={isFundsModalOpen && !isLoading}
                size="small"
            >
                <Header icon>
                    <Icon name="checkmark"/>
                    Funds added
                </Header>
                <Modal.Content>
                    <p>
                        Your balance has been updated to £100000.
                        <br/>
                        <br/>
                        Your new balance is: <u>£{user?.balance}</u>
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        content="Close"
                        color="black"
                        onClick={() => setIsFundsModalOpen(false)}
                    />
                </Modal.Actions>
            </Modal>
        </Modal>
    )
}

export default React.memo(MyWalletModal)