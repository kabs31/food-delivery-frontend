import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    const token = 'Auth-token';
    localStorage.setItem('authToken', token); // Store the token after login
    console.log('Token stored in localStorage:', token); // Debugging log
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Remove the token from local storage
    console.log('Token removed from localStorage'); // Debugging log
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


export { AuthContext, AuthProvider };
