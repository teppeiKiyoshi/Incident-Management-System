import React from 'react';
import './forums.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import ForumsTable from '../../components/forums/ForumsTable';
//MUI

const Forums = () => {
  return (
    <div className='forums-main'>
      <Sidebar />
      <div className='forums-container'>
        <Navbar />
        <div className='forums-header'>
          <h2 className='main-title'>Forums</h2>
        </div>
        <ForumsTable />
        <ForumsTable />
        <ForumsTable />
        <ForumsTable />
        <ForumsTable />
        <ForumsTable />
      </div>
    </div>
  );
};

export default Forums;
