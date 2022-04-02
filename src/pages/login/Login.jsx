import React from 'react';
import './forms.scss';
import loginIcon from '../../images/login_img.svg';
//MUI
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const routeChange = () =>{ 
    let path = '/signup'; 
    navigate(path);
  }
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='login-main'>
      <div className='login-container'>
        <div className='login-wrapper'>
          <h1 className='login-title'>Sign In</h1>
          <p className='sub-title'>Welcome back!</p>
          <form className='login-form'>
            {/* email ipnut field */}
            <TextField required id='login_email' label='Email' fullWidth/>
            {/* password input field */}
            <FormControl sx={{ mt: 2, mb:1,  width: '32ch' }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                id='login_password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
            <small className='forgot-pass'>Forgot password?</small>
            <p className='to-signup' onClick={routeChange}>Don't have an account yet?</p>
            <button className='login-btn'>Sign In</button>
          </form>
        </div>
        <div className='img-wrapper'>
          <img src={loginIcon} alt='' className='login_img' />
        </div>
      </div>
    </div>
  );
};

export default Login;
