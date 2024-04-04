import React from 'react';
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie';
import { Box, Typography } from '@mui/material';

/*info
Chart data, which must conform to this structure if using the default id and value accessors:

Array<{
    // must be unique for the whole dataset
    id:    string | number,
    value: number
}>
*/

const BreakdownChart = ({
  data,
  theme,
  isDashboard = false,
  yearlySalesTotal,
  colored,
}) => {
  // console.log('🚀 ~ data:', data);
  console.log(colored);

  return (
    <>
      <ResponsivePie
        data={data}
        colors={colored ? { scheme: `${colored}` } : { datum: 'data.color' }}
        // colors={{ datum: 'data.color' }}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 80, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.5}
        // padAngle={0.7}
        // cornerRadius={3}
        activeOuterRadiusOffset={8}
        // colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLinkLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'c',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'go',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'python',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'scala',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'lisp',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'elixir',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'javascript',
            },
            id: 'lines',
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      {
        <Box
          position='absolute'
          top='50%'
          left='50%'
          color={theme.palette.secondary[400]}
          textAlign='center'
          pointerEvents='none'
          sx={{
            transform: isDashboard
              ? 'translate(-75%, -170%)'
              : 'translate(-50%, -100%)',
          }}
        >
          <Typography variant='h6'>
            {!isDashboard && 'Total:'} ${yearlySalesTotal}
          </Typography>
        </Box>
      }
    </>
  );
};

export default BreakdownChart;
