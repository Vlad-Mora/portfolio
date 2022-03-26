import React from "react";
import { useEasybase } from "easybase-react";
import { Button, SemanticCOLORS, Table } from "semantic-ui-react";
var _ = require("lodash");

import TableRow from "./TableRow";

import LoadingCircle from "@atoms/LoadingCircle/LoadingCircle";

import { LogProps, TripItemProps, UserProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

interface FooterProps {
    content: string;
    color: SemanticCOLORS;
    onClick: () => void;
}

interface ColumnProps {
    name: string;
    sortable?: boolean;
    className?: string;
}

interface DataTableProps {
    databaseTableHook: string;
    tableClassName: string;
    columns: ColumnProps[];
    rowFunction: Function;
    footer?: FooterProps[];
}

const DataTable: React.FC<DataTableProps> = ({ databaseTableHook, tableClassName, columns, rowFunction, footer }) => {

    const { selectedRow } = React.useContext(ContextContainer) as ContextProps;

    const [sortDirection, setSortDirection] = React.useState<"descending" | "ascending">("ascending");
    const [selectedColumn, setSelectedColumn] = React.useState<string>("");
    const [data, setData] = React.useState<TripItemProps[] | UserProps[] | LogProps[]>();

    const { db, useReturn } = useEasybase();
    const { frame }: Record<string, any> = useReturn(() => db(databaseTableHook).return(), []);

    React.useEffect(() => {
        if (frame.length > 0) {
            setData(frame)
        }
    }, [frame])

    React.useEffect(() => {
        if (data) {
            if (sortDirection === "descending") {
                const newData = _.sortBy(data, selectedColumn.replace(/ /g, '').toLowerCase())
                setData(newData)
            } else {
                const newData = _.sortBy(data, selectedColumn.replace(/ /g, '').toLowerCase()).reverse()
                setData(newData)
            }
        }
    }, [sortDirection, selectedColumn])

    return (
        <>
            {data ?
                <Table className={tableClassName} celled sortable selectable key={tableClassName}>
                    <Table.Header className="table-header">
                        <Table.Row>
                            {columns.map((column) => (
                                <Table.HeaderCell
                                    content={column.name}
                                    className={column.className}
                                    sorted={column.sortable && selectedColumn === column.name ? sortDirection : undefined}
                                    onClick={() => {
                                        if (column.sortable) {
                                            if (selectedColumn !== column.name) {
                                                setSortDirection("ascending")
                                                setSelectedColumn(column.name)
                                            } else {
                                                setSortDirection(sortDirection === "ascending" ? "descending" : "ascending")
                                            }
                                        }
                                    }}
                                />
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className="table-body">
                        {data.map((item: TripItemProps | UserProps | LogProps) => (
                            <TableRow
                                data={item}
                                rowFunction={rowFunction}
                            />
                        ))}
                    </Table.Body>
                    <Table.Footer className="table-footer">
                        <Table.Row>
                            <Table.HeaderCell colSpan={8}>
                                {selectedRow && footer?.map((button) => (
                                    <Button
                                        inverted
                                        content={button.content}
                                        color={button.color}
                                        onClick={() => button.onClick()}
                                    />
                                ))}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            : <LoadingCircle/>}
        </>
    );
}

export default React.memo(DataTable);