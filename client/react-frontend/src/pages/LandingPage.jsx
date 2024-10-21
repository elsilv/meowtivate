import React from 'react';
import '../styles/index.css';
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSections'
import Footer from '../components/Footer'

const LandingPage = () => {
    
  return (
    <div className="Landing-page">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
