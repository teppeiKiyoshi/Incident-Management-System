import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Faqs from '../../components/faqs/Faqs';
import './faqs.scss';

const Logs = () => {
  return (
    <div className='log-main'>
      <Sidebar />
      <div className='log-container'>
        <Navbar />
        <div className='log-content-header'>
          <h2 className='content-title'>Frequently Asked Questions</h2>
        </div>
        <div className='log-content'>
          <Faqs />
        </div>
      </div>
    </div>
  );
};

export default Logs;
