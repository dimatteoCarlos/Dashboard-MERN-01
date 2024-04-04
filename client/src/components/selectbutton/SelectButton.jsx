import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';

export default function SelectButton({
  colored,
  setColored,
  mapColors,
  textLabel,
}) {
  const handleChange = (event) => {
    setColored(event.target.value);
  };

  return (
    <Box sx={{ minWidth: '150', mt: '1rem' }}>
      <FormControl sx={{ minWidth: '10%', mt: '1rem' }}>
        <InputLabel id='demo-simple-select-label'>{textLabel}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={colored}
          label={textLabel}
          onChange={handleChange}
        >
          {mapColors.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
