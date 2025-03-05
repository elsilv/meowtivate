import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNotification } from "../context/NotificationContext";
import Lottie from 'lottie-react';
import catAnimation from '../styles/images/cat-login.json';

const GoogleLogin = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    const existingScript = document.getElementById('google-login-script');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-login-script';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => initializeGoogleSignIn();
    } else {
      initializeGoogleSignIn();
    }

    return () => {
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Handle the Google Sign-In response
  const handleCredentialResponse = (response) => {
    const token = response.credential;
  
    const userInfo = jwtDecode(token);

    fetch(`${process.env.REACT_APP_API_URL}/api/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        userInfo: {
          email: userInfo.email,
          name: userInfo.name,
        }
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const { id } = data.user;
          localStorage.setItem('user_id', id);
          localStorage.setItem('google_token', token);
          localStorage.setItem('isLoggedIn', 'true');
          window.location.href = '/tasks';
        }
        showNotification('Yay! 😸 You\'ve logged in! Time to start your purrfect day, kitty! ⭐', 'success');
      })
      .catch((error) => {
          console.error('Error:', error)
          showNotification('Oops! 😿 The login didn’t work. Please check your credentials and give it another try', 'error');
        }
      );
  };

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        {
          theme: 'outline',
          size: 'large',
        }
      );

      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className="login-container">
      <h2>Login with Google</h2>
      <div className="cat-login">
        <Lottie animationData={catAnimation} loop={true} />
      </div>
      <div id="buttonDiv"></div>
    </div>
  );
};

export default GoogleLogin;
