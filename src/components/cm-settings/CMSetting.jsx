import React, { useState } from 'react';
import './cms.scss';
import { TextField } from '@mui/material';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const CMSetting = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='cmSettings-wrapper'>
      <div className='cmSettings-content__wrapper'>
        <div className='header-wrapper'>
          <h3 className='setting-title'>Content Management</h3>
          {isOpen ? (
            <MdKeyboardArrowUp
              className='arrow-btn'
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <MdKeyboardArrowDown
              className='arrow-btn'
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
        {isOpen && (
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
              <div className='cmSettings_add-btn'>
                <button className='add-btn'>+ Add New</button>
              </div>
              {/* copy from here to duplicate entire row for FAQs item fields */}
              <div className='cmSettings-left__details-item'>
                <div className='cmSettings-left__details-item-wrapper'>
                  <p className='details-item__title'>FAQs Item/s</p>
                </div>
                <div className='cmSettings-left__input-item-wrapper'>
                  <TextField
                    variant='outlined'
                    label='Question'
                    sx={{ width: '280px' }}
                  />
                  <TextField
                    variant='outlined'
                    label='Answer'
                    sx={{ width: '280px' }}
                  />
                  <button className='remove-btn'>Remove</button>
                </div>
              </div>
              {/* copy to here to duplicate entire row for FAQs item fields */}
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
        )}
      </div>
    </div>
  );
};

export default CMSetting;
