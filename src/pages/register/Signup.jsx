import React from 'react';
import './signup.scss';
import signupIcon from '../../images/signup_img.svg';
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

const Signup = () => {
  const navigate = useNavigate();

  const routeChange = () => {
    let path = '/login';
    navigate(path);
  };
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
    <div className='signup-main'>
      <div className='signup-container'>
        <div className='signup-wrapper'>
          <h1 className='signup-title'>Sign Up</h1>
          <p className='sub-title'>Let's get you started!</p>
          <form className='signup-form'>
            <div className='name_field'>
              {/* last name ipnut field */}
              <TextField
                required
                id='signup_lName'
                label='Last Name'
                sx={{ mt: 1, mb: 2, width: '30ch' }}
              />
              {/* first name ipnut field */}
              <TextField
                required
                id='signup_fName'
                label='First Name'
                sx={{ mt: 1, mb: 2, width: '30ch' }}
              />
              <TextField
                id='signup_lName'
                label='M.I.'
                sx={{ width: '10ch', mt: 1, mb: 2 }}
              />
            </div>
            <div className='secondRow_field'>
              {/* email ipnut field */}
              <TextField
                required
                id='signup_email'
                label='Email'
                sx={{ mt: 1, mb: 2, width: '45ch' }}
              />
              {/* email ipnut field */}
              <TextField
                required
                id='signup_sNumber'
                label='Student Number'
                sx={{ mt: 1, mb: 2, width: '25ch' }}
              />
            </div>
            <div className="other-field">
            <TextField
                required
                id='signup_yearLvl'
                label='Year Level'
                sx={{ mt: 1, mb: 2, width: '15ch' }}
              />
              <TextField
                required
                id='signup_section'
                label='Section'
                sx={{ mt: 1, mb: 2, width: '15ch' }}
              />
              
              <TextField
                id='signup_contact'
                label='Phone Number'
                sx={{ mt: 1, mb: 2, width: '20ch' }}
              />
              <TextField
                id='signup_tel_no'
                label='Telephone Number'
                sx={{ mt: 1, mb: 2, width: '20ch' }}
              />
            </div>
            <div className='passwords-field'>
              {/* password input field */}
              <FormControl
                sx={{ mt: 1, mb: 2, width: '35ch' }}
                variant='outlined'
                required  
              >
                <InputLabel htmlFor='password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='signup_password'
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
              </FormControl>
              {/* confirm password input field */}
              <FormControl
                sx={{ mt: 1, mb: 2, width: '35ch' }}
                variant='outlined'
                required 
              >
                <InputLabel htmlFor='confirm-password'>
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id='confirm_password'
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Confirm Password'
                />
              </FormControl>
            </div>
            <p className='to-signin' onClick={routeChange}>
              Already have an account?
            </p>
            <button className='signup-btn' onClick={routeChange}>Sign In</button>
          </form>
        </div>
        <div className='img-wrapper'>
          <img src={signupIcon} alt='' className='signup_img' />
        </div>
      </div>
    </div>
  );
};

export default Signup;
