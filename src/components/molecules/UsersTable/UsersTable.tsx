import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useEasybase } from "easybase-react";
import { format } from 'date-fns';

import TableRow from "./TableRow";

import { UserProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const UsersTable: React.FC = () => {
    
    const { user, selectedUser, setSelectedUser } = React.useContext(ContextContainer) as ContextProps;
    
    const [data, setData] = React.useState<UserProps[]>();

    const { db, useReturn, e } = useEasybase();
    const { frame }: Record<string, any> = useReturn(() => db("USERS").return(), []);

    React.useEffect(() => {
        if (frame.length > 0) {
            setData(frame)
        }
    }, [frame])

    async function recordLog(action: string) {
        await db("TA-LOGS").insert({
            time: `${format(new Date(), 'kk:mm:ss dd/MM/yyyy')}`,
            message: `Admin ${user?.name} ${user?.surname[0]} has performed an action. Action: ${action}`
        }).one();
    }
    async function handleAdminEvent(state: boolean) {
        await db("USERS").where(
            e.eq("email", selectedUser?.email!)
        ).set({ isAdmin: state }).one().then((_) => {
            recordLog(`Updated Admin state ${state}. (performed on: ${selectedUser?.name} ${selectedUser?.surname})`)
            setSelectedUser(undefined)
        });
    }
    async function handleBalanceEvent(newBalance: number) {
        await db("USERS").where(
            e.eq("email", selectedUser?.email!)
        ).set({ balance: newBalance }).one().then((_) => {
            recordLog(`Updated balance from ${selectedUser?.balance} to ${newBalance}}. (performed on: ${selectedUser?.name} ${selectedUser?.surname})`)
            setSelectedUser(undefined)
        });
    }

    return (
        <>
            {data ?
                <Table className="users-table" fixed celled sortable selectable>
                    <Table.Header className="table-header">
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Surname</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Balance</Table.HeaderCell>
                            <Table.HeaderCell>Admin</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className="table-body">
                        {data.map((user) => (
                            <TableRow
                                data={user}
                            />
                        ))}
                    </Table.Body>
                    <Table.Footer className="table-footer">
                        <Table.Row>
                            <Table.HeaderCell colspan={8}>
                                <Button
                                    inverted={selectedUser !== undefined}
                                    content={selectedUser ? (selectedUser?.isadmin ? "Remove Admin" : "Make Admin") : "Select a user"}
                                    color={selectedUser ? (selectedUser?.isadmin ? "red" : "green") : "grey"}
                                    disabled={selectedUser === undefined}
                                    onClick={() => {
                                        const state = selectedUser?.isadmin ? false : true;
                                        handleAdminEvent(state)
                                    }}
                                />
                                <Button
                                    inverted={selectedUser !== undefined}
                                    content={selectedUser ? "Update balance" : "Select a user"}
                                    color={selectedUser ? "green" : "grey"}
                                    disabled={selectedUser === undefined}
                                    onClick={() => {
                                        var newBalance = prompt("Enter new balance (avoid using decimals):")
                                        if (newBalance) {
                                            handleBalanceEvent(parseInt(newBalance))
                                        } else {
                                            newBalance = prompt("Enter new balance (avoid using decimals):")
                                        }
                                    }}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            : <div className="loading-circle"/>}
        </>
    );
}

export default React.memo(UsersTable)