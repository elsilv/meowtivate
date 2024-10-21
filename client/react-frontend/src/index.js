import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import { AuthProvider } from './context/AuthContext';

import TaskPage from './pages/TaskPage';
import RewardPage from './pages/RewardShopPage';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/api/tasks" element={<TaskPage />} />
        <Route path="/api/rewards" element={<RewardPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);
