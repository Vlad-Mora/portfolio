import React from "react";
import { Table, Image } from "semantic-ui-react";

import { LogProps, TripItemProps, UserProps } from "@interfaces/TravelAgency";

export function landmarksTableRow(data: TripItemProps) {
    return (
        <>
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
            <Table.Cell>{data.lastpurchased ? data.lastpurchased : "Not purchased yet"}</Table.Cell>
        </>
    )
}

export function logsTableRow(data: LogProps) {
    return (
        <>
            <Table.Cell>{data.time}</Table.Cell>
            <Table.Cell>{data.message}</Table.Cell>
        </>
    )
}

export function usersTableRow(data: UserProps) {
    return (
        <>
            <Table.Cell>{data.name}</Table.Cell>
            <Table.Cell>{data.surname}</Table.Cell>
            <Table.Cell>{data.email}</Table.Cell>
            <Table.Cell>{data.balance}</Table.Cell>
            <Table.Cell>{data.isadmin ? "True" : "False"}</Table.Cell>
        </>
    )
}