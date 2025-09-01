import React from 'react';
import { Trophy, Clock, BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';
import { User } from '../../../contexts/AuthContext';

interface LearningStats {
  lessons: any[];
  vocabularyCards: any[];
  quizResults: any[];
  currentLevel: string;
  completedLessons: number;
  totalStudyTime: number;
}

interface LearnerOverviewProps {
  user: User;
  learning: LearningStats;
}

export default function LearnerOverview({ user, learning }: LearnerOverviewProps) {
  const averageScore = learning.quizResults.length > 0
    ? Math.round(learning.quizResults.reduce((sum, result) => sum + result.score, 0) / learning.quizResults.length)
    : 0;

  const todayStudyTime = 45; // Mock data
  const weeklyGoal = 300; // minutes
  const weekProgress = (todayStudyTime / weeklyGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">欢迎回来, {user.name}!</h1>
            <p className="text-blue-100 text-lg">
              今天也要继续加油学习英语哦 🚀
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{learning.currentLevel}</p>
            <p className="text-blue-100">当前等级</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{learning.completedLessons}</p>
              <p className="text-gray-600">已完成课程</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{Math.round(learning.totalStudyTime / 60)}h</p>
              <p className="text-gray-600">总学习时长</p>
            </div>
            <Clock className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{averageScore}%</p>
              <p className="text-gray-600">平均成绩</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{learning.vocabularyCards.length}</p>
              <p className="text-gray-600">掌握词汇</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">今日学习进度</h3>
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">学习时长</span>
                <span className="font-medium">{todayStudyTime}分钟 / {weeklyGoal}分钟</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(weekProgress, 100)}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-sm text-gray-600">今日完成课程</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">25</p>
                <p className="text-sm text-gray-600">复习词汇数</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">学习表现</h3>
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2.26 * averageScore} ${226}`}
                    className="text-blue-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">{averageScore}%</span>
                </div>
              </div>
              <p className="text-gray-600">综合表现评分</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">+12%</p>
                <p className="text-sm text-gray-600">本周进步</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">7天</p>
                <p className="text-sm text-gray-600">连续学习</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">最近活动</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">完成《Basic Greetings》课程</p>
              <p className="text-sm text-gray-600">2小时前</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">开始学习《Present Tense Verbs》</p>
              <p className="text-sm text-gray-600">昨天</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">词汇复习得分92%</p>
              <p className="text-sm text-gray-600">3天前</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}