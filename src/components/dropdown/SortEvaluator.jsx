import * as React from 'react';
import './sort-evaluator.scss';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';

const dropdownStyles = makeStyles({
  underline: {
    borderBottom: "0px solid red !important",
    "&:hover": {
      borderBottom: "0px solid rgba(0,0,0,0)"
    }
  }
});

export default function SortEvaluator() {
  const [selectValue, setselectValue] = React.useState('');
  const ddnSt = dropdownStyles();

  const handleChange = (event) => {
    setselectValue(event.target.value);
  };

  return (
    <div className='sort-main'>
      <span className="sort-title">Sort by: </span>
      <FormControl sx={{ m: 1, minWidth: 120, boxShadow: 'none'}}>
        <Select
          value={selectValue}
          onChange={handleChange}
          className={ddnSt.underline}
          sx={{ border: 0, borderColor: 'white', height: 30 }}
          displayEmpty
          disableUnderline
        > 
          <MenuItem value="">All</MenuItem>
          <MenuItem value={'featured'}>Featured</MenuItem>
          <MenuItem value={'recent'}>Recent</MenuItem>
          <MenuItem value={'oldest'}>Oldest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}