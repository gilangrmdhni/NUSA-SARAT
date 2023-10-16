// auth/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user_id, setUserId] = useState(null);

  const signIn = (userData) => {
    setUserId(userData);
  };

  const signOut = () => {
    setUserId(null); 
  };

  return (
    <AuthContext.Provider value={{ user_id, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
