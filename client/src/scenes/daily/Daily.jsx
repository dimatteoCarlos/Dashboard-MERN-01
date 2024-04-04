//Daily.jsx
//nivo library
//Parent: Layout.jsx

import { Box, useTheme } from '@mui/material';
import { useGetSalesQuery } from '../../state/api';
import { useMemo, useState } from 'react';
import Header from '../../components/header/Header';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DailyChart from '../../components/dailyChart/DailyChart';

const Daily = () => {
  const { data, isFetching, isLoading, isError } = useGetSalesQuery();
  const theme = useTheme();
  const headerTitle = {
    title: 'DAILY SALES',
    subTitle: 'Chart of daily sales',
  };

  const [startDate, setStartDate] = useState(new Date('2021-01-02'));
  const [endDate, setEndDate] = useState(new Date('2021-01-30'));

  //------prepare the data for nivo chart---
  const dailyData = data ? data.dailyData : [];

  //dailyData structue: [{date: "2021-01-02", totalSales:Number, ToitalUnits:Number, _id:"string"}...]

  /*Nivo data structure required:
   [{id:'totalSales', color:'color1', data:[{x:'01-02', y:totalSales_Number}, {...}, ...]}, {id:'totalUnits', color:'color2', data:[{x:'date w/o yr', y:totalUnits Num}, {...}, ...]}, ...]
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
    dailyData.forEach((item) => {
      const { date, totalSales, totalUnits } = item;

      //formatting the string item.date
      const dateFormatted = new Date(date);

      //verify if date is in the entered data range
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const xvalue = date.slice(date.indexOf('-') + 1);

        totalSalesCurve.data = [
          ...totalSalesCurve.data,
          { x: xvalue, y: totalSales },
        ];

        totalUnitsCurve.data = [
          ...totalUnitsCurve.data,
          { x: xvalue, y: totalUnits },
        ];
      }
    });

    return [totalSalesCurve, totalUnitsCurve]; // eslint-disable-next-line
  }, [dailyData, startDate, endDate]);

  // console.log('🚀 ~ Daily ~ chartData:', chartData);

  //-----------------------------------
  return (
    <>
      <Box m='1.5rem 2.5rem '>
        <Header {...headerTitle} />
        <Box height='80vh'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                MaxWidth: 'maxContent',
                height: '2rem',
              }}
            >
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              <ReactDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </Box>
          </Box>

          {!dailyData && (isFetching || isLoading) && '...Loading'}

          {!dailyData && isError && 'Something went wrong...'}
          {(!isFetching || !isLoading) && !isError && dailyData && (
            <DailyChart data={chartData} theme={theme}></DailyChart>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Daily;
