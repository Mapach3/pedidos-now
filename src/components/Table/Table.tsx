import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


interface Props {
    rows: any;
    columns: GridColDef[];
  }

const DataTable: React.FC<Props> = ({
    rows,
    columns
  }) => {

    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
        </div>
    )
};
export default DataTable;