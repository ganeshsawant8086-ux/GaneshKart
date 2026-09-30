import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    fullName: 'Ganesh Sawant',
    email: 'ganesh@ganeshkart.com',
    phoneNumber: '+91 98765 43210',
    role: 'Customer',
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProfileAndAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const userData = await api.getCurrentUser();
      if (userData) setUser(userData);

      const addrData = await api.getAddresses();
      if (addrData && Array.isArray(addrData)) {
        setAddresses(addrData);

        // Determine currently active selected address
        const savedSelectedId = localStorage.getItem('gk_selected_address_id');
        let activeAddr = null;

        if (savedSelectedId) {
          activeAddr = addrData.find((a) => String(a.id) === String(savedSelectedId));
        }
        if (!activeAddr) {
          activeAddr = addrData.find((a) => a.isDefault) || addrData[0] || null;
        }

        setSelectedAddress(activeAddr);
        if (activeAddr) {
          localStorage.setItem('gk_selected_address_id', String(activeAddr.id));
        }
      }
    } catch (err) {
      console.warn('Backend user profile fallback in use:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfileAndAddresses();
  }, [loadProfileAndAddresses]);

  const selectAddress = (addrOrId) => {
    let target = null;
    if (typeof addrOrId === 'object' && addrOrId !== null) {
      target = addrOrId;
    } else {
      target = addresses.find((a) => String(a.id) === String(addrOrId)) || null;
    }

    setSelectedAddress(target);
    if (target?.id) {
      localStorage.setItem('gk_selected_address_id', String(target.id));
    }
  };

  const addAddress = async (newAddressData) => {
    try {
      const created = await api.addAddress(newAddressData);
      await loadProfileAndAddresses();
      if (created) {
        selectAddress(created);
      }
      return created;
    } catch (err) {
      console.error('Failed to add address:', err);
      throw err;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      await api.deleteAddress(addressId);
      await loadProfileAndAddresses();
      return true;
    } catch (err) {
      console.error('Failed to delete address:', err);
      throw err;
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        addresses,
        selectedAddress,
        selectAddress,
        addAddress,
        deleteAddress,
        loading,
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
