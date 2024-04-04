import { useMemo, useState } from 'react';
import Header from '../../components/header/Header';

import SelectButtonUse from '../../components/selectbutton/SelectButtonUse';
import OverviewChart from '../../components/overviewChart/OverviewChart';
import { useGetSalesQuery } from '../../state/api';
import { useTheme, Box } from '@mui/material';

const Overview = () => {
  const theme = useTheme();
  const headerTitle = {
    title: 'OVERVIEW',
    subTitle: 'Overview of general revenue and profit',
  };
  const {
    data: chartData,
    isLoading,
    isError,
    isFetching,
  } = useGetSalesQuery();

  const [view, setView] = useState('sales');

  const options = ['sales', 'units'];

  //------prepare the data for nivo chart---
  const [totalSalesCurve, totalUnitsCurve] = useMemo(() => {
    if (!chartData) return [];

    //monthlyData is an array of Objects {month, totalSales, totalUnits, _id}
    const { monthlyData } = chartData;

    //totalized values curves defined as Objects
    const totalSalesCurve = {
      id: 'Total Sales',
      color: theme.palette.secondary.main,
      data: [], //[{x:monthN, y:accTotalSalesAtMonthN},]
    };
    const totalUnitsCurve = {
      id: 'Total Units sold',
      color: 'tomato', //needs  colors={{datum:'color'}} in OverviewChart.jsx
      // color: theme.palette.secondary[600],
      data: [], //[{x:monthN, y:accTotalUnitsAtMonthN},]
    };

    // reduce to travel each object of the array
    monthlyData.reduce(
      (acc, { month, totalSales, totalUnits }) => {
        // console.log('item:', month, totalSales, 'acc:', acc);
        //--------------for Sales
        const accumulatedSales = acc.sales + totalSales;
        // console.log('accumSales:', accumulatedSales);
        totalSalesCurve.data = [
          ...totalSalesCurve.data,
          { x: month, y: accumulatedSales },
        ];
        // console.log('accumData:', totalSalesCurve);
        //--------------for Units
        const accumulatedUnits = acc.units + totalUnits;

        totalUnitsCurve.data = [
          ...totalUnitsCurve.data,
          { x: month, y: accumulatedUnits },
        ];
        return { sales: accumulatedSales, units: accumulatedUnits }; // just the accumulate sales and units values
      },

      { sales: 0, units: 0 }
    );

    //returns array of objects, where each object contains a curve data
    return [[totalSalesCurve], [totalUnitsCurve]]; // eslint-disable-next-line
  }, [chartData]);
  //-------------------------

  // console.log({ totalSalesCurve });
  // console.log('🚀 ~ Overview ~ chartData:', chartData);

  if (!chartData && (isLoading || isFetching)) return 'Loading...';

  return (
    <>
      <Box m='1.5rem 2.5rem '>
        <Header {...headerTitle} />
        <Box height='80vh'>
          <SelectButtonUse
            state={view}
            setState={setView}
            array={options}
            textLabel={'View'}
          />

          {!chartData && isError && 'Something went wrong...'}

          {!isLoading && !isError && chartData && (
            <OverviewChart
              view={view}
              data={view === options[0] ? totalSalesCurve : totalUnitsCurve}
              theme={theme}
            ></OverviewChart>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Overview;
