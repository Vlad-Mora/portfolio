import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

import LocationsStats from "@molecules/LocationsStats/LocationsStats";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const CheckoutModal: React.FC = () => {

    const { user } = React.useContext(ContextContainer) as ContextProps;

    const [open, setOpen] = React.useState<boolean>(false);
    
    return (
        <Modal
            className="admin-modal"
            open={open}
            size="large"
            trigger={
                user?.isadmin && (
                    <Button
                        className="admin-trigger"
                        content="Admin Panel"
                        icon="user outline"
                        onClick={() => setOpen(true)}
                    />
                )
            }
        >
            <Header icon>
                <Icon name="user circle"/>
                [ACP]: {user?.name} {user?.surname.toLocaleUpperCase()}
            </Header>
            <Modal.Content scrolling>
                <LocationsStats/>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Close"
                    color="violet"
                    inverted
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default React.memo(CheckoutModal)