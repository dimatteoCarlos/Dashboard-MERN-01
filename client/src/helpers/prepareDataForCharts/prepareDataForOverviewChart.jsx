//prepareDataForOverviewchart.jsx

export const prepDataOverviewChart = (chartData, colorSales, colorUnits) => {
  if (!chartData) return [];

  //monthlyData is an array of Objects {month, totalSales, totalUnits, _id}
  const { monthlyData } = chartData;

  //totalized values curves defined as Objects
  const totalSalesCurve = {
    id: 'Total Sales',
    color: colorSales,
    data: [], //[{x:monthN, y:accTotalSalesAtMonthN},]
  };

  const totalUnitsCurve = {
    id: 'Total Units sold',
    color: colorUnits,
    //needs  colors={{datum:'color'}} in OverviewChart.jsx
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
};
