import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMeowtivate } from '../context/MeowtivateContext';

const useBalance = () => {
  const { state: { userId, balance }, dispatch } = useMeowtivate();

  useEffect(() => {
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/google-login/${userId}/balance`)
      .then(response => {
        if (response.data.length > 0) {
          const fetchedBalance = response.data[0].balance;
          dispatch({
            type: 'UPDATE_BALANCE',
            payload: fetchedBalance,
          });
        } else {
          console.error('No data returned from API');
        }
      })
      .catch(error => {
        console.error('Error fetching the balance:', error);
      });
  }, [userId, dispatch]);

  return balance;
};

export default useBalance;
