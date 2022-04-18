import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import ReportProcess from '../../components/reports/ReportProcess'
import Sidebar from '../../components/sidebar/Sidebar'
import './report.scss'

const Report = () => {
  return (
    <div className='stud-report__main'>
      <Sidebar/>
      <div className="stud-report__container">
        <Navbar/>
        <div className="stud-report__header">
          <div className="stud-report__title">
          </div>
        </div>
        <div className="student-report__process">
          <ReportProcess/>
        </div>
      </div>
    </div>
  )
}

export default Report