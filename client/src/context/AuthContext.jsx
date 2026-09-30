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

  // Clean legacy un-scoped addresses to prevent leakage across customers
  useEffect(() => {
    try {
      const legacyGlobal = localStorage.getItem('gk_addresses');
      if (legacyGlobal) {
        const parsed = JSON.parse(legacyGlobal);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Preserve Ganesh Sawant's address for Ganesh Sawant / Admin
          if (!localStorage.getItem('gk_addresses_8668811021')) {
            localStorage.setItem('gk_addresses_8668811021', JSON.stringify(parsed));
          }
          if (!localStorage.getItem('gk_addresses_2')) {
            localStorage.setItem('gk_addresses_2', JSON.stringify(parsed));
          }
        }
        localStorage.removeItem('gk_addresses');
        localStorage.removeItem('gk_selected_address_id');
      }
    } catch {}
  }, []);

  const loadProfileAndAddresses = useCallback(async (targetUser) => {
    const activeUser = targetUser !== undefined ? targetUser : user;
    
    // If no user is logged in, address must be completely empty
    if (!activeUser || !activeUser.id) {
      setAddresses([]);
      setSelectedAddress(null);
      return;
    }

    try {
      setLoading(true);
      const userKey = activeUser.phoneNumber || activeUser.id;
      const addrData = await api.getAddresses(activeUser.id);
      
      if (addrData && Array.isArray(addrData) && addrData.length > 0) {
        setAddresses(addrData);

        const savedSelectedId = localStorage.getItem(`gk_selected_address_id_${userKey}`);
        let activeAddr = null;

        if (savedSelectedId) {
          activeAddr = addrData.find((a) => String(a.id) === String(savedSelectedId));
        }
        if (!activeAddr) {
          activeAddr = addrData.find((a) => a.isDefault) || addrData[0] || null;
        }

        setSelectedAddress(activeAddr);
        if (activeAddr) {
          localStorage.setItem(`gk_selected_address_id_${userKey}`, String(activeAddr.id));
        }
      } else {
        // Completely blank for new customer
        setAddresses([]);
        setSelectedAddress(null);
        localStorage.removeItem(`gk_selected_address_id_${userKey}`);
      }
    } catch (err) {
      console.warn('Backend user profile fallback in use:', err);
      setAddresses([]);
      setSelectedAddress(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

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
    const userKey = user?.phoneNumber || user?.id;
    if (userKey && target?.id) {
      localStorage.setItem(`gk_selected_address_id_${userKey}`, String(target.id));
    }
  };

  const addAddress = async (newAddressData) => {
    try {
      const created = await api.addAddress(newAddressData, user?.id);
      await loadProfileAndAddresses(user);
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
      await api.deleteAddress(addressId, user?.id);
      await loadProfileAndAddresses(user);
      return true;
    } catch (err) {
      console.error('Failed to delete address:', err);
      throw err;
    }
  };

  const login = async (userData) => {
    try {
      localStorage.setItem('gk_auth_user', JSON.stringify(userData));
    } catch {}
    setUser(userData);
    // Reset addresses to blank until specifically loaded for this user
    setAddresses([]);
    setSelectedAddress(null);
    await loadProfileAndAddresses(userData);
  };

  const logout = () => {
    try {
      const userKey = user?.phoneNumber || user?.id;
      if (userKey) {
        localStorage.removeItem(`gk_selected_address_id_${userKey}`);
      }
      localStorage.removeItem('gk_auth_user');
      localStorage.removeItem('gk_selected_address_id');
      localStorage.removeItem('gk_addresses');
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
