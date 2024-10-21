import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, signOut } = useContext(AuthContext); 

  return (
    <nav className="navbar">
      <div className="navbar-brand"><Link to="/">Meowtivate</Link></div>
      <ul className="navbar-links">
        <li><Link to="/api/tasks">Tasks</Link></li>
        <li><Link to="/api/rewards">Reward shop</Link></li>

        {isLoggedIn ? (<li><button onClick={signOut}>Sign out</button></li>) : (<li><Link to="/signin">Sign in</Link></li>)}
      </ul>
    </nav>
  );
};

export default Navbar;
