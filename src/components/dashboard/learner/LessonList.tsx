import React, { useState } from 'react';
import { Play, Clock, CheckCircle, Star, Filter } from 'lucide-react';
import { Lesson } from '../../../contexts/LearningContext';

interface LessonListProps {
  lessons: Lesson[];
}

export default function LessonList({ lessons }: LessonListProps) {
  const [filter, setFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredLessons = lessons.filter(lesson => {
    if (filter === 'completed' && !lesson.isCompleted) return false;
    if (filter === 'in-progress' && (lesson.isCompleted || lesson.progress === 0)) return false;
    if (filter === 'not-started' && lesson.progress > 0) return false;
    if (levelFilter !== 'all' && lesson.level !== levelFilter) return false;
    return true;
  });

  const levelColors = {
    'A1': 'bg-green-100 text-green-700',
    'A2': 'bg-blue-100 text-blue-700',
    'B1': 'bg-yellow-100 text-yellow-700',
    'B2': 'bg-orange-100 text-orange-700',
    'C1': 'bg-red-100 text-red-700',
    'C2': 'bg-purple-100 text-purple-700'
  };

  const categoryIcons = {
    vocabulary: '📚',
    grammar: '📝',
    listening: '🎧',
    speaking: '🎤',
    reading: '📖'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">我的课程</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部课程</option>
            <option value="not-started">未开始</option>
            <option value="in-progress">学习中</option>
            <option value="completed">已完成</option>
          </select>
          
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部等级</option>
            <option value="A1">A1 初级</option>
            <option value="A2">A2 初级+</option>
            <option value="B1">B1 中级</option>
            <option value="B2">B2 中级+</option>
            <option value="C1">C1 高级</option>
            <option value="C2">C2 精通</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden group"
          >
            <div className="md:flex">
              <div className="md:w-64 h-48 md:h-auto">
                <img
                  src={lesson.thumbnail}
                  alt={lesson.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{categoryIcons[lesson.category]}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelColors[lesson.level as keyof typeof levelColors]}`}>
                          {lesson.level}
                        </span>
                        {lesson.isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 mb-4">{lesson.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration}分钟</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                  
                  {lesson.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">进度</span>
                        <span className="text-sm font-medium text-gray-900">{lesson.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${lesson.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                      <Play className="w-4 h-4" />
                      {lesson.isCompleted ? '复习课程' : lesson.progress > 0 ? '继续学习' : '开始学习'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}