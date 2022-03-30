import React from 'react';
import './evaluator-card.scss';
//MUI
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const EvaluatorCard = () => {
  return (
    <div className='evalcard-main'>
      <div className='card-wrapper'>
        <div className='card-header'></div>
        <div className='avatar-wrapper'>
          <img
            src='https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80'
            alt='avatar'
            className='card-avatar'
          />
        </div>
        <div className='card-body'>
          <div className='card-name'>
            <h3>Emanuelle Martin</h3>
            <h4>Senior Evaluator</h4>
            <small>martineman@gmail.com</small>
            <div className="divider"></div>
            <p>Last Seen Active: 4h ago</p>
            <p>Last Activity: Commented on Forums</p>
          </div>
        </div>
        <div className='card-bottom'>
          <div className='card-action'>
            <Tooltip title='View Evaluator' arrow>
              <IconButton>
                <RemoveRedEyeOutlinedIcon
                  style={{ textTransform: 'capitalize' }}
                  className='action-btn'
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete User' arrow>
              <IconButton>
                <MessageOutlinedIcon style={{ textTransform: 'capitalize' }} className='action-btn'/>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorCard;
