// auth/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Buat konteks autentikasi
export const AuthContext = createContext();

// Buat komponen provider untuk konteks autentikasi
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fungsi untuk melakukan login
  const signIn = (userData) => {
    // Lakukan logika login di sini
    setUser(userData); // Contoh: menyimpan data pengguna setelah berhasil login
  };

  // Fungsi untuk melakukan logout
  const signOut = () => {
    // Lakukan logika logout di sini
    setUser(null); // Contoh: menghapus data pengguna saat logout
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Buat fungsi custom hook untuk menggunakan konteks autentikasi
export const useAuth = () => {
  return useContext(AuthContext);
};
