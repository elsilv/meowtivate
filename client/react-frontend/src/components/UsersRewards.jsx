import React, { useEffect, useState } from 'react';
import '../styles/index.css';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useMeowtivate } from '../context/MeowtivateContext';
import { handleSortChange, sortItems } from '../utils/sortUtils';
import { useNotification } from "../context/NotificationContext";

const UsersRewards = () => {
  const { state: { userId } } = useMeowtivate();
  const { showNotification } = useNotification();

  const [purchases, setPurchases] = useState([]);
  const [sortOption, setSortOption] = useState('unused');

  useEffect(() => {
    fetchPurchases();
  }, [userId]);

  const fetchPurchases = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/purchases/${userId}`)
      .then(response => {
        const sortedData = sortItems(response.data, 'unused');
        setPurchases(sortedData);
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
        showNotification('Purrfect! Your reward has been marked as used. Enjoy it, kitty! ❤️', 'success');
      })
      .catch(error => {
        console.error('Whoops! Something went wrong when marking your reward as used.', error);
        showNotification('Whoops! Something went wrong when marking your reward as used. Try again, kitty!', 'error');
      });
  };

  return (
    <div className='task-content'>
      <h1>My Rewards</h1>

      <div>
        <select
          value={sortOption  || 'unused'}
          onChange={(e) => handleSortChange(e.target.value, setSortOption, setPurchases, purchases)}
          className="sort-dropdown"
        >
          <option value="unused">Unused First</option>
          <option value="valueHighToLow">By Value (High to Low)</option>
          <option value="valueLowToHigh">By Value (Low to High)</option>
          <option value="recent">Recently Purchased</option>
          <option value="oldest">Oldest Purchased</option>
        </select>
      </div>

       <div className="product-grid">
        {purchases.map((reward) => (
          <div className={`owned-product-card ${reward.is_used ? 'used' : ''}`}>
            {reward.is_used === 1 && <div className="used-overlay"></div>}
            {reward.image ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/${reward.image}`}
                  alt={reward.name}
                  className="owned-product-image"
                />
              ) : (
                <div className="no-image"></div>
              )}
            <div className="product-info">
              <h2 className="product-name">{reward.name}</h2>
              <p className="product-description">{reward.description}</p>
              <p className="product-price">{reward.value} <FaHeart size={12} color="#FFA9A3" /></p>
            </div>
            {reward.is_used ? (
              <div className="used-label">Used</div>
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
