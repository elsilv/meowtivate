import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus } from "react-icons/fi";
import { AiOutlinePicture, AiOutlineTag, AiOutlineEdit } from "react-icons/ai";
import { FaHeart } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { useMeowtivate } from '../context/MeowtivateContext';

const Rewards = () => {
  const { state: { userId }, handleBuyReward } = useMeowtivate();

  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState({ name: '', description: '', image: '', value: '0' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (reward) => {
    setSelectedProduct(reward);
    setIsModalVisible(true);
  };

  const confirmPurchase = () => {
    handleBuyReward(selectedProduct);
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const cancelPurchase = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
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

    const formData = new FormData();
    formData.append("name", newReward.name);
    formData.append("description", newReward.description);
    formData.append("value", newReward.value);

    if (newReward.image) {
      formData.append('image', newReward.image);
    }

    axios.post(`${process.env.REACT_APP_API_URL}/api/rewards`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(() => {
        fetchRewards();
        setNewReward({ name: '', description: '', image: '', value: '0' });

        const fileInput = document.querySelector('input[name="image"]');
        if (fileInput) {
          fileInput.value = '';
        }
      })
      .catch(error => {
        console.error('There was an error adding the new reward!', error);
      });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className='task-content'>
      <h1>Palkintokauppa</h1>
      <div className="product-grid">
        {rewards.map(reward => (
          <ProductCard key={reward.id} product={reward} addToCart={addToCart} />
        ))}
      </div>

      <button onClick={toggleFormVisibility} className="show-reward-form-btn">
        {isFormVisible ? "Cancel" : "Add New Reward"}
      </button>

      {isFormVisible && (
        <div className="reward-form-container">
          <form onSubmit={handleFormSubmit} className="reward-form">
            <div className="form-row">
              <label className="input-group">
                <AiOutlineTag className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Reward name"
                  value={newReward.name}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label className="input-group">
                <AiOutlineEdit className="input-icon" />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newReward.description}
                  onChange={handleInputChange}
                />
              </label>

              <label className="input-group">
                <AiOutlinePicture className="input-icon" />
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setNewReward({ ...newReward, image: e.target.files[0] })}
                />
              </label>

              <label className="input-group">
                <FaHeart size={12} color="#FAD8D6" className="input-icon" />
                <input
                  type="number"
                  name="value"
                  placeholder="Price"
                  value={newReward.value}
                  onChange={handleInputChange}
                  min="0"
                />
              </label>
              <button type="submit" className="add-reward-btn">
                <FiPlus /> Add reward
              </button>
            </div>
          </form>
        </div>
      )}

      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to buy {selectedProduct?.name} for {selectedProduct?.value} <FaHeart size={12} color="#FAD8D6" />?</p>
            <button className="btn" onClick={confirmPurchase}>Yes</button>
            <button className="btn" onClick={cancelPurchase}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;