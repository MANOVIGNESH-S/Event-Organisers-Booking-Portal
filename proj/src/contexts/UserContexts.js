
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context for the user
const UserContext = createContext();

// Create a Provider component
export function UserProvider({ children }) {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || '');

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('userToken', userToken);
  }, [setUserToken]);

  return (
    <UserContext.Provider value={{ userName, setUserName, userRole, setUserRole, userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  return useContext(UserContext);
}