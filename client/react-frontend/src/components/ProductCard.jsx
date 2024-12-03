import React from 'react';
import { FaHeart } from 'react-icons/fa';
import '../styles/index.css';


const ProductCard = ({ product, addToCart }) => {

    return (
      <div className="product-card">
      {product.image && (
        <img src={`${process.env.REACT_APP_API_URL}/${product.image}`} alt={product.name} className="product-image" />
      )}
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.value} <FaHeart size={12} color="#FFA9A3" /></p>   
        </div>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Buy</button>
      </div>
    );
  };
  

export default ProductCard;
