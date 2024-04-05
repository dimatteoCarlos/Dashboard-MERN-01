//Admin.jsx
//Parent:Layout.jsx

import { useGetAdminQuery } from '../../state/api';

//DataGrid
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../components/header/Header';
import { useTheme } from '@mui/material';
import { userHeaderColumns as columns } from './userHeaderColumns.jsx';

//prueba
import {
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';

import CustomColumnMenu from '../../components/muiCustomization/DataGridCustomColumnMenu';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        //questo non da retta
        slotProps={{ tooltip: { title: 'Change density' } }}
      />

      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        sx={{
          border: '1px solid yellow',
          marginBottom: '1rem',
        }}
        //questo slotProps non fa niente
        //react complains about slotProps
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
      />
    </GridToolbarContainer>
  );
}

//-----------------

const Admin = () => {
  let { data, isLoading, isFetching, isError } = useGetAdminQuery();

  // how to handle data when it is an object with different properties
  const chartData = data || [];
  const rows = chartData;

  // console.log('🚀 ~ Admin ~ data:', chartData);

  const headerTitle = {
    title: 'ADMINS',
    subTitle: 'Managing admins',
  };
  const theme = useTheme();

  if (!chartData && (isLoading || isFetching)) return 'Loading...';

  if (!chartData && isError) return 'Something went wrong...';

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
            rows={rows || []}
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

            slots={{
              toolbar: CustomToolbar,
              //  toolbar: GridToolbar ,
              //a ColumnMenu ni le para bola
              ColumnMenu: CustomColumnMenu,
            }}
            slotprops={{
              //tampoco para bola
              toolbar: {
                // override default props
                disableDensitySelector: true,
              },
              //niente a fare, un sebillo....
              columnMenu: { background: 'red', counter: rows.length },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Admin;
