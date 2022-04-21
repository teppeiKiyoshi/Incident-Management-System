import React from 'react';

const ItemComments = () => {
  return (
    <div className='footer-content-comment'>
      <div className='content-header'>
        <img
          src='https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80'
          alt='avatar'
          className='comment-avatar'
        />
        <div className='header-info'>
          <h4 className='author'>Eman Martin</h4>
          <p className='reply-date'>Replied on March 3, 2022</p>
        </div>
      </div>
      <div className='footer-body'>
        <p className='comment-info'>
          Thanks for the tutorial, I don't think I need to use Google for it
          anymore! <br />
          <br />
          Congrats on Article Author too! <br />
          <br />
          It's easy to ride down a hill while it's hard to climb the hill back
          up. Like that, it's easy to malfunction a computer while it's hard to
          fix it.
        </p>
      </div>
    </div>
  );
};

export default ItemComments;
