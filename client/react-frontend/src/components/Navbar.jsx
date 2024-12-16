import { React } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';
import { FaHeart } from 'react-icons/fa';

import { useMeowtivate } from '../context/MeowtivateContext';
import useBalance from "./useBalance";

const Navbar = () => {
  const { state: { isLoggedIn }, signOut } = useMeowtivate();
  const balance = useBalance();

  return (
    <nav className="navbar">
      <div className="navbar-brand"><Link to="/">Meowtivate</Link></div>
      <ul className="navbar-links">
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/rewards">Reward shop</Link></li>

        {isLoggedIn ? (
            <>
                <li><Link to="/myrewards">My rewards</Link></li>
                <li className="navbar-balance">{balance} <FaHeart size={12} color="#FFA9A3" /> </li>
                <li><button onClick={signOut}>Sign out</button></li>
            </>
        ) : (
            <li><Link to="/signin">Sign in</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
