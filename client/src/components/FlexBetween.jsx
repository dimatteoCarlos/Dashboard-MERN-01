//FlexBetween.jsx
//is a styled component

import { Box } from '@mui/material';
const {styled}=require('@mui/system');
//porque no es import {styled}...?
// import { styled } from '@mui/system';

const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign:'center'
});

export default FlexBetween;
