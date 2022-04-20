import React from 'react'
import './completed.scss'
// components
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'

const CompletedReps = () => {
  return (
    <div className="completed-main">
      <Navbar/>
      <div className="completed-container">
        <Sidebar/>
        <div className="completed-content">
          <h1 className="title">Completed Reports</h1>
        </div>
      </div>
    </div>
  )
}

export default CompletedReps