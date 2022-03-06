import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

import { ContextContainer, ContextProps } from "@context/ContextContainer";
import { removeLocalCookie } from "@helpers/cookieFunctions";

const SignOutModal: React.FC = () => {

    const { setUser } = React.useContext(ContextContainer) as ContextProps;
    
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <Modal
            basic
            open={open}
            size="small"
            trigger={
                <Button
                    content="Sign Out"
                    className="signout-dropdown-button"
                    icon="sign-out"
                    onClick={() => setOpen(true)}
                />
            }
        >
            <Header icon>
                <Icon name="sign-out"/>
                Sign Out
            </Header>
            <Modal.Content>
                <p>Are you sure you want to sign out?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button 
                    className="signout-button" 
                    basic color="red"
                    inverted 
                    onClick={() => {
                        setOpen(false)
                        setUser(undefined)
                        removeLocalCookie("keepLoggedIn")
                    }}
                    content="Sign Out"
                />
                <Button 
                    className="cancel" 
                    content="Cancel"
                    color="green" 
                    inverted 
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default React.memo(SignOutModal)