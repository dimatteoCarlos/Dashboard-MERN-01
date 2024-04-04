//Monthly.jsx
//nivo library
//Parent: Layout.jsx

import { Box, useTheme } from '@mui/material';
import { useGetSalesQuery } from '../../state/api';
import { useMemo } from 'react';
import Header from '../../components/header/Header';
import MonthlyChart from '../../components/monthlyChart/MonthlyChart';

const Monthly = () => {
  const { data, isFetching, isLoading, isError } = useGetSalesQuery();
  const theme = useTheme();
  const headerTitle = {
    title: 'MONTHLY SALES',
    subTitle: 'Chart of Monthly sales',
  };

  //------prepare the data for nivo chart---
  const MonthlyData = data ? data.monthlyData : [];
  console.log("🚀 ~ Monthly ~ MonthlyData:", MonthlyData)

  //MonthlyData structure: [{month: "January", totalSales:Number, ToitalUnits:Number, _id:"string"}...]

  /*Nivo data structure required:
   [{id:'totalSales', color:'color1', data:[{x:'January', y:totalSales_Number}, {...}, ...]}, {id:'totalUnits', color:'color2', data:[{x:month, y:totalUnits Num}, {...}, ...]}, ...]
  */

  const totalSalesCurve = {
    id: 'Total Sales',
    color: 'tomato',
    // color: theme.palette.secondary.main,
    data: [],
  };

  const totalUnitsCurve = {
    id: 'Total Units',
    color: theme.palette.secondary[600],
    data: [],
  };

  const chartData = useMemo(() => {
    MonthlyData.forEach((item) => {
      const { month, totalSales, totalUnits } = item;

      //formatting the data

        const xvalue = month;

        totalSalesCurve.data = [
          ...totalSalesCurve.data,
          { x: xvalue, y: totalSales },
        ];

        totalUnitsCurve.data = [
          ...totalUnitsCurve.data,
          { x: xvalue, y: totalUnits },
        ];
      
    });

    return [totalSalesCurve, totalUnitsCurve]; // eslint-disable-next-line
  }, [MonthlyData]);

  console.log('🚀 ~ Monthly ~ chartData:', chartData);

  //-----------------------------------
  return (
    <>
      <Box m='1.5rem 2.5rem '>
        <Header {...headerTitle} />
        <Box height='80vh'>

          {!MonthlyData && (isFetching || isLoading) && '...Loading'}

          {!MonthlyData && isError && 'Something went wrong...'}
          {(!isFetching || !isLoading) && !isError && MonthlyData && (
            <MonthlyChart data={chartData} theme={theme}></MonthlyChart>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Monthly;
