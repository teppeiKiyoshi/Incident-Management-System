import React from 'react';
import './cms.scss';
import { TextField } from '@mui/material';

const CMSetting = () => {
  return (
    <div className='cmSettings-wrapper'>
      <div className='cmSettings-content__wrapper'>
        <div className='header-wrapper'>
          <h3 className='setting-title'>Content Management</h3>
        </div>
        <div className='cmSettings-content__left'>
          <div className='cmSettings-left__details'>
            <div className='cmSettings-left__details-item'>
              <div className='cmSettings-left__details-item-wrapper'>
                <p className='details-item__title'>System Logo</p>
              </div>
              <div className='cmSettings-left__input-item-wrapper logo'>
                <label htmlFor='img-upload' className='changeLogo-btn'>
                  <input
                    type='file'
                    id='img-upload'
                    name='img-upload'
                    accept='image/png, image/gif, image/jpeg'
                    style={{ display: 'none' }}
                  />
                  Upload Image
                </label>
              </div>
            </div>
            <div className='cmSettings-left__details-item'>
              <div className='cmSettings-left__details-item-wrapper'>
                <p className='details-item__title'>FAQs Item/s</p>
              </div>
              <div className='cmSettings-left__input-item-wrapper'>
                <TextField
                  variant='outlined'
                  label='Question'
                  sx={{ width: '330px' }}
                />
                <TextField
                  variant='outlined'
                  label='Answer'
                  sx={{ width: '330px' }}
                />
              </div>
            </div>
            <div className='cmSettings-left__details-item last-child'>
              <div className='cmSettings-left__details-item-wrapper'>
                <p className='details-item__title'>Sync Changes</p>
              </div>
              <div className='cmSettings-left__input-item-wrapper logo'>
                <button className='cms-btn'>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSetting;
