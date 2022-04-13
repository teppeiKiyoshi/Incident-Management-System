import React from 'react'
import './accSettings.scss'

const AccountSettings = () => {
  return (
    <div className='accSettings-wrapper'>
      <div className='accSettings-header'>
        <h1 className='accSettings-title'>Account Settings</h1>
      </div>
      <div className="accSettings-content__wrapper">
        <div className="accSettings-content__left">
          <div className="accSettings-left__displayPic">
            <img className='accSettings-left_picture' src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
            <h3 className="accSettings-left__userName">
              Emanuelle Martin
            </h3>
          </div>
          <div className="accSettings-left__functions">
            <div className="accSettings-left__item">
              <ul className='left-list'>
                <div className="list-item">
                <li className='left-list__item'>Account</li>
                </div>
                <div className="list-item">
                <li className='left-list__item'>Password</li>
                </div>
                <div className="list-item">
                <li className='left-list__item'>Notifications</li>
                </div>
                <div className="list-item">
                <li className='left-list__item'>Deactivate</li>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="accSettings-content__right">
          <div className="accSettings-right__contents">
            <h2>right side</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings