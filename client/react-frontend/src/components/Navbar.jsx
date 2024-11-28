import { React } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

import { useMeowtivate } from '../context/MeowtivateContext';

const Navbar = () => {
  const { state: { isLoggedIn }, signOut } = useMeowtivate();

  return (
    <nav className="navbar">
      <div className="navbar-brand"><Link to="/">Meowtivate</Link></div>
      <ul className="navbar-links">
        <li><Link to="/api/tasks">Tasks</Link></li>
        <li><Link to="/api/rewards">Reward shop</Link></li>

        {isLoggedIn ? (
            <>
                <li><Link to="/myrewards">My rewards</Link></li>
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
