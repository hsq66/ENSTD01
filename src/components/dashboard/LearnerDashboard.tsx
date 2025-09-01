import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLearning } from '../../contexts/LearningContext';
import LearnerOverview from './learner/LearnerOverview';
import LessonList from './learner/LessonList';
import VocabularyReview from './learner/VocabularyReview';
import ProgressView from './learner/ProgressView';
import LearningHistory from './learner/LearningHistory';
import UserSettings from './shared/UserSettings';

interface LearnerDashboardProps {
  activeSection: string;
}

export default function LearnerDashboard({ activeSection }: LearnerDashboardProps) {
  const { user } = useAuth();
  const learning = useLearning();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <LearnerOverview user={user!} learning={learning} />;
      case 'lessons':
        return <LessonList lessons={learning.lessons} />;
      case 'vocabulary':
        return <VocabularyReview cards={learning.vocabularyCards} />;
      case 'progress':
        return <ProgressView user={user!} learning={learning} />;
      case 'history':
        return <LearningHistory results={learning.quizResults} lessons={learning.lessons} />;
      case 'settings':
        return <UserSettings user={user!} />;
      default:
        return <LearnerOverview user={user!} learning={learning} />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}