import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useBalance = () => {
  const { userId } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const user_id = userId ? userId : null;
    if (!user_id) {
      console.error('User ID not found in local storage');
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/google-login/${user_id}/balance`)
      .then(response => {
        if (response.data.length > 0) {
          setBalance(response.data[0].balance);
        } else {
          console.error('No data returned from API');
          setBalance(0);
        }
      })
      .catch(error => {
        console.error('Error fetching the balance:', error);
      });
  }, [userId]);

  return balance;
};

export default useBalance;
