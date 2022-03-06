import React from "react";
import { Header, Table, Image } from "semantic-ui-react";

import { TripItemProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

interface TableRowProps {
    data: TripItemProps;
}

const TableRow: React.FC<TableRowProps> = ({ data }) => {

    const { selectedRow, setSelectedRow } = React.useContext(ContextContainer) as ContextProps;
    
    const isRowSelected = selectedRow?.landmark === data.landmark ? "selected" : "";
    const isOutOfStock = data.stock === 0 ? "out-of-stock" : "";
    const isDisabled = data.hidden ? "hidden" : "";
    
    return (
        <Table.Row
            className={`table-row ${isRowSelected} ${isOutOfStock} ${isDisabled}`}
            onClick={() => {
                if (selectedRow?.landmark === data.landmark) {
                    setSelectedRow(undefined)
                } else {
                    setSelectedRow(data)
                }
            }}
        >
            <Table.Cell>
                <Header as="h4" image>
                    <Image src={data.photo} rounded size="mini"/>
                    <Header.Content className="tablerow-content">
                        {data.landmark}
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{data.rating}</Table.Cell>
            <Table.Cell>{data.price}</Table.Cell>
            <Table.Cell>{data.hidden ? "Hidden" : "Shown"}</Table.Cell>
            <Table.Cell>{data.stock}</Table.Cell>
            <Table.Cell>{data.viewscount}</Table.Cell>
            <Table.Cell>{data.lastPurchased ? data.lastPurchased : "Not purchased yet"}</Table.Cell>
        </Table.Row>
    );
}

export default React.memo(TableRow)