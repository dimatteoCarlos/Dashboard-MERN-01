import React from 'react';
import CustomColumnMenu from '../../components/muiCustomization/DataGridCustomColumnMenu';
import { useSelector } from 'react-redux';

//DataGrid
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../components/header/Header';
import { useTheme } from '@mui/material';
import { userPerformanceHeaderColumns as columns } from './userPerformanceHeaderColumns.jsx';

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { useGetUserPerformanceQuery } from '../../state/api';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector

      //questo non da retta
      // slotProps={{ tooltip: { title: 'Change density' } }}
      />

      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        sx={{
          border: '1px solid yellow',
          marginBottom: '1rem',
        }}

        //questo slotProps non fa niente
        //react complains about slotProps
        /*
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
        */
      />
    </GridToolbarContainer>
  );
}

//-----------------

const UserPerformance = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  // console.log('🚀 ~ UserPerformance ~ userId:', userId, typeof userId);

  let {
    data: rows,
    isLoading,
    isFetching,
    isError,
  } = useGetUserPerformanceQuery(userId);

  const headerTitle = {
    title: 'USER PERFORMANCE',
    subTitle: 'Track your Affiliate Sales Performance',
  };

  if (!rows && (isLoading || isFetching)) return 'Loading...';

  if (!rows && isError) return 'Something went wrong...';

  return (
    <>
      <Box m='1.25rem 2.5rem'>
        <Header {...headerTitle} />
        <Box
          mt='1rem'
          height='80vh'
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
            loading={isLoading || !rows}
            getRowId={(row) => row._id}
            rows={(rows && rows.sales) || []}
            columns={columns}
            // pagination
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15, 50, 100]}
            checkboxSelection
            disableRowSelectionOnClick
            //--------------

            slots={{
              toolbar: CustomToolbar,
              //  toolbar: GridToolbar ,
              //a ColumnMenu ni le para bola
              ColumnMenu: CustomColumnMenu,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default UserPerformance;
