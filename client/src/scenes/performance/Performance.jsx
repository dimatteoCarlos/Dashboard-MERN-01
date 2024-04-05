//Performance.jsx
//Parent:Layout.jsx

import { useTheme, Box } from '@mui/material';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useGetAffiliateStatQuery } from '../../state/api';
import { affiliatestatHeaderColumns as columns } from './affiliatestatHeaderColumns';
import Header from '../../components/header/Header';
import { useState } from 'react';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';

const Performance = () => {
  //values to be sent to the backend
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(15);
  // const [sort, setSort] = useState({});
  // const [search, setSearch] = useState('');
  // const [searchInput, setSearchInput] = useState('');

  const { data, isLoading, isFetching } = useGetAffiliateStatQuery();

  const rowsData = data || [];
  console.log('🚀 ~ Performance ~ rowsData:', rowsData);

  const headerTitle = {
    title: 'PERFORMANCE',
    subTitle: 'Track your Affiliate Sales Performance here',
  };

  const theme = useTheme();

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
            loading={isLoading || isFetching || !rowsData}
            rows={rowsData || []}
            getRowId={(row) => row._id}
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

            // slots={{ toolbar: GridToolbar }}
            // slotProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
            // {}
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

export default Performance;
