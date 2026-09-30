import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gk_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAdmin = Boolean(user && (user.role === 'Admin' || user.phoneNumber === '8668811021'));

  const loadProfileAndAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const savedUserStr = localStorage.getItem('gk_auth_user');
      if (savedUserStr) {
        try {
          const parsed = JSON.parse(savedUserStr);
          setUser(parsed);
        } catch {}
      }

      const addrData = await api.getAddresses();
      if (addrData && Array.isArray(addrData)) {
        setAddresses(addrData);

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
    try {
      localStorage.setItem('gk_auth_user', JSON.stringify(userData));
    } catch {}
    setUser(userData);
  };

  const logout = () => {
    try {
      localStorage.removeItem('gk_auth_user');
      localStorage.removeItem('gk_selected_address_id');
    } catch {}
    setUser(null);
    setAddresses([]);
    setSelectedAddress(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
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
