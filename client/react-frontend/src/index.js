import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import { MeowtivateProvider } from './context/MeowtivateContext';
import { NotificationProvider } from "./context/NotificationContext";

import TaskPage from './pages/TaskPage';
import RewardPage from './pages/RewardShopPage';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import MyRewardsPage from './pages/MyRewardsPage';

import NotificationBanner from "./components/NotificationBanner";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <NotificationProvider>
      <MeowtivateProvider>
        <Router>
          <NotificationBanner />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/rewards" element={<RewardPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/myrewards" element={<MyRewardsPage />} />
          </Routes>
        </Router>
      </MeowtivateProvider>
    </NotificationProvider>
  </React.StrictMode>
);
