import React from 'react';
import './settings.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import AccountSettings from '../../components/account-settings/AccountSettings';

const Settings = () => {
  return (
    <div className='setting-main'>
      <Sidebar />
      <div className='setting-container'>
        <Navbar />
        <div className="setting-content">
          <AccountSettings/>
        </div>
      </div>
    </div>
  );
};

export default Settings;
