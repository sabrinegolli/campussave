import { createContext, useContext, useState } from 'react';

/*
 * AUTH MOCK (localStorage).
 * To be replaced later by Firebase Authentication + calls to the Node/Express API.
 * The login / register / logout / updateProfile functions will keep the same signature.
 */
const AuthContext = createContext(null);
const USERS_KEY = 'cs_users';
const SESSION_KEY = 'cs_session';

const read = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};

const seedUsers = () => {
  const users = read(USERS_KEY, null);
  if (users) return users;
  const demo = [{
    id: 'u1', firstName: 'Sabrine', lastName: 'Gharbi', email: 'sabrine@essect.tn',
    password: '123456', phone: '20 123 456', university: 'ESSECT', level: '3rd year E-Business',
  }];
  localStorage.setItem(USERS_KEY, JSON.stringify(demo));
  return demo;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    seedUsers();
    return read(SESSION_KEY, null);
  });

  const persist = (u) => {
    const { password, ...safe } = u;
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    setUser(safe);
  };

  const login = async (email, password) => {
    const found = read(USERS_KEY, []).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error('Incorrect email or password.');
    persist(found);
  };

  const register = async (data) => {
    const users = read(USERS_KEY, []);
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase()))
      throw new Error('An account already exists with this email.');
    const newUser = { id: 'u' + Date.now(), university: 'ESSECT', level: '', phone: '', ...data };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    persist(newUser);
  };

  const updateProfile = async (changes) => {
    const users = read(USERS_KEY, []);
    const next = users.map((u) => (u.id === user.id ? { ...u, ...changes } : u));
    localStorage.setItem(USERS_KEY, JSON.stringify(next));
    persist(next.find((u) => u.id === user.id));
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
