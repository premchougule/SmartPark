import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(() => {
    try {
      const raw = localStorage.getItem('auth');
      return raw ? JSON.parse(raw) : { user: null, token: null };
    } catch (e) {
      return { user: null, token: null };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('auth', JSON.stringify(auth));
    } catch (e) {}
  }, [auth]);

  const setAuth = (user, token) => {
    setAuthState({ user, token });
    try {
      if (token) localStorage.setItem('token', token);
      if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (e) {}
  };
  const clearAuth = () => {
    setAuthState({ user: null, token: null });
    try {
      localStorage.removeItem('auth');
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
};

export default AuthContext;
