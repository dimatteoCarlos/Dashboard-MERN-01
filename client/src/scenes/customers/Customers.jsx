//Customers.jsx
//Parent:Layout.jsx

import { useTheme, Box } from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  // GridColDef,
  // GridRenderCellParams,
} from '@mui/x-data-grid';
import { useGetCustomersQuery } from '../../state/api';
import { userHeaderColumns as columns } from './userHeaderColumns';
import Header from '../../components/header/Header';

const Customers = () => {
  const { isLoading, data, isError } = useGetCustomersQuery();

  // console.log('🚀 ~ Customers ~ data:', data);

  const headerTitle = {
    title: 'CUSTOMERS',
    subTitle: 'List of Customers',
  };
  // const columns = [...userHeaderColumns];

  const theme = useTheme();
  const pageSize = 15;

  return (
    <>
      <Box m='1.5rem 2.5rem '>
        <Header {...headerTitle} />

        <Box
          mt='2rem'
          height='90vh'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          
          <DataGrid
            className='dataTable__dataGrid'
            loading={isLoading || !data}
            rows={data || []}
            getRowId={(row) => row._id}
            columns={columns}

         

            // initialState={{
            //   pagination: {
            //     paginationModel: {
            //       pageSize: pageSize,
            //     },
            //   },
            // }}

            // slots={{ toolbar: GridToolbar }}
            // slotProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}

            // pageSizeOptions={[{ pageSize }]}
            // checkboxSelection
            // disableRowSelectionOnClick
            // disableColumnSelector
            // disableDensitySelector
          />
        </Box>
      </Box>
    </>
  );
};

export default Customers;
