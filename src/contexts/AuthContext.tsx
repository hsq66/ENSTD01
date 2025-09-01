import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'instructor' | 'learner';
  age: number;
  educationLevel: string;
  learningGoals: string[];
  avatar?: string;
  joinDate: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
  age: number;
  educationLevel: string;
  learningGoals: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Mock users for demonstration
  const mockUsers: User[] = [
    {
      id: '1',
      name: '张明',
      email: 'zhang.ming@email.com',
      phone: '13800138001',
      role: 'learner',
      age: 20,
      educationLevel: 'university',
      learningGoals: ['CET-4', 'Business English'],
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      joinDate: '2024-01-15',
      lastLogin: '2024-12-30'
    },
    {
      id: '2',
      name: '李老师',
      email: 'li.teacher@email.com',
      phone: '13800138002',
      role: 'instructor',
      age: 35,
      educationLevel: 'graduate',
      learningGoals: ['Teaching', 'Curriculum Development'],
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      joinDate: '2023-09-01',
      lastLogin: '2024-12-30'
    },
    {
      id: '3',
      name: '管理员',
      email: 'admin@platform.com',
      phone: '13800138000',
      role: 'admin',
      age: 40,
      educationLevel: 'graduate',
      learningGoals: ['Platform Management'],
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      joinDate: '2023-01-01',
      lastLogin: '2024-12-30'
    }
  ];

  const login = async (phone: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.phone === phone);
    if (foundUser && password === '123456') {
      setUser({
        ...foundUser,
        lastLogin: new Date().toISOString()
      });
      return true;
    }
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      role: 'learner',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}