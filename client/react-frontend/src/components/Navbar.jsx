import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import { FaHeart } from 'react-icons/fa';

import { useMeowtivate } from '../context/MeowtivateContext';
import useBalance from './useBalance';

const Navbar = () => {
  const { state: { isLoggedIn }, signOut } = useMeowtivate();
  const balance = useBalance();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand"><Link to="/">Meowtivate</Link></div>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/tasks" onClick={() => setIsOpen(false)}>Tasks</Link></li>
        <li><Link to="/rewards" onClick={() => setIsOpen(false)}>Reward shop</Link></li>

        {isLoggedIn ? (
          <>
            <li><Link to="/myrewards" onClick={() => setIsOpen(false)}>My rewards</Link></li>
            <li className="navbar-balance">{balance} <FaHeart size={12} color="#FFA9A3" /></li>
            <li>
              <button onClick={() => { signOut(); setIsOpen(false); }}>Sign out</button>
            </li>
          </>
        ) : (
          <li><Link to="/signin" onClick={() => setIsOpen(false)}>Sign in</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
