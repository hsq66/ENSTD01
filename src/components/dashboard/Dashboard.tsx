import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import InstructorDashboard from './InstructorDashboard';
import LearnerDashboard from './LearnerDashboard';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard activeSection={activeSection} />;
      case 'instructor':
        return <InstructorDashboard activeSection={activeSection} />;
      default:
        return <LearnerDashboard activeSection={activeSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        user={user}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">
          {renderDashboard()}
        </div>
      </div>
    </div>
  );
}