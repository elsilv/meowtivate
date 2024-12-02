import React, { useEffect, useState } from 'react';
import useBalance from './useBalance';
import '../styles/index.css';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
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

  const markAsUsed = (purchaseId) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/api/purchases/${purchaseId}/use`)
      .then(() => {
        setPurchases(prev =>
          prev.map(reward =>
            reward.purchase_id === purchaseId
              ? { ...reward, is_used: 1 }
              : reward
          )
        );
      })
      .catch(error => {
        console.error('There was an error marking the reward as used!', error);
      });
  };

  return (
    <div className='task-content'>
      <h1>My Rewards</h1>
      <h2>Balance: {balance}</h2>

      <div className="product-grid">
        {purchases.map(reward => (
          <div className={`owned-product-card ${reward.is_used ? 'used' : ''}`}>
              {reward.is_used === 1 && <div className="used-overlay"></div>}
              {reward.image && (
                <img src={`/images/${reward.image}`} alt={reward.name} className="product-image" />
              )}
              <div className="product-info">
                <h2 className="product-name">{reward.name}</h2>
                <p className="product-description">{reward.description}</p>
                <p className="product-price">{reward.value} <FaHeart size={12} color="#FFA9A3" /></p>
              </div>
              {reward.is_used ? (
                <p className="used-label">Used</p>
              ) : (
                <button className="mark-used-btn" onClick={() => markAsUsed(reward.purchase_id)}>
                  Mark as Used
                </button>
              )}
            </div>

        ))}
      </div>
    </div>
  );
};

export default UsersRewards;
