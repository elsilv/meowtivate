import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  user: null,
  userId: null,
  balance: 0,
  tasks: [],
  rewards: [],
};

function meowtivateReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        userId: action.payload.userId,
      };
    case 'SIGN_OUT':
      return { ...initialState };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'MARK_TASK_DONE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, done: true } : task
        ),
        balance: state.balance + action.rewardValue,
      };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
}

const MeowtivateContext = createContext();

export function MeowtivateProvider({ children }) {
  const [state, dispatch] = useReducer(meowtivateReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('user_id');
    const storedUser = localStorage.getItem('user_info');

    if (token && loggedInStatus === 'true') {
      dispatch({
        type: 'SET_USER',
        payload: {
          user: storedUser ? JSON.parse(storedUser) : null,
          userId: storedUserId,
        },
      });
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('google_token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_info');
    localStorage.removeItem('user_id');

    dispatch({ type: 'SIGN_OUT' });
    window.location.href = '/';
  };

  const fetchTasks = (userId) => {
    if (!userId) return;

    axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`, { params: { user_id: userId } })
      .then(response => {
        dispatch({ type: 'SET_TASKS', payload: response.data });
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  };

  const handleBuyReward = (reward) => {
    if (!state.userId) {
      console.log('User not logged in');
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/api/purchases/buy`, {
      userId: state.userId,
      rewardId: reward.id,
    })
      .then(response => {
        console.log('Purchase successful:', response.data);
        dispatch({ type: 'UPDATE_BALANCE', payload: response.data.newBalance });
      })
      .catch(error => {
        console.error('Error purchasing reward:', error.response?.data?.error || error.message);
      });
  };

  return (
    <MeowtivateContext.Provider value={{ state, dispatch, signOut, fetchTasks, handleBuyReward }}>
      {children}
    </MeowtivateContext.Provider>
  );
}

export function useMeowtivate() {
  return useContext(MeowtivateContext);
}
