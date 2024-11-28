import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import { MeowtivateProvider } from './context/MeowtivateContext';

import TaskPage from './pages/TaskPage';
import RewardPage from './pages/RewardShopPage';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import MyRewardsPage from './pages/MyRewardsPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
   <MeowtivateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/api/tasks" element={<TaskPage />} />
          <Route path="/api/rewards" element={<RewardPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/myrewards" element={<MyRewardsPage />} />
        </Routes>
      </Router>
    </MeowtivateProvider>
  </React.StrictMode>
);
