import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (reward) => {
    setCart([...cart, reward]);
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/rewards`)
      .then(response => {
        setRewards(response.data); 
      })
      .catch(error => {
        console.error('There was an error fetching the rewards!', error);
      });
  }, []); 
  
  return (
    <div className='task-content'>
      <h1>Palkintokauppa</h1>
      <div className="product-grid">
        {rewards.map(reward => (
          <ProductCard key={reward.id} product={reward} addToCart={addToCart}/>
        ))}
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
