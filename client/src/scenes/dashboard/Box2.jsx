import { Box } from '@mui/material';
import BreakdownChart from '../../components/breakdownChart/BreakdownChart';

const Box2 = (
  isDashboard,
  statLoading,
  statError,
  salesByCategory,
  yearlySalesTotal,
  colored
) => {
  console.log(
    'desde Box2:',
    isDashboard,
    statLoading,
    statError,
    salesByCategory,
    yearlySalesTotal,
    colored
  );

  return (
    <>
      <Box
        height={isDashboard ? '25rem' : '80%'}
        width={undefined}
        minHeight={isDashboard ? '20rem' : undefined}
        minWidth={isDashboard ? '20rem' : undefined}
        position='relative'
        border='1px solid yellow'
      >
        {!statLoading && !statError && salesByCategory && (
          <BreakdownChart
            data={salesByCategory}
            yearlySalesTotal={yearlySalesTotal}
            isDashBoard={true}
            colored={colored}
          ></BreakdownChart>
        )}
      </Box>
    </>
  );
};

export default Box2;
