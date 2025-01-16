import React from 'react';
import '../styles/index.css';
import Navbar from '../components/Navbar'
import UsersRewards from "../components/UsersRewards";
import ComplimentCollection from "../components/ComplimentCollection";

const MyRewardsPage = () => {

  return (
    <div className='shiny-background'>
      <Navbar />
      <UsersRewards />
      <ComplimentCollection />
    </div>
  );
};

export default MyRewardsPage;
