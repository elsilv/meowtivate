import React from 'react';
import Lottie from 'lottie-react';
import '../styles/index.css';
import { Link } from 'react-router-dom';
import { useMeowtivate } from '../context/MeowtivateContext';
import catAnimation from '../styles/images/cat-dance.json';

const HeroSection = () => {
  const { state: { isLoggedIn } } = useMeowtivate();

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Meowtivate</h1>
          <p>"If at first you don’t succeed, knock everything off the table and try again."</p>
          <Link to={isLoggedIn ? "/tasks" : "/signin"} className="btn">Get Started</Link>
        </div>
      </section>
      <section className="introduction-section">
        <div className="cat-container">
            <Lottie animationData={catAnimation} loop={true} />
        </div>
        <h2>Turn Productivity into Purr-ductivity!</h2>
        <p>Pounce on your goals and make them a reality! Meowtivate turns your tasks into a playful adventure.
          Complete your tasks, earn 'meow-money,' and shop for purrfect rewards. Plus, stay tuned for personalized compliments that will make you feel like the top cat!
           Start your journey today and let the motivation begin!</p>
      </section>
      <section className="features-section">
        <h2>What Can You Do With Meowtivate?</h2>
        <div className="steps">
          <div className="step">
            <h3>Step 1.</h3>
            <p>Sign in to Meowtivate and get ready to conquer your tasks!</p>
          </div>
          <div className="step">
            <h3>Step 2.</h3>
            <p>Add new tasks and get started on completing them.</p>
          </div>
          <div className="step">
            <h3>Step 3.</h3>
            <p>Add your desired rewards to the Reward Shop — you're the boss of your own motivation!</p>
          </div>
          <div className="step">
            <h3>Step 4.</h3>
            <p>Shop for purrfect rewards with the 'meow-money' you've earned!</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <Link to={isLoggedIn ? "/tasks" : "/signin"} className="btn">Join in Meowtivate</Link>
      </section>
    </>
  );
};

export default HeroSection;
