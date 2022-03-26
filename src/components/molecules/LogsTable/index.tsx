import React from "react";

import DataTable from "@molecules/DataTable/DataTable";
import { logsTableRow } from "@molecules/DataTable/RowFunctions";

const LogsTable: React.FC = () => {

    return (
        <DataTable
            databaseTableHook="TA-LOGS"
            columns={[
                {
                    name: "Timestamp",
                    className: "timestamp-cell",
                    sortable: true
                },
                {
                    name: "Message"
                }
            ]}
            rowFunction={logsTableRow}
            tableClassName="logs-table"
        />
    );
}

export default React.memo(LogsTable)