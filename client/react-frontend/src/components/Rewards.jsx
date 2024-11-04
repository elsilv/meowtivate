import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus  } from "react-icons/fi";
import { FaHeart } from 'react-icons/fa';
import ProductCard from './ProductCard';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState({ name: '', description: '', image: '', value: '0' });
  const [cart, setCart] = useState([]);

  const addToCart = (reward) => {
    setCart([...cart, reward]);
  };
  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/rewards`)
      .then(response => {
        setRewards(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the rewards!', error);
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReward(prevReward => ({
      ...prevReward,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem('user_id');

    axios.post(`${process.env.REACT_APP_API_URL}/api/rewards`, { ...newReward, user_id })
      .then(() => {
        fetchRewards();
        setNewReward({ name: '', description: '', image: '', value: '0' });
      })
      .catch(error => {
        console.error('There was an error adding the new reward!', error);
      });
  };


  return (
    <div className='task-content'>
      <h1>Palkintokauppa</h1>
      <div className="product-grid">
        {rewards.map(reward => (
          <ProductCard key={reward.id} product={reward} addToCart={addToCart}/>
        ))}
      </div>

      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <input
              className="add-task-input-field"
              type="text"
              name="name"
              placeholder="Reward name"
              value={newReward.name}
              onChange={handleInputChange}
              required
            />
            <input
              className="add-task-input-field"
              type="text"
              name="description"
              placeholder="Description"
              value={newReward.description}
              onChange={handleInputChange}
            />
            <input
              className="add-task-input-field"
              type="text"
              name="image"
              placeholder="Image"
              value={newReward.image}
              onChange={handleInputChange}
            />
            <input
              className="add-task-input-field"
              type="number"
              name="value"
              placeholder="Price"
              value={newReward.value}
              onChange={handleInputChange}
            />  <FaHeart size={12} color="#FAD8D6" />
            <button type="submit" className="task-change-status-btn">
              <FiPlus />
            </button>
          </div>
        </form>
      </div>

      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.map((item, index) => (
          <div key={index}>
            <p>{item.title} - {item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
