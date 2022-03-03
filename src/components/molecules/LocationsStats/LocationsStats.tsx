import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useEasybase } from "easybase-react";
var _ = require("lodash");

import { TripItemProps } from "@interfaces/index";
import TableRow from "./TableRow";
import { ContextContainer, ContextProps } from "@context/ContextContainer";

const LocationsStats: React.FC = () => {
    
    const { db, e, useReturn } = useEasybase();
    const { frame }: Record<string, any> = useReturn(() => db("TA-LOCATIONS").return(), []);
    const { selectedRow, setSelectedRow } = React.useContext(ContextContainer) as ContextProps;
    
    const [data, setData] = React.useState<Record<string, any>>();

    const [sortDirection, setSortDirection] = React.useState<"descending" | "ascending">("descending");
    const [selectedColumn, setSelectedColumn] = React.useState<string>("rating");
    
    React.useEffect(() => {
        const newData = _.sortBy(frame, selectedColumn)
        if (sortDirection === "ascending") {
            setData(newData)
        } else {
            setData(newData.reverse())
        }
    }, [frame, sortDirection, selectedColumn])

    function handleColumnClickEvent(columnName: string) {
        if (selectedColumn === columnName) {
            if (sortDirection === "ascending") {
                setSortDirection("descending")
            } else {
                setSortDirection("ascending")
            }
        } else {
            setSelectedColumn(columnName)
        }
    }

    async function handleHideEvent(state: boolean) {
        await db("TA-LOCATIONS").where(
            e.eq("landmark", selectedRow?.landmark!)
        ).set({ hidden: state }).one().then((_) => setSelectedRow(undefined));
    }

    async function handleDiscountEvent(discount: number | null) {
        await db("TA-LOCATIONS").where(
            e.eq("landmark", selectedRow?.landmark!)
        ).set({ discount: discount }).one().then((_) => setSelectedRow(undefined));
    }

    return (
        <Table className="locations-stats-table" celled sortable selectable>
            <Table.Header className="table-header">
                <Table.Row>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell
                        content="Rating"
                        sorted={selectedColumn === "rating" ? sortDirection : undefined}
                        onClick={() => {
                            handleColumnClickEvent("rating")
                        }}
                    />
                    <Table.HeaderCell
                        content="Price"
                        sorted={selectedColumn === "price" ? sortDirection : undefined}
                        onClick={() => {
                            handleColumnClickEvent("price")
                        }}
                    />
                    <Table.HeaderCell
                        content="Hidden"
                        sorted={selectedColumn === "hidden" ? sortDirection : undefined}
                        onClick={() => {
                            handleColumnClickEvent("hidden")
                        }}
                    />
                    <Table.HeaderCell
                        content="Stock"
                        sorted={selectedColumn === "stock" ? sortDirection : undefined}
                        onClick={() => {
                            handleColumnClickEvent("stock")
                        }}
                    />
                    <Table.HeaderCell
                        content="Views"
                        sorted={selectedColumn === "viewscount" ? sortDirection : undefined}
                        onClick={() => {
                            handleColumnClickEvent("viewscount")
                        }}
                    />
                    <Table.HeaderCell
                        content="Last Purchased"
                        sorted={selectedColumn === "lastPurchased" ? sortDirection : undefined}
                        onClick={() => {
                            handleColumnClickEvent("lastPurchased")
                        }}
                    />
                </Table.Row>
            </Table.Header>
            <Table.Body className="table-body">
                {data && data.map((item: TripItemProps) => (
                    <TableRow
                        data={item}
                    />
                ))}
            </Table.Body>
            <Table.Footer className="table-footer" fullWidth>
                <Table.Row>
                    <Table.HeaderCell colspan={7}>
                        <Button
                            inverted={selectedRow !== undefined}
                            content={selectedRow ? (selectedRow?.hidden ? "Show" : "Hide") : "Select an item"}
                            color={selectedRow ? (selectedRow?.hidden ? "green" : "red") : "grey"}
                            disabled={selectedRow === undefined}
                            onClick={() => {
                                const state = selectedRow?.hidden ? false : true;
                                handleHideEvent(state)
                            }}
                        />
                        <Button
                            inverted={selectedRow !== undefined}
                            content={selectedRow ? (selectedRow.discount === null ? "Make offer" : `Change offer (${selectedRow?.discount}%)`) : "Select an item"}
                            color={selectedRow ? "violet" : "grey"}
                            disabled={selectedRow === undefined}
                            onClick={() => {
                                var discount = prompt("Enter discount (enter 'remove' to remove offer):")
                                if (discount && parseInt(discount) > 0) {
                                    handleDiscountEvent(parseInt(discount))
                                } else if (discount === "remove") {
                                    handleDiscountEvent(null)
                                }
                            }}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

export default React.memo(LocationsStats)