import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './logs.scss'

const Logs = () => {
  return (
    <div className='log-main'>
      <Sidebar/>
      <div className="log-container">
        <Navbar/>
        THIS IS THE LOGS PAGE
      </div>
    </div>
  )
}

export default Logs