import React from 'react';
import './settings.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import AccountSettings from '../../components/account-settings/AccountSettings';
import CMSetting from '../../components/cm-settings/CMSetting'

const Settings = () => {
  return (
    <div className='setting-main'>
      <Sidebar />
      <div className='setting-container'>
        <Navbar />
        <div className="setting-content">
          <div className="content-wrapper">
            <h2 className='content-title'>Settings</h2>
          </div>
          <AccountSettings/>
          <CMSetting/>
        </div>
      </div>
    </div>
  );
};

export default Settings;
