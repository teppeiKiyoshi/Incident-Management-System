import './sidebar.scss';
import Time from './Time';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  function handleActive(){
    console.log('clicked');
  }
  
  return (
    <div className='sidebar-main'>
      <div className='sidebar-top'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='sidebar-logo active'>Incident Project</span>
        </Link>
      </div>
      <div className="sidebar-header">
        <div className="header-wrapper">
        <img src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80" alt="avatar" className='sidebar-avatar' />
          <span className="header-name">Eman Martin</span>
        </div>
      </div>
      <div className='sidebar-center'>
        <ul>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div onClick={handleActive} className='sidebar active'>
              <li>
                <DashboardIcon className='sidebar-icons active' />
                <span className='sidebar-name active'>Dashboard</span>
              </li>
            </div>
          </Link>
          <Link to='/users' style={{ textDecoration: 'none' }}>
            <div onClick={handleActive} className='sidebar'>
              <li>
                <PeopleIcon className='sidebar-icons' />
                <span className='sidebar-name'>Users</span>
              </li>
            </div>
          </Link>
          <div onClick={handleActive} className='sidebar'>
            <li>
              <PersonAddIcon className='sidebar-icons' />
              <span className='sidebar-name'>Add Evaluators</span>
            </li>
          </div>
          <div onClick={handleActive} className='sidebar'>
            <li>
              <QuestionAnswerIcon className='sidebar-icons' />
              <span className='sidebar-name'>Forums</span>
            </li>
          </div>
          <div onClick={handleActive} className='sidebar'>
            <li>
              <PsychologyIcon className='sidebar-icons' />
              <span className='sidebar-name'>Logs</span>
            </li>
          </div>
          <div onClick={handleActive} className='sidebar'>
            <li>
              <SettingsIcon className='sidebar-icons' />
              <span className='sidebar-name'>Settings</span>
            </li>
          </div>
          <li>
            <ExitToAppIcon className='sidebar-icons' />
            <span className='sidebar-name'>Logout</span>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <div className="time-container">
            <Time />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
