//affiliatestatHeaderColumns.jsx

import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';

export const affiliatestatHeaderColumns = [
  { field: '_id', headerName: 'ID', flex: 1, sortable: false },
  { field: 'userId', headerName: 'User ID', flex: 1, sortable: true },
  { field: 'createdAt', headerName: 'Created at', flex: 1, sortable: true },
  {
    field: 'affiliateSales',
    headerName: 'Qty of Products',
    flex: 0.5,
    sortable: true,
    renderCell: (params) => Number(params.value.length),
    type: Number,
  },

  {
    field: 'cost',
    headerName: 'Cost ($)',
    flex: 1,
    sortable: true,
    // renderCell: (params) => parseFloat( (Math.round(params.value*100)/100)),

    // renderCell: (params) =>  Number(params.value).toFixed(2),

    renderCell: (params) => Number(`${Math.round(`${params.value}e2`)}e-2`),

    type: Number,
  },
];
