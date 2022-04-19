import React from 'react';

const Left = () => {
  return (
    <>
      <div className='left-header'>
        <h2 className='left-header-title'>Latest Notifications</h2>
        <button className='route-btn'>View All</button>
      </div>
      <div className='left-content'>
        <div className='item-wrapper'>
          <div className='img-wrapper'>
            <img
              src='https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80'
              alt='avatar'
              className='item-avatar'
            />
          </div>
          <div className='item-content'>
            <p className='eval-name'>Eman Martin</p>
            <p className='notif-details'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              veritatis? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Rem, veritatis?
            </p>
          </div>
          <div className='item-detail'>
            <p className='time'>09:32 AM</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Left;
