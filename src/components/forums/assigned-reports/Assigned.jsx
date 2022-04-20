import React from 'react';
import './assigned.scss';
// components
import Navbar from '../../navbar/Navbar';
import Sidebar from '../../sidebar/Sidebar';

const Assigned = () => {
  return (
    <div className='assigned-main'>
      <Navbar />
      <div className='assigned-container'>
        <Sidebar />
        <div className='assigned-content'>
          <h1 className='title'>Assigned Reports</h1>
        </div>
      </div>
    </div>
  );
};

export default Assigned;
