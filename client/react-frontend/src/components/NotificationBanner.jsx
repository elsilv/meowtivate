import React from 'react';
import { useNotification } from '../context/NotificationContext';
import '../styles/index.css';

const NotificationBanner = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default NotificationBanner;
