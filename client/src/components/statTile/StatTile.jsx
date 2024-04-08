//StatTile.jsx
//Parent: Dashboard.jsx
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
const StatTile = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        p='1.25rem 1rem'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: '1 1 100%',
          backgroundColor: theme.palette.background.alt,
          borderRadius: '0.55rem',
          gridColumn: 'span 2',
          gridRow: 'span 1',
        }}
      >
        <FlexBetween>
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            {title}
          </Typography>
          <IconButton
            aria-label=''
            sx={{ color: theme.palette.secondary[300], fontSize: '46px' }}
            onClick={() => {}}
          >
            {icon}
          </IconButton>
        </FlexBetween>
        <Typography
          variant='h3'
          sx={{ color: theme.palette.secondary[200], fontWeight: '600' }}
        >
          {value}
        </Typography>
        <FlexBetween gap='1rem'>
          <Typography
            variant='h5'
            sx={{ color: theme.palette.secondary.light, fontSytle: 'italic' }}
          >
            {increase}
          </Typography>
          <Typography>{description}</Typography>
        </FlexBetween>
      </Box>
    </>
  );
};

export default StatTile;
