import { useGetDashboardStatsQuery, useGetSalesQuery } from '../../state/api';

import { DownloadOutlined } from '@mui/icons-material';

import { transactionsHeaderColumns as columns } from '../transactions/transactionsHeaderColumns';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import StatTile from '../../components/statTile/StatTile';
import ButtonComp from '../../components/button/ButtonComp';
import Header from '../../components/header/Header';
import { statBoxConfig1, statBoxConfig2 } from './statBoxConfig';
import OverviewChart from '../../components/overviewChart/OverviewChart';

//----------functions-------
import { prepDataOverviewChart } from '../../helpers/prepareDataForCharts/prepareDataForOverviewChart';
import { DataGrid } from '@mui/x-data-grid';

import FooterBrkdwn from './FooterBrkdwn.jsx';
import BreakDown from '../breakdown/BreakDownDashboard';

const Dashboard = () => {
  //--------getting and preparing data
  //-----preparing data for dashboard stats
  const theme = useTheme();
  const isDashboard = true;

  const {
    isFetching: statFetching,
    isLoading: statLoading,
    isError: statError,
    data: statData,
  } = useGetDashboardStatsQuery();

  const statBoxData = statData ? statData : {};

  //-----Prepare Data for OverviewChart------
  const {
    data: salesData,
    isLoading: salesLoading,
    isError: salesError,
    isFetching: salesFetching,
  } = useGetSalesQuery();

  const view = 'sales';
  const colorSales = theme.palette.secondary.main,
    colorUnits = 'tomato';

  const [totalSalesCurve] = prepDataOverviewChart(
    salesData,
    colorSales,
    colorUnits
  );

  //-----Prepare Data for Breakdown chart---------
  const colored = 'nivo';
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  //-----------------------
  const isNonMediumScreen = useMediaQuery('(min-width: 1200px)');
  const headerTitle = {
    Title: 'DASHBOARD',
    subTitle: 'Welcome to your dashboard',
  };

  return (
    <>
      <Box m='1.5rem 2.5rem'>
        <FlexBetween>
          <Header {...headerTitle}></Header>

          <ButtonComp
            icon={<DownloadOutlined sx={{ mr: '0.875rem' }} />}
            title={'DOWNLOAD REPORTS'}
          />
        </FlexBetween>

        <Box
          mt='1.25rem'
          display='grid'
          gridTemplateColumns='repeat(12, 1fr)'
          gridAutoRows='10rem'
          gap='1.25rem'
          sx={{
            '& > div': {
              gridColumn: isNonMediumScreen ? undefined : 'span 12',
            },
          }}
        >
          {/* ROW 1 */}

          {statBoxConfig1.map((item, indx) => (
            <StatTile key={indx} {...item} value={statBoxData[item.value]} />
          ))}

          <Box
            gridColumn='span 8'
            gridRow='span 2'
            backgroundColor={theme.palette.background.alt}
            // p='1rem'
            borderRadius='0.55rem'
          >
            {!salesLoading && !salesFetching && !salesError && salesData && (
              <OverviewChart
                view={view}
                data={totalSalesCurve}
                theme={theme}
                isDashboard={true}
              ></OverviewChart>
            )}
          </Box>

          {statBoxConfig2.map((item, indx) => (
            <StatTile key={indx} {...item} value={statBoxData[item.value]} />
          ))}

          {/* ROW 2 */}

          <Box
            gridColumn='span 8'
            gridRow='span 3'
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                borderRadius: '5rem',
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
                backgroundColor: theme.palette.background.alt,
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
            {!statLoading && !statFetching && !statError && statBoxData && (
              <DataGrid
                loading={statLoading || !statBoxData}
                getRowId={(row) => row._id}
                rows={(statData && statBoxData.transactions) || []}
                columns={columns}
              />
            )}
          </Box>

          <Box
            gridColumn='span 4'
            gridRow='span 3'
            backgroundColor={theme.palette.background.alt}
            p='1.5rem'
            borderRadius='0.55rem'
          >
            <Typography
              variant='h6'
              sx={{ color: theme.palette.secondary[100] }}
            >
              Sales By Category
            </Typography>

            <Box
              height={isDashboard ? '25rem' : '90%'}
              // width={undefined}
              minHeight={isDashboard ? '20rem' : undefined}
              minWidth={isDashboard ? '20rem' : undefined}
              position='relative'
              border='1px solid yellow'
            >
              <BreakDown
                isDashboard='true'
                colored={isNonMediumScreen ? 'nivo' : ''}
                colors={colors}
              />
            </Box>

            <FooterBrkdwn />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
