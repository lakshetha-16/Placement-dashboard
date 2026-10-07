import { createContext, useContext, useState } from 'react';
import { api } from '../api/api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => api.getSession());
  const start = (u) => { api.setSession(u); setUser(u); };
  const value = {
    user,
    login: (email, password) => start(api.login(email, password)),
    register: (u) => start(api.register(u)),
    logout: () => { api.setSession(null); setUser(null); },
    updateProfile: (u) => start(api.updateUser(u)),
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
