import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    const loggedInStatus = localStorage.getItem('isLoggedIn');

    if (token && loggedInStatus === 'true') {
      setIsLoggedIn(true);
      const storedUser = localStorage.getItem('user_info');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('google_token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_info');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
