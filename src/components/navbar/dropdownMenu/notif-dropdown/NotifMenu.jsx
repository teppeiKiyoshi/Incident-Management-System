import React from 'react';
import './notifs.scss';
import { ReactComponent as Password } from '../../../../icons/password.svg';

function NotifItems() {
  return (
    <div className='notifs-item'>
      <div className='icon'>
        <Password className='notifs-icon' />
      </div>
      <div className='details'>
        <p className='notifs-details'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.Lorem, ipsum
          dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className='status'>
        <div className='notifs-status'></div>
      </div>
    </div>
  );
}

const NotifMenu = () => {
  return (
    <div className='notifs-main'>
      <div className='notifs-container'>
        <div className='notifs-header'>
          <h2 className='header-title'>Notifications</h2>
        </div>
        <div className='notifs-filter'>
          <button className='all-btn'>All</button>
          <button className='unread-btn'>Unread</button>
        </div>
        <div className='notifs-content'>
          <NotifItems />
          <NotifItems />
          <NotifItems />
          <NotifItems />
          <NotifItems />
        </div>
        
      </div>
    </div>
  );
};

export default NotifMenu;
