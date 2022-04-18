import React from 'react';
import './process.scss';
import headerImg from '../../images/add-post.svg';

const ReportProcess = () => {
  return (
    <div className='process-main'>
      <div className='process-container'>
        <div className='process-header'>
          <div className='header-content'>
            <h2 className='header-title'>
              Your platform for academic incident reports across BulSU CICT
            </h2>
            <p className='sub-title'>
              Create your report at ease while we do the hard work.
            </p>
          </div>
          <div className='header-image'>
            <img src={headerImg} alt='' className='img-header' />
          </div>
        </div>
        <div className='process-body'>
          <div className='process-one'>
            <div className='body-header'>
              <div className='icon'>
                <p className="icon-title">1</p>
              </div>
              <h3 className='body-title'>
                Please choose an incident to report
              </h3>
            </div>
            <div className='process-types'>

            </div>
          </div>
          <div className="process-two">
          <div className='body-header'>
              <div className='icon'>
                <p className="icon-title">2</p>
              </div>
              <h3 className='body-title'>
                Fill in the form in detail
              </h3>
            </div>
          </div>
          <div className="process-three">
          <div className='body-header'>
              <div className='icon'>
                <p className="icon-title">3</p>
              </div>
              <h3 className='body-title'>
                Review and Submit
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportProcess;
