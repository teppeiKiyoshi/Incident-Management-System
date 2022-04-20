import React from 'react';
import './accSettings.scss';
import { TextField } from '@mui/material';

const AccountSettings = () => {
  return (
    <div className='accSettings-wrapper'>
      <div className='accSettings-header'>
        <h1 className='accSettings-title'>Account Settings</h1>
      </div>
      <div className='accSettings-content__wrapper'>
        <div className='accSettings-content__left'>
          <div className='accSettings-left__displayPic'>
            <img
              className='accSettings-left_picture'
              src='https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
              alt=''
            />
            <div className='header-content'>
              <div className='header-details'>
                <h3 className='accSettings-left__userName'>Emanuelle Martin</h3>
                <p className='sub-heading'>
                  Update your photo and personal details.
                </p>
              </div>
              <div className='header-buttons'>
                <button className='accSettings-left__cancel'>Cancel</button>
                <button className='accSettings-left__update'>Update</button>
              </div>
            </div>
          </div>
          <div className='accSettings-left__details'>
            <div className='accSettings-left__details-item'>
              <div className='accSettings-left__details-item-wrapper'>
                <p className='details-item__title'>Full Name</p>
              </div>
              <div className='accSettings-left__input-item-wrapper'>
                <TextField
                  variant='outlined'
                  label='Last Name'
                  sx={{ width: '280px' }}
                  className='text-field'
                />
                <TextField
                  variant='outlined'
                  label='First Name'
                  sx={{ width: '280px' }}
                />
                <TextField
                  variant='outlined'
                  label='M.I.'
                  sx={{ width: '80px' }}
                />
              </div>
            </div>
            <div className='accSettings-left__details-item'>
              <div className='accSettings-left__details-item-wrapper'>
                <p className='details-item__title'>Contact Information</p>
              </div>
              <div className='accSettings-left__input-item-wrapper'>
                <TextField
                  variant='outlined'
                  label='Email Address'
                  sx={{ width: '400px' }}
                />
                <TextField
                  variant='outlined'
                  label='Phone Number'
                  sx={{ width: '260px' }}
                />
              </div>
            </div>
            <div className='accSettings-left__details-item'>
              <div className='accSettings-left__details-item-wrapper'>
                <p className='details-item__title'>Academic Information</p>
              </div>
              <div className='accSettings-left__input-item-wrapper'>
                <TextField
                  variant='outlined'
                  label='Student Number'
                  sx={{ width: '200px' }}
                />
                <TextField
                  variant='outlined'
                  label='College'
                  sx={{ width: '180px' }}
                />
                <TextField
                  variant='outlined'
                  label='Year Level'
                  sx={{ width: '120px' }}
                />
                <TextField
                  variant='outlined'
                  label='Section'
                  sx={{ width: '100px' }}
                />
              </div>
            </div>
            <div className='accSettings-left__details-item'>
              <div className='accSettings-left__details-item-wrapper'>
                <p className='details-item__title'>Password</p>
              </div>
              <div className='accSettings-left__input-item-wrapper'>
                <TextField
                  variant='outlined'
                  label='Old Password'
                  sx={{ width: '210px' }}
                />
                <TextField
                  variant='outlined'
                  label='New Password'
                  sx={{ width: '210px' }}
                />
                <TextField
                  variant='outlined'
                  label='Confirm Password'
                  sx={{ width: '210px' }}
                />
              </div>
            </div>
            <div className='accSettings-left__details-item'>
              <div className='accSettings-left__details-item-wrapper'>
                <p className='details-item__title'>Deactivate Account</p>
              </div>
              <div className='accSettings-left__input-item-wrapper'>
                <button className="deact-btn">Deactivate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
