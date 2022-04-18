import './sidebar.scss';
import Time from './Time';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavLink, useNavigate } from 'react-router-dom';
import sidebarLogo from '../../images/logos/logoTxt.png'; 

const Sidebar = () => {
  const navigate = useNavigate();

  const route_Mainpage = () => {
    let path = '/';
    navigate(path);
  };

  const route_toDashboard = () => {
    let path = '/dashboard';
    navigate(path);
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      background: isActive ? 'black' : 'pink',
      textDecoration: 'none',
    };
  };

  return (
    <div className='sidebar-main'>
      <div className='sidebar-top'>
        <span className='sidebar-logo' onClick={route_toDashboard}>
          <img src={sidebarLogo} alt='Filingo' className='img-logo'/>
        </span>
      </div>
      <div className='sidebar-header'>
        <div className='header-wrapper'>
          <img
            src='https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80'
            alt='avatar'
            className='sidebar-avatar'
          />
          <span className='header-name'>Eman Martin</span>
        </div>
      </div>
      <div className='sidebar-center'>
        <ul>
          <p className='title'>MAIN</p>
          <NavLink to='/dashboard' style={navLinkStyles}>
            <div className='sidebar-dashboard'>
              <li>
                <DashboardIcon className='sidebar-icons' />
                <span className='sidebar-name'>Dashboard</span>
              </li>
            </div>
          </NavLink>
          <p className='title'>PEOPLE</p>
          <NavLink to='/users' style={navLinkStyles}>
            <div className='sidebar-user'>
              <li>
                <PeopleIcon className='sidebar-icons' />
                <span className='sidebar-name'>Users</span>
              </li>
            </div>
          </NavLink>
          <NavLink to='/evaluators' style={navLinkStyles}>
            <div className='sidebar-evaluator'>
              <li>
                <PersonAddIcon className='sidebar-icons' />
                <span className='sidebar-name'>Add Evaluators</span>
              </li>
            </div>
          </NavLink>
          <p className='title'>SERVICES</p>
          <NavLink to='/forums' style={navLinkStyles}>
            <div className='sidebar-forum'>
              <li>
                <QuestionAnswerIcon className='sidebar-icons' />
                <span className='sidebar-name'>Forums</span>
              </li>
            </div>
          </NavLink>
          <NavLink to='/logs' style={navLinkStyles}>
            <div className='sidebar-log'>
              <li>
                <PsychologyIcon className='sidebar-icons' />
                <span className='sidebar-name'>FaQs</span>
              </li>
            </div>
          </NavLink>
          <p className='title'>TOOLS</p>
          <NavLink to='/settings' style={navLinkStyles}>
            <div className='sidebar-setting'>
              <li>
                <SettingsIcon className='sidebar-icons' />
                <span className='sidebar-name'>Settings</span>
              </li>
            </div>
          </NavLink>
          <div className='sidebar-logout' onClick={route_Mainpage}>
            <li>
              <ExitToAppIcon className='sidebar-icons' />
              <span className='sidebar-name' onClick={route_Mainpage}>
                Logout
              </span>
            </li>
          </div>
        </ul>
      </div>
      <div className='sidebar-bottom'>
        <div className='time-container'>
          <Time />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
