//Transactions.jsx
//Parent:Layout.jsx

import { useTheme, Box } from '@mui/material';
import { DataGrid,
 } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from '../../state/api';

import { transactionsHeaderColumns as columns } from './transactionsHeaderColumns';

import Header from '../../components/header/Header';
import { useState } from 'react';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';

const Transactions = () => {
  //values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const rowsData = (data && data.transactions) || [];
  const rowCount = (data && data.totalTransactions) || 0;

  // console.log('🚀 ~ Transactions ~ data:', rowCount);

  const headerTitle = {
    title: 'Transactions',
    subTitle: 'List of Transactions',
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
            className='dataTable__dataGrid'
            loading={isLoading || !data}
            rows={rowsData}
            getRowId={(row) => row._id}
            columns={columns}
            rowCount={rowCount}
            // {}
            //PAGINATION DOES NOT RESPOND TO NEW PAGE BUTTONS, It DOES NOT DO THE QUERY
            rowsPerPageOptions={[20, 50, 75, 100]} //not working
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode='server'
            sortingMode='server'
            // {}

            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            // {**************}
            //update this issue
          
            slot={{ Toolbar: DataGridCustomToolbar }}
            // {}
            slotProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}

          />
        </Box>
      </Box>
    </>
  );
};

export default Transactions;
