import './navbar.scss'
import {React, useState} from 'react';
import Search from '../search/Search';
//MUI Icons
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
//for dark mode
import { useContext } from 'react';
import {DarkModeContext} from '../../context/darkModeContext';


const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if(window.scrollY >=80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }
  window.addEventListener('scroll', changeBackground);

  const { dispatch } = useContext(DarkModeContext);
  return (
    <nav className='navbar-main'>
      <div className={ navbar ? 'navbar-wrapper active' : 'navbar-wrapper'}>
        <div className="navbar-search">
          <Search />
        </div>
        <div className="navbar-menu">
          <div className="menu-item">
            <DarkModeOutlinedIcon className="navbar-icons" onClick={()=> dispatch({type: 'TOGGLE'})}/>
          </div>
          <div className="menu-item">
            <NotificationsNoneOutlinedIcon className="navbar-icons"/>
            <div className="notif-counter">1</div>
          </div>
          <div className="menu-item">
            <ChatBubbleOutlineOutlinedIcon className="navbar-icons"/>
            <div className="notif-counter">2</div>
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