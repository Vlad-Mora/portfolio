import React from "react";
import { Table } from "semantic-ui-react";

import { UserProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

interface TableRowProps {
    data: UserProps;
}

const TableRow: React.FC<TableRowProps> = ({ data }) => {

    const { selectedUser, setSelectedUser } = React.useContext(ContextContainer) as ContextProps;
    
    const isRowSelected = selectedUser?.email === data.email ? "selected" : "";

    return (
        <Table.Row
            className={`table-row ${isRowSelected}`}
            onClick={() => {
                if (selectedUser?.email === data.email) {
                    setSelectedUser(undefined)
                } else {
                    setSelectedUser(data)
                }
            }}
        >
            <Table.Cell>{data.name}</Table.Cell>
            <Table.Cell>{data.surname}</Table.Cell>
            <Table.Cell>{data.email}</Table.Cell>
            <Table.Cell>{data.balance}</Table.Cell>
            <Table.Cell>{data.isadmin ? "True" : "False"}</Table.Cell>
        </Table.Row>
    );
}

export default React.memo(TableRow)