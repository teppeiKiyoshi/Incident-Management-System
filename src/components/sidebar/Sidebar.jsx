import './sidebar.scss';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//components
import Time from './Time';
//icons and pictures
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import sidebarLogo from '../../images/logos/logoTxt.png';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const Sidebar = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
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
      textDecoration: 'none',
    };
  };

  const noPropagation = (e) => e.stopPropagation();

  return (
    <div className='sidebar-main'>
      <div className='sidebar-top'>
        <span className='sidebar-logo' onClick={route_toDashboard}>
          <img src={sidebarLogo} alt='Filingo' className='img-logo' />
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
              <li className='sidebar-item'>
                <DashboardIcon className='sidebar-icons' />
                <span className='sidebar-name'>Dashboard</span>
              </li>
            </div>
          </NavLink>
          <p className='title'>PEOPLE</p>
          <NavLink to='/users' style={navLinkStyles}>
            <div className='sidebar-user'>
              <li className='sidebar-item'>
                <PeopleIcon className='sidebar-icons' />
                <span className='sidebar-name'>Users</span>
              </li>
            </div>
          </NavLink>
          <NavLink to='/evaluators' style={navLinkStyles}>
            <div className='sidebar-evaluator'>
              <li className='sidebar-item'>
                <PersonAddIcon className='sidebar-icons' />
                <span className='sidebar-name'>Evaluators</span>
              </li>
            </div>
          </NavLink>
          <p className='title'>SERVICES</p>
          <NavLink to='/forums' style={navLinkStyles}>
            <div className='sidebar-forum'>
              <span className='sidebar-items collapsible'>
                <QuestionAnswerIcon className='sidebar-icons' />
                <span className='sidebar-name'>Forums</span>
                <span
                  className='close'
                  onClick={() => setSubMenuOpen(!subMenuOpen)}
                >
                  {!subMenuOpen ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowUp />
                  )}
                </span>

                {subMenuOpen && (
                  <ul className='collapse__menu'>
                    <NavLink
                      to='/forums/completed-reports'
                      style={navLinkStyles}
                      onClick={noPropagation}
                    >
                      <li className='collapse__sublink'>
                        Completed
                      </li>
                    </NavLink>
                    <NavLink
                      to='/forums/assigned-reports'
                      style={navLinkStyles}
                      onClick={noPropagation}
                    >
                      <li className='collapse__sublink'>Assigned</li>
                    </NavLink>
                    <NavLink
                      to='/forums/unresolved-reports'
                      style={navLinkStyles}
                      onClick={noPropagation}
                    >
                      <li className='collapse__sublink'>Unresolvable</li>
                    </NavLink>
                  </ul>
                )}
              </span>
            </div>
          </NavLink>
          <NavLink to='/faqs' style={navLinkStyles}>
            <div className='sidebar-log'>
              <li className='sidebar-item'>
                <PsychologyIcon className='sidebar-icons' />
                <span className='sidebar-name'>FaQs</span>
              </li>
            </div>
          </NavLink>
          <p className='title'>TOOLS</p>
          <NavLink to='/settings' style={navLinkStyles}>
            <div className='sidebar-setting'>
              <li className='sidebar-item'>
                <SettingsIcon className='sidebar-icons' />
                <span className='sidebar-name'>Settings</span>
              </li>
            </div>
          </NavLink>
          <div className='sidebar-logout' onClick={route_Mainpage}>
            <li className='sidebar-item'>
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
