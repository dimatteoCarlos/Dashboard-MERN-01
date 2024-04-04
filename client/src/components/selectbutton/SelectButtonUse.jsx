import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select, Typography } from '@mui/material';

export default function SelectButtonUse({ state, setState, array, textLabel }) {
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <Box sx={{ minWidth: '150', mt: '1rem' }}>
      <FormControl sx={{ minWidth: '10%', mt: '1rem' }}>
        <InputLabel id='demo-simple-select-label'>{textLabel}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={state}
          label={textLabel}
          onChange={handleChange}
        >
          {array &&
            array.map((option) => (
              <MenuItem key={option} value={option}>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {option}
                </Typography>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
