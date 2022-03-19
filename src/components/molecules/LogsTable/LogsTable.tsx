import React from "react";
import { Table } from "semantic-ui-react";
import { useEasybase } from "easybase-react";

import { LogProps } from "@interfaces/TravelAgency";

const LocationsStats: React.FC = () => {
    
    const { db, useReturn } = useEasybase();
    const { frame }: Record<string, any> = useReturn(() => db("TA-LOGS").return(), []);
    const [data, setData] = React.useState<LogProps[]>();

    React.useEffect(() => {
        if (frame.length > 0) {
            setData(frame)
        }
    }, [frame])

    return (
        <>
            {data ?
                <Table className="logs-table" fixed celled sortable selectable>
                    <Table.Header className="table-header">
                        <Table.Row>
                            <Table.HeaderCell className="timestamp-cell">Timestamp</Table.HeaderCell>
                            <Table.HeaderCell>Log</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className="table-body">
                        {data.map((item) => (
                            <Table.Row className="table-row">
                                <Table.Cell>{item.time}</Table.Cell>
                                <Table.Cell>{item.message}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>    
            : <div className="loading-circle"/>}
        </>
    );
}

export default React.memo(LocationsStats)