// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/geo
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from './geoData.js';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

//do not leave blank lines

const MyResponsiveChoropleth = ({ data, theme, colored, maxValue = 50 }) => (
  <ResponsiveChoropleth
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
    features={geoData.features}
    margin={{ top: -40, right: 0, bottom: 0, left: 80 }}
    colors={[colored]} //"PiYG" "BrBG" //"BuPu" //"nivo"
    domain={[0, maxValue]}
    unknownColor='#666666'
    label='properties.name'
    valueFormat='.2s'
    projectionType='mercator' //
    projectionScale={140}
    projectionTranslation={[0.45, 0.6]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={false}
    graticuleLineWidth={0.5}
    graticuleLineColor='#dddddd'
    borderWidth={0.35}
    borderColor='#fff'
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
      {
        id: 'gradient',
        type: 'linearGradient',
        colors: [
          {
            offset: 0,
            color: '#000',
          },
          {
            offset: 100,
            color: 'inherit',
          },
        ],
      },
    ]}
    fill={[
      {
        match: {
          id: 'CAN',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'CHN',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'ATA',
        },
        id: 'gradient',
      },
    ]}
    legends={[
      {
        anchor: 'bottom-left',
        direction: 'column',
        justify: true,
        translateX: 0, //20
        translateY: -80, //-100
        itemsSpacing: 10,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: 'left-to-right',
        itemTextColor: theme.palette.secondary[200], //'#444444',
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: theme.palette.background.main, //'#000000',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveChoropleth;
