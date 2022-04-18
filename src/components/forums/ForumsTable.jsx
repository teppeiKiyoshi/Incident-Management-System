import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForumsTable = () => {
  const navigate = useNavigate();
  const to_singlePage = () => {
    let path = '/forums/id';
    navigate(path);
  }

  return (
    <>
      <div className='grid-main'>
        <div className='grid-items'>
          <span className='report-type'>Incomplete Grades</span>
          <h3 className='title' onClick={to_singlePage} >
            What is device encryption, and should I use it?
          </h3>
          <span className='sub-title'>
            Last comment 4 hours 54 minutes ago | Created February 26, 2022 by
            LightJack05
          </span>
          <p className='report-detail'>
            Technical Difficulty: What is device encryption? Device encryption is
            a feature that exists in Windows 10 & 11. It is available on PCs
            that are connected to the internet and signed into a Microsoft
            Account. Your device needs to have a TPM and Secure Boot
          </p>
        </div>
        <div className='grid-function'>
          <div className='helpful'>
            <p>12</p>
            <small>Helpful</small>
          </div>
          <div className='comments'>
            <p>19</p>
            <small>Comments</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumsTable;
