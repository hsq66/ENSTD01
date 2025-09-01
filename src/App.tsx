import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LearningProvider } from './contexts/LearningContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/dashboard/Dashboard';
import LandingPage from './components/landing/LandingPage';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (!isAuthenticated && !showLogin && !showRegister) {
    return (
      <LandingPage 
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  if (!isAuthenticated && showLogin) {
    return (
      <LoginForm 
        onBack={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
    );
  }

  if (!isAuthenticated && showRegister) {
    return (
      <RegisterForm 
        onBack={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    );
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <LearningProvider>
        <AppContent />
      </LearningProvider>
    </AuthProvider>
  );
}

export default App;