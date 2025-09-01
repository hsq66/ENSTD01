import React from 'react';
import AdminOverview from './admin/AdminOverview';
import UserManagement from './admin/UserManagement';
import ContentManagement from './admin/ContentManagement';
import SystemAnalytics from './admin/SystemAnalytics';
import SystemSettings from './admin/SystemSettings';

interface AdminDashboardProps {
  activeSection: string;
}

export default function AdminDashboard({ activeSection }: AdminDashboardProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverview />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      case 'analytics':
        return <SystemAnalytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}