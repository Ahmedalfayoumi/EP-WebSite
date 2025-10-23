
import React, { createContext, useState, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { User } from '../types';
import { initialUsers } from '../data/initialData';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  login: (username: string, passwordHash: string) => boolean;
  logout: () => void;
  addUser: (user: User) => boolean;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  updatePassword: (userId: string, newPasswordHash: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('users', initialUsers);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  
  const isAuthenticated = !!currentUser;

  const login = (username: string, passwordHash: string): boolean => {
    const foundUser = users.find(u => u.username === username && u.passwordHash === passwordHash);
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addUser = (user: User): boolean => {
    if (users.some(u => u.username === user.username)) {
      return false; // username already exists
    }
    setUsers(prevUsers => [...prevUsers, user]);
    return true;
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
     if(currentUser?.id === updatedUser.id) {
       setCurrentUser(updatedUser);
     }
  };

  const deleteUser = (userId: string) => {
    if (currentUser?.id === userId) {
      logout(); // Can't delete yourself and stay logged in
    }
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
  };
  
  const updatePassword = (userId: string, newPasswordHash: string): boolean => {
    const userExists = users.some(u => u.id === userId);
    if (!userExists) return false;
    
    setUsers(prevUsers => prevUsers.map(u => 
      u.id === userId ? { ...u, passwordHash: newPasswordHash } : u
    ));
    
    // If updating current user's password, update current user state as well
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? {...prev, passwordHash: newPasswordHash} : null);
    }
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: currentUser, users, login, logout, addUser, updateUser, deleteUser, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};
