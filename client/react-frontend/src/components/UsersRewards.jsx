import React, { useEffect, useState } from 'react';
import useBalance from './useBalance';
import '../styles/index.css';
import axios from 'axios';
import { useMeowtivate } from '../context/MeowtivateContext';

const UsersRewards = () => {
  const { state: { userId } } = useMeowtivate();
  const balance = useBalance();

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/purchases/${userId}`)
      .then(response => {
        setPurchases(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the owned rewards!', error);
      });
  }

  return (
    <div className='task-content'>
      <h1>My Rewards</h1>
      <p>Balance: {balance}</p>
      <p> {purchases.map(purchase => `${purchase.id} - ${purchase.reward_id}`)} </p>
    </div>
  );
};

export default UsersRewards;
