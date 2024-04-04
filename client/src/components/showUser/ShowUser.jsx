import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '../FlexBetween';

const ShowUser = ({
  userImage,
  userName,
  userOccupation,
  textAlign,
  textTransform,
  gap,
}) => {
  const theme = useTheme();
  return (
    <>
      <FlexBetween
        gap={gap}
        // border='1px solid yellowgreen'
      >
        <Box
          component='img'
          src={userImage}
          height='1.5rem'
          width='1.5rem'
          sx={{
            objectFit: 'cover',
            borderRadius: '50%',
            src: { userImage },
            height: '2.0rem',
            width: '2.0rem',
          }}
        ></Box>

        <Box textAlign={textAlign}>
          <Typography
            fontSize='0.75rem'
            fontWeight='bold'
            sx={{
              color: theme.palette.secondary[100],
              textTransform: { textTransform },
            }}
          >
            {userName}
          </Typography>
          <Typography
            fontSize='0.65rem'
            sx={{
              color: theme.palette.secondary[200],
              textTransform: { textTransform },
            }}
          >
            {userOccupation}
          </Typography>
        </Box>
      </FlexBetween>
    </>
  );
};

export default ShowUser;


