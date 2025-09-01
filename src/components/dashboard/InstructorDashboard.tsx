import React from 'react';
import InstructorOverview from './instructor/InstructorOverview';
import StudentManagement from './instructor/StudentManagement';
import LessonManagement from './instructor/LessonManagement';
import StudentFeedback from './instructor/StudentFeedback';
import UserSettings from './shared/UserSettings';
import { useAuth } from '../../contexts/AuthContext';

interface InstructorDashboardProps {
  activeSection: string;
}

export default function InstructorDashboard({ activeSection }: InstructorDashboardProps) {
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <InstructorOverview />;
      case 'students':
        return <StudentManagement />;
      case 'lessons':
        return <LessonManagement />;
      case 'feedback':
        return <StudentFeedback />;
      case 'settings':
        return <UserSettings user={user!} />;
      default:
        return <InstructorOverview />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}