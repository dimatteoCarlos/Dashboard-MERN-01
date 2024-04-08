import React from 'react';
import { useTheme } from '@mui/material';
import { Typography } from '@mui/material';
const FooterBrkdwn = () => {
  const theme = useTheme();
  return (
    <>
      <Typography
        mt='1rem'
        p='0 0.6rem'
        fontSize='0.8rem'
        sx={{ color: theme.palette.secondary[200] }}
      >
        Breakdown of real states and information via category for revenue made
        for this year and total sales.
      </Typography>
    </>
  );
};

export default FooterBrkdwn;
