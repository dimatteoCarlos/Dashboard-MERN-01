//UsersByGeography.jsx
//Parent:App.js
import { Box } from '@mui/material';
import Header from '../../components/header/Header.jsx';
import { useTheme } from '@mui/material';

// import MyResponsiveChoropleth from '../../components/geographyChart/GeographyChart.jsx';

import MyResponsiveChoropleth from '../../components/geographyChart/MyResponsiveChoropleth.jsx';

import { useGetUsersByGeographyQuery } from '../../state/api.js';
import { useState } from 'react';
import { mapColors } from './mapColors.js';
import SelectButton from '../../components/selectbutton/SelectButton';

const UsersByGeography = () => {
  const [colored, setColored] = useState('BuPu');
  const theme = useTheme();

  const { data, isLoading } = useGetUsersByGeographyQuery();

  const chartData = data || {};
  const maxValue = 60;
  const textLabel = 'Colors Range';

  console.log('🚀 ~ UsersByGeography ~ :', chartData);

  return (
    <>
      <Box
        // height='100%'
        m='1.25rem 2.5rem'
      >
        <Header
          title='USERS BY GEOGRAPHY'
          subTitle='Find where your stakeholders are located'
        />

        <SelectButton
          colored={colored}
          setColored={setColored}
          textLabel={textLabel}
          mapColors={mapColors}
        />

        <Box
          mt='2.5rem'
          height='80vh'
          borderRadius='0.25rem'
          border={`1px solid ${theme.palette.secondary[200]}`}
        >
          {!isLoading && chartData ? (
              <MyResponsiveChoropleth
                data={chartData}
                theme={theme}
                colored={colored}
                maxValue={maxValue}
              />
          ) : (
            <>Loading...</>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UsersByGeography;
