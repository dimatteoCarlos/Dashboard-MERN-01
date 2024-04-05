//scenes/admin/userHeaderColumns.jsx

// import {
//   GridColDef,
//   GridRenderCellParams,
//   GridValueGetterParams,
// } from '@mui/x-data-grid';
import getCountryISO3 from 'country-iso-2-to-3';

export const userHeaderColumns = [
  { field: '_id', headerName: 'ID', flex: 1, sortable: false },
  // {
  //   field: 'img',
  //   headerName: 'Image',
  //   width: 100,

  //   renderCell: (params) => {
  //     return (
  //       <img
  //         className='image'
  //         src={params.row.img || '/noavatar.png'}
  //         alt={params.row.lastName}
  //       />
  //     );
  //   },
  // },

  {
    field: 'name',
    headerName: 'Name',
    flex: 0.5,
    // editable: true,
    type: 'string',
  },

  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    flex: 1,
    editable: false,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    type: 'string',
    flex: 0.5,
    editable: false,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   type: 'string',

  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },

  {
    field: 'country',
    headerName: 'Country',
    flex: 0.4,
    // editable: true,
    type: 'string',
    valueGetter: (params) => `${getCountryISO3(params.row.country)}`,
  },

  {
    field: 'occupation',
    headerName: 'Occupation',
    flex: 1,
    editable: false,
    type: 'string',
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 0.5,
    editable: false,
    type: 'string',
  },
];
