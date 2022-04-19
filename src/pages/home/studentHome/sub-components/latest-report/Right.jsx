import React from 'react';

const Right = () => {
  return (
    <>
      <div className='right-header'>
        <h2 className='right-header-title'>Latest Report Details</h2>
        <button className='route-btn'>View Report</button>
      </div>
      <div className='right-content'>
        <div className='right'>
          <div className='report'>
            <p className='title'>Report ID</p>
            <p className='content'>123457890</p>
          </div>
          <div className='report'>
            <p className='title'>Date Created</p>
            <p className='content'>April 17, 2022</p>
          </div>
          <div className='report'>
            <p className='title'>Main Concern</p>
            <p className='content'>Subjects with INC</p>
          </div>
        </div>
        <div className='left'>
          <div className='report'>
            <p className='title'>Evaluator</p>
            <p className='content'>Dwain Magracia</p>
          </div>
          <div className='report'>
            <p className='title'>Last Updated</p>
            <p className='content'>April 18, 2022</p>
          </div>
          <div className='report'>
            <p className='title'>Status</p>
            <p className='content'>Under Review</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Right;
