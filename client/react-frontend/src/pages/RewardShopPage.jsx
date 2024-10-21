import React from 'react';
import '../styles/index.css';
import Navbar from '../components/Navbar'
import Rewards from '../components/Rewards';

const RewardPage = () => {
    
  return (
    <div className='shiny-background'>
      <Navbar />
      <Rewards />
    </div>
  );
};

export default RewardPage;
