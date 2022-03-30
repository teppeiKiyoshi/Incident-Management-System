import React from 'react';
import './settings.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const Settings = () => {
  return (
    <div className='setting-main'>
      <Sidebar />
      <div className='setting-container'>
        <Navbar />
      </div>
    </div>
  );
};

export default Settings;
