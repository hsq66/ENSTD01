import React, { useState } from 'react';
import { Plus, Search, Edit, Eye, Copy, BarChart3 } from 'lucide-react';

export default function LessonManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const mockLessons = [
    {
      id: '1',
      title: '基础问候语',
      category: 'vocabulary',
      level: 'A1',
      duration: 15,
      students: 45,
      completionRate: 92,
      avgScore: 85,
      status: 'published',
      lastUpdated: '2024-12-20',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      id: '2',
      title: '现在时态动词',
      category: 'grammar',
      level: 'A1',
      duration: 25,
      students: 38,
      completionRate: 78,
      avgScore: 72,
      status: 'published',
      lastUpdated: '2024-12-18',
      thumbnail: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      id: '3',
      title: '商务英语词汇',
      category: 'vocabulary',
      level: 'B2',
      duration: 30,
      students: 12,
      completionRate: 45,
      avgScore: 68,
      status: 'draft',
      lastUpdated: '2024-12-25',
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    }
  ];

  const filteredLessons = mockLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || lesson.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    const colors = {
      vocabulary: 'bg-blue-100 text-blue-700',
      grammar: 'bg-emerald-100 text-emerald-700',
      listening: 'bg-purple-100 text-purple-700',
      speaking: 'bg-yellow-100 text-yellow-700',
      reading: 'bg-orange-100 text-orange-700'
    };
    
    const labels = {
      vocabulary: '词汇',
      grammar: '语法',
      listening: '听力',
      speaking: '口语',
      reading: '阅读'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[category as keyof typeof colors]}`}>
        {labels[category as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
      }`}>
        {status === 'published' ? '已发布' : '草稿'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">课程管理</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
          <Plus className="w-4 h-4" />
          创建课程
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部类别</option>
            <option value="vocabulary">词汇</option>
            <option value="grammar">语法</option>
            <option value="listening">听力</option>
            <option value="speaking">口语</option>
            <option value="reading">阅读</option>
          </select>
        </div>
      </div>

      {/* Lesson Cards */}
      <div className="grid gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-64 h-48 md:h-auto relative">
                <img
                  src={lesson.thumbnail}
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {getStatusBadge(lesson.status)}
                  <span className="px-3 py-1 bg-gray-900 bg-opacity-75 text-white rounded-full text-sm">
                    {lesson.level}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryBadge(lesson.category)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 mb-4">
                        时长: {lesson.duration}分钟 | 最后更新: {new Date(lesson.lastUpdated).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{lesson.students}</p>
                      <p className="text-sm text-gray-600">学习人数</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">{lesson.completionRate}%</p>
                      <p className="text-sm text-gray-600">完成率</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{lesson.avgScore}%</p>
                      <p className="text-sm text-gray-600">平均分</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                      预览
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                      编辑
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                      <Copy className="w-4 h-4" />
                      复制
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors duration-200">
                      <BarChart3 className="w-4 h-4" />
                      分析
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">课程表现总结</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockLessons.length}</p>
            <p className="text-sm text-gray-600">总课程数</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {mockLessons.filter(l => l.status === 'published').length}
            </p>
            <p className="text-sm text-gray-600">已发布</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(mockLessons.reduce((sum, l) => sum + l.completionRate, 0) / mockLessons.length)}%
            </p>
            <p className="text-sm text-gray-600">平均完成率</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(mockLessons.reduce((sum, l) => sum + l.avgScore, 0) / mockLessons.length)}%
            </p>
            <p className="text-sm text-gray-600">平均分数</p>
          </div>
        </div>
      </div>
    </div>
  );
}