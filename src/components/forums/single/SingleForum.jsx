import {React ,useState} from 'react';
import './singleF.scss';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const SingleForum = () => {
  const [open, setOpen] = useState(false);

  const showComment = () => {
    setOpen(!open);
  }
  return (
    <div className='single-main'>
      <div className='single-container'>
        <div className='single-left'>
          <div className='left-header'>
            <img
              src='https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80'
              alt='avatar'
              className='forum-avatar'
            />
            <div className='header-info'>
              <h3 className='header-name'>Emanuelle Martin</h3>
              <small className='sub-heading'>Article Author</small>
            </div>
          </div>
          <div className='left-body'>
            <div className='body-wrapper'>
              <div className='body-title'>
                <h3 className='report-title'>
                  I have problems the concerns the units required per semester
                </h3>
              </div>
              <div className='body-content'>
                <p className='report-content'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <br/>
                <br/>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
              </div>
              <div className="helpful-wrapper">
                <p className="help-title">Was this helpful?</p>
                <small className="help-yes">Yes</small>
                <small className="help-no">No</small>
              </div>
              <div className='body-footer'>
                <div className='footer-header'>
                  <h3 className='comment-title'>
                    Comments <span className='comment-count'>(10)</span>{' '}
                  </h3>
                  { !open && <MdKeyboardArrowDown className='btn-icon' onClick={showComment}/>}
                  { open && <MdKeyboardArrowUp className='btn-icon' onClick={showComment}/>}
                </div>
                { open && <div className='footer-container'>
                  <div className='footer-content'>
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
                        Thanks for the tutorial, I don't think I need to use
                        Google for it anymore! <br/><br/>Congrats on Article Author too! <br/><br/>
                         It's easy to ride down a hill while it's hard to
                        climb the hill back up. Like that, it's easy to
                        malfunction a computer while it's hard to fix it.
                      </p>
                    </div>
                  </div>
                </div>}
                <div className="btn-container">
                  <button className="btn-comment">Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='single-right'>
          <h3 className='right-title'>Forum Article Info</h3>
          <div className='divider'></div>
          <div className='right-info'>
            <p className="evaluator">Evaluated by Dwain Magracia</p>
            <p className='created-date'>Created on February 26, 2022</p>
            <p className='update-date'>Last Updated: April 02, 2022</p>
            <div className='info-tags'>
              <div className='tag-header'>
                <h5 className='tag-title'>Applies to:</h5>
                <div className='tags'>
                  <span className='tag-item'>Incomplete Grades</span>
                  <span className='tag-item'>Irregular Student</span>
                  <span className='tag-item'>Incomplete Subject</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleForum;
