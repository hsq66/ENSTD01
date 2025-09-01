import React from 'react';
import { TrendingUp, Trophy, Target, Calendar, BookOpen, Brain } from 'lucide-react';
import { User } from '../../../contexts/AuthContext';

interface LearningStats {
  lessons: any[];
  vocabularyCards: any[];
  quizResults: any[];
  currentLevel: string;
  completedLessons: number;
  totalStudyTime: number;
}

interface ProgressViewProps {
  user: User;
  learning: LearningStats;
}

export default function ProgressView({ user, learning }: ProgressViewProps) {
  const weeklyData = [
    { day: '周一', minutes: 45, target: 60 },
    { day: '周二', minutes: 30, target: 60 },
    { day: '周三', minutes: 75, target: 60 },
    { day: '周四', minutes: 60, target: 60 },
    { day: '周五', minutes: 90, target: 60 },
    { day: '周六', minutes: 40, target: 60 },
    { day: '周日', minutes: 55, target: 60 }
  ];

  const levelProgress = {
    'A1': 100,
    'A2': 75,
    'B1': 0,
    'B2': 0,
    'C1': 0,
    'C2': 0
  };

  const skillsProgress = [
    { skill: '词汇', progress: 85, color: 'blue' },
    { skill: '语法', progress: 72, color: 'emerald' },
    { skill: '听力', progress: 68, color: 'yellow' },
    { skill: '口语', progress: 45, color: 'orange' },
    { skill: '阅读', progress: 78, color: 'purple' }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">学习进度</h2>

      {/* Level Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <h3 className="text-xl font-bold text-gray-900">等级进度</h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(levelProgress).map(([level, progress]) => (
            <div key={level} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-gray-700">{level}</div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      progress === 100 ? 'bg-green-500' :
                      progress > 0 ? 'bg-gradient-to-r from-blue-600 to-emerald-600' :
                      'bg-gray-300'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-sm text-gray-600">{progress}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">技能分析</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {skillsProgress.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{skill.skill}</span>
                  <span className="text-sm text-gray-600">{skill.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 bg-${skill.color}-600`}
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${3.52 * 69.6} ${352}`}
                  className="text-blue-600"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">69.6%</span>
                <span className="text-xs text-gray-600">综合水平</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Study Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-bold text-gray-900">本周学习时长</h3>
        </div>
        
        <div className="grid grid-cols-7 gap-2 h-48">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex-1 flex flex-col justify-end w-full">
                <div 
                  className="bg-gradient-to-t from-blue-600 to-emerald-600 rounded-t-lg transition-all duration-500 hover:shadow-lg"
                  style={{ 
                    height: `${(day.minutes / Math.max(...weeklyData.map(d => d.target))) * 100}%`,
                    minHeight: day.minutes > 0 ? '8px' : '0px'
                  }}
                />
                <div 
                  className="bg-gray-200 w-full"
                  style={{ 
                    height: `${((day.target - day.minutes) / Math.max(...weeklyData.map(d => d.target))) * 100}%`
                  }}
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-600">{day.day}</p>
                <p className="text-sm font-medium text-gray-900">{day.minutes}m</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Streak */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-orange-600" />
            <h3 className="text-lg font-bold text-gray-900">学习连击</h3>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-600 mb-2">7</p>
            <p className="text-gray-600">连续学习天数</p>
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-600 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">AI推荐</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">重点复习</p>
              <p className="text-xs text-purple-700">建议加强口语练习</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">学习建议</p>
              <p className="text-xs text-blue-700">可以开始B1级别课程</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}