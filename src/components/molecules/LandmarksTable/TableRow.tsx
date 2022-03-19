import React from "react";
import { Table, Image } from "semantic-ui-react";

import { TripItemProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

interface TableRowProps {
    data: TripItemProps;
}

const TableRow: React.FC<TableRowProps> = ({ data }) => {

    const { selectedLandmark, setSelectedLandmark } = React.useContext(ContextContainer) as ContextProps;
    
    const isRowSelected = selectedLandmark?.landmark === data.landmark ? "selected" : "";
    const isOutOfStock = data.stock === 0 ? "out-of-stock" : "";
    const isDisabled = data.hidden ? "hidden" : "";
    
    return (
        <Table.Row
            className={`table-row ${isRowSelected} ${isOutOfStock} ${isDisabled}`}
            onClick={() => {
                if (selectedLandmark?.landmark === data.landmark) {
                    setSelectedLandmark(undefined)
                } else {
                    setSelectedLandmark(data)
                }
            }}
        >
            <Table.Cell className="location-cell">
                <Image src={data.photo} rounded size="mini"/>
                {data.landmark}
            </Table.Cell>
            <Table.Cell>{data.discount ? `${data.discount}%` : "None"}</Table.Cell>
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