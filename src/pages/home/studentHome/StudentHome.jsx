import React from 'react';
import './studHome.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
//pic
import headerImage from '../../../images/studHome/bannerImage.svg';

const StudentHome = () => {
  return (
    <div className='student-main'>
      <Sidebar />
      <div className='student-container'>
        <Navbar />
        <div className='student-content'>
          <div className='content-header'>
            <div className='header-wrapper'>
              <div className='banner-wrapper'>
                <img src={headerImage} alt='Banner' className='banner-img' />
              </div>
              <div className='header-content'>
                <p className='greetings'>Hi, Emanuelle Martin</p>
                <h2 className='welcome'>Welcome to FilinGO!</h2>
                <p className='sub-heading'>
                  creating and filing reports made easy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
