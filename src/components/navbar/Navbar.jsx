import './navbar.scss'
//MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
//for dark mode
import { useContext } from 'react';
import {DarkModeContext} from '../../context/darkModeContext';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <nav className="navbar-main">
      <div className="navbar-wrapper">
        <div className="navbar-search">
          <input type="text" placeholder='Search...' />
          <SearchIcon/>
        </div>
        <div className="navbar-menu">
          <div className="menu-item">
            <DarkModeIcon className="navbar-icons" onClick={()=> dispatch({type: 'TOGGLE'})}/>
          </div>
          <div className="menu-item">
            <FullscreenExitIcon className="navbar-icons"/>
          </div>
          <div className="menu-item">
            <NotificationsIcon className="navbar-icons"/>
            <div className="notif-counter">1</div>
          </div>
          <div className="menu-item">
            <ChatBubbleIcon className="navbar-icons"/>
            <div className="notif-counter">2</div>
          </div>
          <div className="menu-item">
            <FilterListIcon className="navbar-icons"/>
          </div>
          <div className="menu-item">
            <img src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80" alt="avatar" className='navbar-avatar' />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar