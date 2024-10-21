import React from 'react';
import '../styles/index.css';
import Navbar from '../components/Navbar'
import GoogleLogin from '../components/GoogleLogin';

const SignInPage = () => {
    
  return (
    <div className='shiny-background'>
      <Navbar />
      <div className="signup-page">
        <div className="signup-card">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
