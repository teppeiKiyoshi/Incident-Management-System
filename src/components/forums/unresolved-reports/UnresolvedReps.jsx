import React from 'react';
import './unresolved.scss';
// components
import Navbar from '../../navbar/Navbar';
import Sidebar from '../../sidebar/Sidebar';

const UnresolvedReps = () => {
  return (
    <div className='unresolved-main'>
      <Navbar />
      <div className='unresolved-container'>
        <Sidebar />
        <div className='unresolved-content'>
          <h1 className='title'>Unresolved Reports</h1>
        </div>
      </div>
    </div>
  );
};

export default UnresolvedReps;
