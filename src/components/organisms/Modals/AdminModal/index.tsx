import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

import LandmarksTable from "@molecules/LandmarksTable";
import UsersTable from "@molecules/UsersTable";
import LogsTable from "@molecules/LogsTable";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const CheckoutModal: React.FC = () => {

    const { user, setSelectedRow } = React.useContext(ContextContainer) as ContextProps;

    const [open, setOpen] = React.useState<boolean>(false);
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    
    const tables = [
        {
            header: "Locations Statistics",
            component: <LandmarksTable/>
        },
        {
            header: "Logs",
            component: <LogsTable/>
        },
        {
            header: "Users",
            component: <UsersTable/>
        }
    ];

    function handleClickEvent(direction: string, action: string) {
        const lastIndex = tables.length - 1;
        if (action === "set value") {
            if (direction === "previous") {
                if (activeIndex === 0) {
                    setActiveIndex(lastIndex)
                } else {
                    setActiveIndex(activeIndex - 1)
                }
            }

            if (direction === "next") {
                if (activeIndex === lastIndex) {
                    setActiveIndex(0)
                } else {
                    setActiveIndex(activeIndex + 1)
                }
            }
        }

        if (action === "return value") {
            if (direction === "previous") {
                if (activeIndex === 0) {
                    return lastIndex;
                } else {
                    return activeIndex - 1;
                }
            }

            if (direction === "next") {
                if (activeIndex === lastIndex) {
                    return 0;
                } else {
                    return activeIndex + 1;
                }
            }
        }

        setSelectedRow(undefined);
    }

    return (
        <Modal
            className="admin-modal noselect"
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
            <div className="carousel-button previous">
                <Button
                    icon="angle left"
                    onClick={() => handleClickEvent("previous", "set value")}
                />
                {tables[handleClickEvent("previous", "return value")!].header}
            </div>
            <div className="carousel-button next">
                <Button
                    icon="angle right"
                    onClick={() => handleClickEvent("next", "set value")}
                />
                {tables[handleClickEvent("next", "return value")!].header}
            </div>
            <Modal.Content className="carousel" scrolling>
                {tables[activeIndex].component}
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Close"
                    color="black"
                    onClick={() => {
                        setSelectedRow(undefined)
                        setOpen(false)
                    }}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default React.memo(CheckoutModal)