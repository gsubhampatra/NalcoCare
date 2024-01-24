// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../data/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      const loggedInUser = await loginUser(userData);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const registeredUser = await registerUser(userData);
      return registeredUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
