import React from "react";
import { useEasybase } from "easybase-react";
import { format } from 'date-fns';

import { usersTableRow } from "@molecules/DataTable/RowFunctions";
import DataTable from "@molecules/DataTable/DataTable";

import { UserProps } from "@interfaces/TravelAgency";

import { ContextContainer, ContextProps } from "@context/ContextContainer";

const UsersTable: React.FC = () => {
    
    const { user, selectedRow, setSelectedRow } = React.useContext(ContextContainer) as ContextProps;

    const { db, e } = useEasybase();

    async function recordLog(action: string) {
        await db("TA-LOGS").insert({
            time: `${format(new Date(), 'kk:mm:ss dd/MM/yyyy')}`,
            message: `Admin ${user?.name} ${user?.surname[0]} has performed an action. Action: ${action}`
        }).one();
    }
    async function handleAdminEvent(state: boolean) {
        await db("USERS").where(
            e.eq("email", mappedSelectedRow?.email!)
        ).set({ isAdmin: state }).one().then((_) => {
            recordLog(`Updated Admin state ${state}. (performed on: ${mappedSelectedRow?.name} ${mappedSelectedRow?.surname})`)
            setSelectedRow(undefined)
        });
    }
    async function handleBalanceEvent(newBalance: number) {
        await db("USERS").where(
            e.eq("email", mappedSelectedRow?.email)
        ).set({ balance: newBalance }).one().then((_) => {
            recordLog(`Updated balance from ${mappedSelectedRow?.balance} to ${newBalance}. (performed on: ${mappedSelectedRow?.name} ${mappedSelectedRow?.surname})`)
            setSelectedRow(undefined)
        }).catch((error) => {
            console.log(error)
        });
    }
    
    const mappedSelectedRow = selectedRow as UserProps;

    return (
        <DataTable
            databaseTableHook="USERS"
            columns={[
                {
                    name: "Name",
                    sortable: true
                },
                {
                    name: "Surname",
                    sortable: true
                },
                {
                    name: "Email",
                    sortable: true
                },
                {
                    name: "Balance",
                    sortable: true
                },
                {
                    name: "Admin",
                    sortable: true
                }
            ]}
            rowFunction={usersTableRow}
            tableClassName="users-table"
            footer={[
                {
                    content: mappedSelectedRow?.isadmin ? "Remove Admin" : "Promote to Admin",
                    color: mappedSelectedRow?.isadmin ? "red" : "green",
                    onClick: () => {
                        handleAdminEvent(mappedSelectedRow?.isadmin)
                    }
                },
                {
                    content: "Update balance",
                    color: "green",
                    onClick: () => {
                            var newBalance = prompt("Enter new balance (avoid using decimals):")
                            if (newBalance) {
                                handleBalanceEvent(parseInt(newBalance))
                            } else {
                                newBalance = prompt("Enter new balance (avoid using decimals):")
                            }
                        }
                }
            ]}
        />
    );
}

export default React.memo(UsersTable)