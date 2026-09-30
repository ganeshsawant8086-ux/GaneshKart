import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    fullName: 'Ganesh Sharma',
    email: 'ganesh@ganeshkart.com',
    phoneNumber: '+91 98765 43210',
    role: 'Customer',
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfileAndAddresses();
  }, []);

  const loadProfileAndAddresses = async () => {
    try {
      const userData = await api.getCurrentUser();
      if (userData) setUser(userData);
      const addrData = await api.getAddresses();
      if (addrData) setAddresses(addrData);
    } catch (err) {
      console.warn('Backend user profile fallback in use:', err);
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    // For demo purposes, retain guest or switch to Guest
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        addresses,
        login,
        logout,
        refreshAddresses: loadProfileAndAddresses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
