import React from 'react';
import useBalance from './useBalance';
import '../styles/index.css';

const UsersRewards = () => {
  const balance = useBalance();

  return (
    <div className='task-content'>
      <h1>My Rewards</h1>
      <p>Balance: {balance}</p>
    </div>
  );
};

export default UsersRewards;
