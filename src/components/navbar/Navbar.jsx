import './navbar.scss';
import { React, useState } from 'react';
import Search from '../search/Search';
import DropDown from './dropdownMenu/acc-dropdown//DropdownMenu';
//MUI Icons
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
//for dark mode
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import NotifMenu from './dropdownMenu/notif-dropdown/NotifMenu';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  const handleNotifClick = () => {
    setIsNotifMenuOpen(!isNotifMenuOpen);
  }

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener('scroll', changeBackground);

  const { dispatch } = useContext(DarkModeContext);
  return (
    <nav className='navbar-main'>
      <div className={navbar ? 'navbar-wrapper active' : 'navbar-wrapper'}>
        <div className='navbar-search'>
          <Search />
        </div>
        <div className='navbar-menu'>
          <div className='menu-item'>
            <DarkModeOutlinedIcon
              className='navbar-icons'
              onClick={() => dispatch({ type: 'TOGGLE' })}
            />
          </div>
          <div className='menu-item'>
            <NotificationsNoneOutlinedIcon className='navbar-icons' onClick={handleNotifClick}/>
            <div className='notif-counter'>5</div>
            { isNotifMenuOpen && <NotifMenu />}
          </div>
          <div className='menu-item'>
            <ChatBubbleOutlineOutlinedIcon className='navbar-icons' />
            <div className='notif-counter'>2</div>
          </div>
          <div className='menu-item'>
            <DropDown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
