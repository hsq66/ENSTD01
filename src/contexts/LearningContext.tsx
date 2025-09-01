import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Lesson {
  id: string;
  title: string;
  level: string;
  category: 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'reading';
  duration: number;
  progress: number;
  isCompleted: boolean;
  description: string;
  thumbnail: string;
}

export interface VocabularyCard {
  id: string;
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  level: string;
  nextReview: string;
  reviewCount: number;
  difficulty: number;
}

export interface QuizResult {
  id: string;
  lessonId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeSpent: number;
}

interface LearningContextType {
  lessons: Lesson[];
  vocabularyCards: VocabularyCard[];
  quizResults: QuizResult[];
  currentLevel: string;
  completedLessons: number;
  totalStudyTime: number;
  updateLessonProgress: (lessonId: string, progress: number) => void;
  completeLesson: (lessonId: string) => void;
  addQuizResult: (result: QuizResult) => void;
  updateVocabularyCard: (cardId: string, difficulty: number) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [lessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Basic Greetings',
      level: 'A1',
      category: 'vocabulary',
      duration: 15,
      progress: 100,
      isCompleted: true,
      description: 'Learn essential greeting phrases for daily conversations',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      id: '2',
      title: 'Present Tense Verbs',
      level: 'A1',
      category: 'grammar',
      duration: 25,
      progress: 60,
      isCompleted: false,
      description: 'Master the present tense for describing current actions',
      thumbnail: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      id: '3',
      title: 'Listening Comprehension',
      level: 'A2',
      category: 'listening',
      duration: 20,
      progress: 30,
      isCompleted: false,
      description: 'Improve your listening skills with everyday conversations',
      thumbnail: 'https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      id: '4',
      title: 'Business Vocabulary',
      level: 'B2',
      category: 'vocabulary',
      duration: 30,
      progress: 0,
      isCompleted: false,
      description: 'Professional terms for workplace communication',
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    }
  ]);

  const [vocabularyCards] = useState<VocabularyCard[]>([
    {
      id: '1',
      word: 'Hello',
      pronunciation: '/həˈloʊ/',
      definition: '你好 - 用于问候的常用词语',
      example: 'Hello, how are you today?',
      level: 'A1',
      nextReview: '2024-12-31',
      reviewCount: 5,
      difficulty: 2
    },
    {
      id: '2',
      word: 'Opportunity',
      pronunciation: '/ˌɑːpərˈtuːnəti/',
      definition: '机会 - 做某事的有利时机',
      example: 'This is a great opportunity to learn English.',
      level: 'B1',
      nextReview: '2025-01-02',
      reviewCount: 3,
      difficulty: 4
    },
    {
      id: '3',
      word: 'Achievement',
      pronunciation: '/əˈtʃiːvmənt/',
      definition: '成就 - 通过努力获得的成功',
      example: 'Graduating from university was a great achievement.',
      level: 'B2',
      nextReview: '2025-01-01',
      reviewCount: 2,
      difficulty: 5
    }
  ]);

  const [quizResults] = useState<QuizResult[]>([
    {
      id: '1',
      lessonId: '1',
      score: 85,
      totalQuestions: 10,
      completedAt: '2024-12-28',
      timeSpent: 300
    },
    {
      id: '2',
      lessonId: '2',
      score: 92,
      totalQuestions: 15,
      completedAt: '2024-12-29',
      timeSpent: 420
    }
  ]);

  const currentLevel = 'A2';
  const completedLessons = lessons.filter(l => l.isCompleted).length;
  const totalStudyTime = 1250; // minutes

  const updateLessonProgress = (lessonId: string, progress: number) => {
    // Implementation would update lesson progress
    console.log(`Updating lesson ${lessonId} progress to ${progress}%`);
  };

  const completeLesson = (lessonId: string) => {
    // Implementation would mark lesson as completed
    console.log(`Completing lesson ${lessonId}`);
  };

  const addQuizResult = (result: QuizResult) => {
    // Implementation would add new quiz result
    console.log('Adding quiz result:', result);
  };

  const updateVocabularyCard = (cardId: string, difficulty: number) => {
    // Implementation would update vocabulary card difficulty and next review date
    console.log(`Updating vocabulary card ${cardId} difficulty to ${difficulty}`);
  };

  return (
    <LearningContext.Provider
      value={{
        lessons,
        vocabularyCards,
        quizResults,
        currentLevel,
        completedLessons,
        totalStudyTime,
        updateLessonProgress,
        completeLesson,
        addQuizResult,
        updateVocabularyCard,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}