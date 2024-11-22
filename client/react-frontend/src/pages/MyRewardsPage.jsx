import React from 'react';
import '../styles/index.css';
import Navbar from '../components/Navbar'
import UsersRewards from "../components/UsersRewards";

const MyRewardsPage = () => {

  return (
    <div className='shiny-background'>
      <Navbar />
      <UsersRewards />
    </div>
  );
};

export default MyRewardsPage;
