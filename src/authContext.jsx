import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = ({ accessToken, user }) => {
    setUser(user);
    setToken(accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
