import React from 'react';
import '../styles/index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Meowtivate</h1>
        <p>"If at first you don’t succeed, knock everything off the table and try again."</p>
        <Link to="/signin" className="btn">Get Started</Link>
      </div>
    </section>
  );
};

export default HeroSection;
