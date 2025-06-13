
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CurrentUser, User } from '../types'; // AdminUser import removed

interface AuthContextType {
  currentUser: CurrentUser | null;
  isLoadingAuth: boolean;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, phone: string, password: string) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const defaultAuthContextValue: AuthContextType = {
  currentUser: null,
  isLoadingAuth: true,
  isAuthModalOpen: false,
  setAuthModalOpen: () => {},
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  authError: null,
  clearAuthError: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

// MOCK_ADMIN_USER removed
const MOCK_REGULAR_USER: User = { id: 'user001', username: 'RegularUser', email: 'user@example.com', phone: '123-456-7890', role: 'user' };

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoadingAuth(true);
    try {
      const storedUserJson = localStorage.getItem('currentUser');
      if (storedUserJson) {
        const potentialUser = JSON.parse(storedUserJson);

        // Validate the structure for User role only
        if (
          potentialUser &&
          typeof potentialUser === 'object' &&
          typeof potentialUser.id === 'string' &&
          typeof potentialUser.username === 'string' &&
          potentialUser.role === 'user' && // Only 'user' role is valid now
          typeof potentialUser.email === 'string' &&
          typeof potentialUser.phone === 'string'
        ) {
          setCurrentUser(potentialUser as User);
        } else {
          console.warn('Stored user data is malformed, not a valid user type, or essential fields are missing. Clearing.');
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null); // No user stored
      }
    } catch (error) {
      console.error("Failed to parse or validate stored user:", error);
      localStorage.removeItem('currentUser'); 
      setCurrentUser(null);
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<void> => {
    setIsLoadingAuth(true);
    setAuthError(null);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    // Admin login block removed
    if (username.toLowerCase() === 'user' && password === 'user123') {
      const simulatedFetchedUser: User = { 
        ...MOCK_REGULAR_USER, 
        username: username 
      };
      setCurrentUser(simulatedFetchedUser);
      localStorage.setItem('currentUser', JSON.stringify(simulatedFetchedUser));
      setAuthModalOpen(false);
    } else {
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      // Assuming password check is against email for demo registered users
      const foundUser = storedUsers.find((u: User) => u.username.toLowerCase() === username.toLowerCase() && u.email === password); 
      
      if (foundUser) {
        setCurrentUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        setAuthModalOpen(false);
      } else {
        setAuthError('Invalid username or password.');
      }
    }
    setIsLoadingAuth(false);
  }, []);

  const signup = useCallback(async (username: string, email: string, phone: string, password: string): Promise<void> => {
    setIsLoadingAuth(true);
    setAuthError(null);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if (!username || !email || !password || !phone) {
        setAuthError('All fields (username, email, phone, password) are required for signup.');
        setIsLoadingAuth(false);
        return;
    }
     if (username.toLowerCase() === 'admin' || username.toLowerCase() === 'user') { 
        setAuthError('This username is reserved. Please choose another.');
        setIsLoadingAuth(false);
        return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (storedUsers.some((u: User) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase())) {
        setAuthError('Username or email already exists.');
        setIsLoadingAuth(false);
        return;
    }

    const newUser: User = {
      id: `user-${Date.now().toString()}`,
      username,
      email,
      phone,
      role: 'user',
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));

    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setAuthModalOpen(false);
    setIsLoadingAuth(false);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setAuthModalOpen(false); 
  }, []);

  const handleSetAuthModalOpen = useCallback((isOpen: boolean) => {
    setAuthModalOpen(isOpen);
    if (isOpen) { 
      clearAuthError();
    }
  }, [clearAuthError]); 

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoadingAuth,
      isAuthModalOpen,
      setAuthModalOpen: handleSetAuthModalOpen,
      login,
      logout,
      signup,
      authError,
      clearAuthError
    }}>
      {children}
    </AuthContext.Provider>
  );
};