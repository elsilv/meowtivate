import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  isLoggedIn: false,
  user: null,
  userId: null,
  balance: 0,
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
    default:
      return state;
  }
}

// Context ja Provider
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

    dispatch({ type: 'LOGOUT' });
    window.location.href = '/';
  };


  return (
    <MeowtivateContext.Provider value={{ state, dispatch, signOut }}>
      {children}
    </MeowtivateContext.Provider>
  );
}

export function useMeowtivate() {
  return useContext(MeowtivateContext);
}
