//Breakdown.jsx
//Parent: Layout.jsx

import { Box, useTheme } from '@mui/material';
import { useGetSalesQuery } from '../../state/api';
import Header from '../../components/header/Header';
import BreakdownChart from '../../components/breakdownChart/BreakdownChart';
import { mapColorsBrkd as mapColors } from './mapColorsBrkd';
import SelectButton from '../../components/selectButton/SelectButton';
import { useState } from 'react';

const Breakdown = () => {
  const theme = useTheme();
  const { data, isLoading, isFetching, isError } = useGetSalesQuery();

  const isDashboard = false;

  const headerTitle = {
    title: 'SALES BREAKDOWN',
    subTitle: 'Total sales by categories',
  };

  // Chart data, which must conform to this structure if using the default id and value accessors:

  // Array<{
  //     // must be unique for the whole dataset
  //     id:    string | number,
  //     value: number
  // }>
  // */

  const textLabel = 'Colors';
  const [colored, setColored] = useState('nivo');

  if (isFetching || isLoading || (!isError && !data)) {
    return '...Loading';
  }

  if (!data && isError) {
    return 'Something went wrong!';
  }

  //-----prepared the data for nivo pie chart------
  /*
  salesByCategory structue:  
   {
                "shoes" : 6515,
                "clothing" : 22803,
                "accessories" : 16288,
                "misc" : 19545
        }, 
   */

  /*Nivo data structure required:
   [{id:'category1', color:'color1', value:sales1, label:category1}, {id:'cat2', color:'color2', value:sales2, label:'cat2'}, {...}, ...]  */

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const salesByCategory = data ? data.salesByCategory : {};

  const chartData = Object.entries(salesByCategory).map(([cat, sales], i) => ({
    id: cat,
    color: colors[i],
    label: cat,
    value: sales,
  }));

  // console.log('🚀 ~ chartData ~ chartData:', chartData);

  return (
    <>
      <Box mt='40px' height='80vh'
        border='1px solid red'

      >
        <Box sx={{ m: ' 1.5rem 2.5rem ' }}>
          <Header {...headerTitle} />

          <Box
            // height={isDashboard ? '25rem' : '80%'}
            width={undefined}
            minHeight={isDashboard ? '20rem' : undefined}
            minWidth={isDashboard ? '20rem' : undefined}
            position='relative'
            border='1px solid yellow'
            height={'100%'}
          >
            {/* {!isDashboard ? (
            <SelectButton
              colored={colored}
              setColored={setColored}
              textLabel={textLabel}
              mapColors={mapColors}
            />
          ) : (
            ''
          )} */}

            {/*  !isLoading && !isError && chartData && ( */}

            <BreakdownChart
              data={chartData}
              yearlySalesTotal={data.yearlySalesTotal}
              theme={theme}
              isDashBoard={false}
            ></BreakdownChart>

            {/*  ) */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Breakdown;
