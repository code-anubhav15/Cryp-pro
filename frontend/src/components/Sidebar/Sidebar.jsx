import React from 'react';
import './Sidebar.css';
import logo from '../../assets/logo.jpg'
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className='logo'>
        <img src={logo} alt="" />
        <span className="logo-name">Cryp-Pro</span>
      </div>
      <ul className="sidebar-menu">
        <li><Link to='/news'>News</Link></li>
        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/transaction'>Transaction</Link></li>
        <li>
        {
          localStorage.getItem('auth-token')?
          <Link onClick={()=>{localStorage.removeItem('auth-token')}} to='/login'>Logout</Link>:
          <Link to='/login'>Login</Link>    
        }
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
