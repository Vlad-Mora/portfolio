import React from "react";
import { Header, Modal, Button, Icon, Input } from "semantic-ui-react";

import { ContextContainer, ContextProps } from "@context/ContextContainer";
import { useEasybase } from "easybase-react";

const MyWalletModal: React.FC = () => {

    const { user } = React.useContext(ContextContainer) as ContextProps;
    const { db, e } = useEasybase();
    
    const [open, setOpen] = React.useState<boolean>(false);
    const [isFundsModalOpen, setIsFundsModalOpen] = React.useState<boolean>(false);
    const [isMaxFundsModalOpen, setIsMaxFundsModalOpen] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [configBalance, setConfigBalance] = React.useState<number>(0);
    const [configInput, setConfigInput] = React.useState<string>("");

    async function updateUserBalance() {
        setIsLoading(true)
        await db("USERS").where(
            e.and(
                e.eq("email", user?.email!),
                e.eq("password", user?.password!)
            )
        ).set({ balance: configBalance }).one()
        setIsLoading(false)
    }

    async function getConfig() {
        await db("TA-SETTINGS").return().all().then((res) => {
            res.forEach((item: number | Record<string, any>) => {
                if (Object.values(item)[0] === "maxBalance") {
                    setConfigBalance(Object.values(item)[1])
                }
            })
        });
    }

    async function handleUpdate() {
        await db("TA-SETTINGS").where(
            e.eq("config", "maxBalance")
        ).set({ value: configInput }).one().then(() => {
            getConfig()
            setIsMaxFundsModalOpen(false)
        });
    }

    React.useEffect(() => {
        getConfig()
    }, [])

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
                    {user?.balance! < configBalance ? "Would you like to add funds?" : "*You cannot add more funds."}
                </p>
            </Modal.Content>
            <Modal.Actions>
                {user?.isadmin && (
                    <Button
                        content="Set max funds"
                        color="grey"
                        inverted
                        onClick={() => {
                            setIsMaxFundsModalOpen(true)
                        }}
                    />
                )}
                <Button
                    disabled={user?.balance! >= configBalance}
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
                        Your balance has been updated to £{configBalance}.
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

            <Modal
                basic
                open={isMaxFundsModalOpen}
                size="small"
            >
                <Header icon>
                    <Icon name="star"/>
                    [ADMIN]: Configure funds value
                </Header>
                <Modal.Content>
                    <p>
                        <Input
                            onChange={(_, data) => {
                                setConfigInput(data.value)
                            }}
                        />
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        content="Update"
                        color="green"
                        inverted
                        onClick={handleUpdate}
                    />
                    <Button 
                        content="Close"
                        color="black"
                        onClick={() => setIsMaxFundsModalOpen(false)}
                    />
                </Modal.Actions>
            </Modal>
        </Modal>
    )
}

export default React.memo(MyWalletModal)