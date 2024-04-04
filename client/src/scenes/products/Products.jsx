//Products.jsx
//Parent:Layout.jsx

import { Typography, useMediaQuery } from '@mui/material';

import Header from '../../components/header/Header';

import { Box } from '@mui/system';
import Tile from '../../components/card/Tile.jsx';
import { useGetProductsQuery } from '../../state/api';

const Products = () => {
  const isNotMobileView = useMediaQuery('(min-width: 1000px)');

  const headerTitle = {
    title: 'PRODUCTS',
    subTitle: 'See your List of Products',
  };

  const {
    data: products,
    isFetching,
    isLoading,
    // isError,
    // error,
  } = useGetProductsQuery();
  // console.log("🚀 ~ Products ~ products:", products)

  return (
    <>
      <Box m='1.5rem 2.5rem '>
        <Header {...headerTitle}></Header>
        {(isFetching || isLoading) && <Typography>...loading</Typography>}
        <Box
          mt='1.25rem'
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0,1fr))'
          justifyContent='space-between'
          rowGap='1.25rem'
          columnGap='1.33%'
          sx={{
            '& > div': {
              gridColumn: isNotMobileView ? undefined : 'span 4',
            },
          }}
        >
          {!isFetching &&
            !isLoading &&
            !!products &&
            products.map((product, indx) => {
              const entriesArr = Object.entries(product);
              // console.log('🚀 ~ Products ~ entriesArr:', entriesArr);
              return <Tile key={product._id} entriesArr={entriesArr} />;
            })}
        </Box>
      </Box>
    </>
  );
};

export default Products;
