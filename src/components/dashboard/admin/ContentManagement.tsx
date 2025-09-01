import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Upload, BookOpen, Play } from 'lucide-react';

export default function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const mockContent = [
    {
      id: '1',
      title: 'Basic Greetings',
      category: 'vocabulary',
      level: 'A1',
      status: 'published',
      views: 12543,
      completions: 8932,
      rating: 4.8,
      lastUpdated: '2024-12-15',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      id: '2',
      title: 'Present Tense Verbs',
      category: 'grammar',
      level: 'A1',
      status: 'published',
      views: 9876,
      completions: 6543,
      rating: 4.6,
      lastUpdated: '2024-12-20',
      thumbnail: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    },
    {
      id: '3',
      title: 'Business Vocabulary',
      category: 'vocabulary',
      level: 'B2',
      status: 'draft',
      views: 0,
      completions: 0,
      rating: 0,
      lastUpdated: '2024-12-28',
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    }
  ];

  const filteredContent = mockContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || content.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || content.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
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
        status === 'published' ? 'bg-green-100 text-green-700' : 
        status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {status === 'published' ? '已发布' : status === 'draft' ? '草稿' : '已下线'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">内容管理</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
          <Plus className="w-4 h-4" />
          创建内容
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索内容..."
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
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Upload className="w-4 h-4" />
            批量上传
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6">
        {filteredContent.map((content) => (
          <div
            key={content.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-64 h-48 md:h-auto relative">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  {getStatusBadge(content.status)}
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryBadge(content.category)}
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {content.level}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h3>
                      <p className="text-gray-600 mb-4">
                        最后更新: {new Date(content.lastUpdated).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{content.views.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">浏览量</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-600">{content.completions.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">完成数</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-yellow-600">{content.rating}</p>
                      <p className="text-sm text-gray-600">评分</p>
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
                    <button className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                      删除
                    </button>
                    {content.status === 'published' && (
                      <button className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                        <Play className="w-4 h-4" />
                        分析
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">内容统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{mockContent.length}</p>
            <p className="text-sm text-gray-600">总内容数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {mockContent.filter(c => c.status === 'published').length}
            </p>
            <p className="text-sm text-gray-600">已发布</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {mockContent.filter(c => c.status === 'draft').length}
            </p>
            <p className="text-sm text-gray-600">草稿</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(mockContent.reduce((sum, c) => sum + c.rating, 0) / mockContent.filter(c => c.rating > 0).length * 10) / 10}
            </p>
            <p className="text-sm text-gray-600">平均评分</p>
          </div>
        </div>
      </div>
    </div>
  );
}