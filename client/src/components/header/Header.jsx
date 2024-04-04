import React from 'react';
import FlexBetween from '../FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';

const Header = ({ title, subTitle }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
        
          // ml: '2.0rem',
        }}
      >
        <Typography
          variant='h3'
          color={theme.palette.secondary[100]}
          fontWeight='bold'
          sx={{ mb: '0.3125rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant='h5'
          color={theme.palette.secondary[300]}
          fontWeight='normal'
        >
          {subTitle}
        </Typography>
      </Box>
    </>
  );
};

export default Header;
