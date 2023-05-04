import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/chatContext';

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const signIn = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
  };
}