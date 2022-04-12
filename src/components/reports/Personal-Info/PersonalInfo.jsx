import React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

const PersonalInfo = () => {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField variant='outlined' label='First Name' required />
      <TextField variant='outlined' label='Last Name' required />
      <TextField variant='outlined' label='Student Number' required />
      <TextField variant='outlined' label='Section' required />
      <TextField variant='outlined' label='Year Level' required />
    </Box>
  );
};

export default PersonalInfo;
