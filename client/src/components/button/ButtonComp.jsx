//Button.jsx

import { Box, Button, useTheme } from '@mui/material';
const ButtonComp = ({ icon, title }) => {
  const theme = useTheme();

  return (
    <>
      <Box>
        <Button
          sx={{
            fontSize: '0.875rem',
            fontWeight: 'bold',
            padding: '0.625rem 1.25rem',
            backgroundColor: theme.palette.secondary[100],
            color: theme.palette.background.alt,
     
          }}
        >
          {icon}
          {title}
        </Button>
      </Box>
    </>
  );
};

export default ButtonComp;

