import React, { useState } from 'react';
import { MessageSquare, Star, Reply, Filter, Clock, CheckCircle } from 'lucide-react';

export default function StudentFeedback() {
  const [filter, setFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const mockFeedback = [
    {
      id: '1',
      student: {
        name: '张明',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      lesson: '基础问候语',
      rating: 5,
      message: '这个课程非常有用！讲解清晰，例句很实用。希望能有更多类似的课程。',
      date: '2024-12-29',
      status: 'pending',
      category: 'course_feedback'
    },
    {
      id: '2',
      student: {
        name: '李小华',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      lesson: '现在时态动词',
      rating: 4,
      message: '语法解释很详细，但是练习题有点少。能不能增加一些互动练习？',
      date: '2024-12-28',
      status: 'replied',
      category: 'suggestion'
    },
    {
      id: '3',
      student: {
        name: '王小红',
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      },
      lesson: '听力理解训练',
      rating: 3,
      message: '音频质量有些模糊，希望能提供更清晰的录音。内容本身很好。',
      date: '2024-12-27',
      status: 'pending',
      category: 'technical_issue'
    }
  ];

  const filteredFeedback = mockFeedback.filter(feedback => {
    if (filter === 'pending') return feedback.status === 'pending';
    if (filter === 'replied') return feedback.status === 'replied';
    if (filter === 'high_rating') return feedback.rating >= 4;
    if (filter === 'low_rating') return feedback.rating <= 3;
    return true;
  });

  const getStatusBadge = (status: string) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
      }`}>
        {status === 'pending' ? '待回复' : '已回复'}
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      course_feedback: 'bg-blue-100 text-blue-700',
      suggestion: 'bg-emerald-100 text-emerald-700',
      technical_issue: 'bg-red-100 text-red-700',
      general: 'bg-gray-100 text-gray-700'
    };
    
    const labels = {
      course_feedback: '课程反馈',
      suggestion: '建议',
      technical_issue: '技术问题',
      general: '一般反馈'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[category as keyof typeof colors]}`}>
        {labels[category as keyof typeof labels]}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">学习反馈</h2>
        
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部反馈</option>
            <option value="pending">待回复</option>
            <option value="replied">已回复</option>
            <option value="high_rating">高评分</option>
            <option value="low_rating">低评分</option>
          </select>
        </div>
      </div>

      {/* Feedback Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">反馈概览</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{mockFeedback.length}</p>
            <p className="text-sm text-gray-600">总反馈数</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">
              {mockFeedback.filter(f => f.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">待回复</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {Math.round(mockFeedback.reduce((sum, f) => sum + f.rating, 0) / mockFeedback.length * 10) / 10}
            </p>
            <p className="text-sm text-gray-600">平均评分</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round((mockFeedback.filter(f => f.status === 'replied').length / mockFeedback.length) * 100)}%
            </p>
            <p className="text-sm text-gray-600">回复率</p>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={feedback.student.avatar}
                  alt={feedback.student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{feedback.student.name}</h4>
                    {getCategoryBadge(feedback.category)}
                    {getStatusBadge(feedback.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">课程: {feedback.lesson}</p>
                  <div className="flex items-center gap-3 mb-3">
                    {renderStars(feedback.rating)}
                    <span className="text-sm text-gray-600">
                      {new Date(feedback.date).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                  <Reply className="w-4 h-4" />
                  回复
                </button>
                {feedback.status === 'pending' && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200">
                    <CheckCircle className="w-4 h-4" />
                    标记已处理
                  </button>
                )}
              </div>
            </div>
            
            {selectedFeedback === feedback.id && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <textarea
                  placeholder="输入您的回复..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex gap-3 mt-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    发送回复
                  </button>
                  <button 
                    onClick={() => setSelectedFeedback(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无反馈</h3>
          <p className="text-gray-600">当前筛选条件下没有找到相关反馈。</p>
        </div>
      )}
    </div>
  );
}