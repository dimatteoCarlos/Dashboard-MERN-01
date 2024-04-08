//OverviewChart.jsx
//nivo library
//Parent: Overview.jsx

import { ResponsiveLine } from '@nivo/line';

const OverviewChart = ({ view, data, theme, isDashboard = false }) => {
  // console.log('🚀 ~ OverviewChart ~ data:', data);

  return (
    <ResponsiveLine
      data={data}
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
      colors={{datum:'color'}}
      // margin={{ top: 20, right: 110, bottom: 150, left: 90 }}
      
      margin={isDashboard? { top: 70, right: 90, bottom: 90, left: 100 }:{ top: 20, right: 110, bottom: 150, left: 90 } }

      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      yFormat=' >-.2f'
      curve='catmullRom'
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },

        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? '' : 'Month',
        legendOffset: 36,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickValues: isDashboard?5:10,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ''
          : `Total ${view === 'sales' ? 'Revenue' : 'Units'} per Year`,
        legendOffset: -70,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 20,
                translateY: -10,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
