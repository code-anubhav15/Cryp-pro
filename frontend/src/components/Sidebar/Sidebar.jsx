import React, { useState } from 'react';
import './Sidebar.css';
import logo from '../../assets/avatar.png';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActivePath(path);
  };

  return (
    <div className="sidebar">
      <div className='admin'>
        <img src={logo} alt="" />
        <span className="logo-name">Admin</span>
      </div>
      <ul className="sidebar-menu">
        <li className={activePath === '/news' ? 'active' : ''}>
          <Link to='/news' onClick={() => handleLinkClick('/news')}>News</Link>
        </li>
        <li className={activePath === '/' ? 'active' : ''}>
          <Link to='/' onClick={() => handleLinkClick('/')}>Dashboard</Link>
        </li>
        <li className={activePath === '/transaction' ? 'active' : ''}>
          <Link to='/transaction' onClick={() => handleLinkClick('/transaction')}>Transaction</Link>
        </li>
      </ul>
      <ul className="sidebar-menu">
        <li className={activePath === '/login' ? 'active' : ''}>
          {
            localStorage.getItem('auth-token') ?
            <Link onClick={() => { localStorage.removeItem('auth-token'); handleLinkClick('/login'); }} to='/login'>Logout</Link> :
            <Link to='/login' onClick={() => handleLinkClick('/login')}>Login</Link>    
          }
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
