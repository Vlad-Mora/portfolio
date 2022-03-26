import React from "react";
import { format } from 'date-fns';
import { useEasybase } from "easybase-react";

import DataTable from "@molecules/DataTable/DataTable";
import { landmarksTableRow } from "@molecules/DataTable/RowFunctions";

import { TripItemProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const LandmarksTable: React.FC = () => {
    
    const { user, selectedRow, setSelectedRow } = React.useContext(ContextContainer) as ContextProps;
    
    const { db, e } = useEasybase();

    async function recordLog(action: string) {
        await db("TA-LOGS").insert({
            time: `${format(new Date(), 'kk:mm:ss dd/MM/yyyy')}`,
            message: `Admin ${user?.name} ${user?.surname[0]} has performed an action. Action: ${action}`
        }).one();
    }
    async function handleHideEvent(state: boolean) {
        await db("TA-LOCATIONS").where(
            e.eq("landmark", mappedSelectedRow?.landmark!)
        ).set({ hidden: state }).one().then((_) => {
            recordLog(`Updated hidden state to ${state}. (performed on: ${mappedSelectedRow?.landmark})`)
            setSelectedRow(undefined)
        });
    }
    async function handleDiscountEvent(discount: number | null) {
        await db("TA-LOCATIONS").where(
            e.eq("landmark", mappedSelectedRow?.landmark!)
        ).set({ discount: discount }).one().then((_) => {
            recordLog(`Updated discount to ${discount}. (performed on: ${mappedSelectedRow?.landmark})`)
            setSelectedRow(undefined)
        });
    }

    const mappedSelectedRow = selectedRow as TripItemProps;

    return (
        <DataTable
            databaseTableHook="TA-LOCATIONS"
            columns={[
                {
                    name: "Location"
                },
                {
                    name: "Discount",
                    sortable: true
                },
                {
                    name: "Rating",
                    sortable: true
                },
                {
                    name: "Price",
                    sortable: true
                },
                {
                    name: "Hidden",
                    sortable: true
                },
                {
                    name: "Stock",
                    sortable: true
                },
                {
                    name: "Views",
                    sortable: true
                },
                {
                    name: "Last Purchased",
                    sortable: true
                }
            ]}
            rowFunction={landmarksTableRow}
            tableClassName="locations-stats-table"
            footer={[
                {
                    content: mappedSelectedRow?.hidden ? "Show" : "Hide",
                    color: mappedSelectedRow?.hidden ? "green" : "red",
                    onClick: () => {
                        handleHideEvent(!mappedSelectedRow?.hidden)
                    }
                },
                {
                    content: mappedSelectedRow?.discount === null ? "Make offer" : `Change offer (current offer: ${mappedSelectedRow?.discount}%)`,
                    color: mappedSelectedRow?.discount === null ? "violet" : "grey",
                    onClick: () => {
                        var discount = prompt("Enter discount (enter 'remove' to remove offer):")
                        if (discount === null) {
                            discount = prompt("Enter discount (enter 'remove' to remove offer):")
                        }
                        if (discount === "remove") {
                            handleDiscountEvent(null)
                        }
                        if (discount && parseInt(discount) > 0) {
                            handleDiscountEvent(parseInt(discount))
                        }
                    }
                }
            ]}
        />
    );
}

export default React.memo(LandmarksTable)