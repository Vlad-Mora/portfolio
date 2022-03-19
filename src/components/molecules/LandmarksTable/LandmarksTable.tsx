import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useEasybase } from "easybase-react";
import { format } from 'date-fns';
var _ = require("lodash");

import TableRow from "./TableRow";

import { TripItemProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const LandmarksTable: React.FC = () => {
    
    const { user, selectedLandmark, setSelectedLandmark } = React.useContext(ContextContainer) as ContextProps;
    const [data, setData] = React.useState<Record<string, any>>();
    const [sortDirection, setSortDirection] = React.useState<"descending" | "ascending">("descending");
    const [selectedColumn, setSelectedColumn] = React.useState<string>("rating");
    
    const { db, e, useReturn } = useEasybase();
    const { frame }: Record<string, any> = useReturn(() => db("TA-LOCATIONS").return(), []);
    
    React.useEffect(() => {
        if (frame.length > 0) {
            const newData = _.sortBy(frame, selectedColumn)
            if (sortDirection === "ascending") {
                setData(newData)
            } else {
                setData(newData.reverse())
            }
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

    async function recordLog(action: string) {
        await db("TA-LOGS").insert({
            time: `${format(new Date(), 'kk:mm:ss dd/MM/yyyy')}`,
            message: `Admin ${user?.name} ${user?.surname[0]} has performed an action. Action: ${action}`
        }).one();
    }
    async function handleHideEvent(state: boolean) {
        await db("TA-LOCATIONS").where(
            e.eq("landmark", selectedLandmark?.landmark!)
        ).set({ hidden: state }).one().then((_) => {
            recordLog(`Updated hidden state to ${state}. (performed on: ${selectedLandmark?.landmark})`)
            setSelectedLandmark(undefined)
        });
    }
    async function handleDiscountEvent(discount: number | null) {
        await db("TA-LOCATIONS").where(
            e.eq("landmark", selectedLandmark?.landmark!)
        ).set({ discount: discount }).one().then((_) => {
            recordLog(`Updated discount to ${discount}. (performed on: ${selectedLandmark?.landmark})`)
            setSelectedLandmark(undefined)
        });
    }

    return (
        <>
            {data ?
                <Table className="locations-stats-table" celled sortable selectable>
                    <Table.Header className="table-header">
                        <Table.Row>
                            <Table.HeaderCell>Location</Table.HeaderCell>
                            <Table.HeaderCell
                                content="Discount"
                                sorted={selectedColumn === "discount" ? sortDirection : undefined}
                                onClick={() => {
                                    handleColumnClickEvent("discount")
                                }}
                            />
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
                    <Table.Footer className="table-footer">
                        <Table.Row>
                            <Table.HeaderCell colspan={8}>
                                <Button
                                    inverted={selectedLandmark !== undefined}
                                    content={selectedLandmark ? (selectedLandmark?.hidden ? "Show" : "Hide") : "Select an item"}
                                    color={selectedLandmark ? (selectedLandmark?.hidden ? "green" : "red") : "grey"}
                                    disabled={selectedLandmark === undefined}
                                    onClick={() => {
                                        const state = selectedLandmark?.hidden ? false : true;
                                        handleHideEvent(state)
                                    }}
                                />
                                <Button
                                    inverted={selectedLandmark !== undefined}
                                    content={selectedLandmark ? (selectedLandmark.discount === null ? "Make offer" : `Change offer (current offer: ${selectedLandmark?.discount}%)`) : "Select an item"}
                                    color={selectedLandmark ? "violet" : "grey"}
                                    disabled={selectedLandmark === undefined}
                                    onClick={() => {
                                        var discount = prompt("Enter discount (enter 'remove' to remove offer):")
                                        if (discount === "remove") {
                                            handleDiscountEvent(null)
                                        }
                                        if (discount && parseInt(discount) > 0) {
                                            handleDiscountEvent(parseInt(discount))
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

export default React.memo(LandmarksTable)