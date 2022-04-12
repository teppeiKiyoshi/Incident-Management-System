import './dropdown.scss';
//SVG ICONS
import { ReactComponent as CogIcon } from '../../../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../../icons/arrow.svg';
import { ReactComponent as Email } from '../../../icons/email.svg';
import { ReactComponent as Password } from '../../../icons/password.svg';
import { ReactComponent as Deactivate } from '../../../icons/deactivate.svg';
import { ReactComponent as Logout } from '../../../icons/logout.svg';
import { ReactComponent as Profile } from '../../../icons/profile.svg';
import { ReactComponent as AccSettings } from '../../../icons/acc-settings.svg';

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

function DropDown() {
  return (
    <NavItem
      icon={
        <img
          src='https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=971&q=80'
          alt='avatar'
          className='navbar-avatar'
        />
      }
    >
      <DropdownMenu></DropdownMenu>
    </NavItem>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className='nav-item'>
      <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href='#'
        className='dropdown-item'
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className='dropdown' style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames='menu-primary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem leftIcon={<Profile />} rightIcon={<ChevronIcon />}>
            My Profile
          </DropdownItem>
          <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronIcon />}>
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<AccSettings />}
            rightIcon={<ChevronIcon />}
            goToMenu='settings'
          >
            Account Settings
          </DropdownItem>
          <DropdownItem leftIcon={<Logout />} rightIcon={<ChevronIcon />}>
            Logout
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames='menu-secondary'
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem goToMenu='main' leftIcon={<ArrowIcon style={{color: '#893dff'}}/>}>
            {' '}
            <h3 style={{fontWeight: '600'}}>Account Settings</h3>{' '}
          </DropdownItem>
          <DropdownItem leftIcon={<Email />}>Change Email</DropdownItem>
          <DropdownItem leftIcon={<Password />}>Change Password</DropdownItem>
          <DropdownItem leftIcon={<Deactivate />}>
            Deactivate Account
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropDown;
