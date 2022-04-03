import React from 'react'
import './singleView.scss';
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import SingleForum from '../../../components/forums/single/SingleForum'

const SingleView = () => {
  return (
    <div className='singleForum-main'>
      <Sidebar />
      <div className='singleForum-container'>
        <Navbar />
        <div className='singleForum-header'>
          <h2 className='header-title'>Single View</h2>
        </div>
        <SingleForum/>
      </div>
    </div>
  )
}

export default SingleView