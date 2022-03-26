import React from "react";
import { Table } from "semantic-ui-react";

import { LogProps, TripItemProps, UserProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

interface TableRowProps {
    data: TripItemProps | UserProps | LogProps;
    rowFunction: Function;
}

const TableRow: React.FC<TableRowProps> = ({ data, rowFunction }) => {
    
    const { selectedRow, setSelectedRow } = React.useContext(ContextContainer) as ContextProps;

    var rowClasses = "table-row ";
    if (selectedRow === data) {
        rowClasses += "selected "
        
        if ("landmark" in data) {
            if (data.stock === 0) {
                rowClasses += "out-of-stock "
            }
            if (data.hidden) {
                rowClasses += "hidden"
            }
        }
    }

    return (
        <Table.Row
            className={rowClasses}
            onClick={() => {
                if (selectedRow === data) {
                    setSelectedRow(undefined)
                } else {
                    setSelectedRow(data)
                }
            }}
        >
            {rowFunction(data)}
        </Table.Row>
    );
}

export default React.memo(TableRow);