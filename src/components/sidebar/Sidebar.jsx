import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
//for dark mode
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

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
      <hr />
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
      <div className='sidebar-bottom'>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: 'LIGHT' })}
        ></div>
        <div
          className='colorOption'
          onClick={() => dispatch({ type: 'DARK' })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
