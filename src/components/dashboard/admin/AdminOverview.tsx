import React from 'react';
import { Users, BookOpen, TrendingUp, Award, Activity, Globe, UserCheck, AlertTriangle } from 'lucide-react';

export default function AdminOverview() {
  const stats = {
    totalUsers: 125847,
    activeUsers: 8943,
    totalLessons: 1247,
    completedLessons: 45632,
    systemUptime: 99.9,
    serverLoad: 23
  };

  const recentActivity = [
    { id: 1, type: 'user_register', message: '新用户注册', count: 156, time: '最近24小时' },
    { id: 2, type: 'lesson_complete', message: '课程完成', count: 892, time: '最近24小时' },
    { id: 3, type: 'quiz_taken', message: '测验完成', count: 445, time: '最近24小时' },
    { id: 4, type: 'feedback', message: '用户反馈', count: 23, time: '最近24小时' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">系统概览</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Activity className="w-4 h-4 text-green-500" />
          <span>系统运行正常</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-gray-600">总用户数</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-600">+12%</span>
            <span className="text-gray-600">本月增长</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
              <p className="text-gray-600">活跃用户</p>
            </div>
            <UserCheck className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-600">+8%</span>
            <span className="text-gray-600">较昨日</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalLessons.toLocaleString()}</p>
              <p className="text-gray-600">课程总数</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-blue-600">+15</span>
            <span className="text-gray-600">本周新增</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.completedLessons.toLocaleString()}</p>
              <p className="text-gray-600">课程完成数</p>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-600">+25%</span>
            <span className="text-gray-600">本月增长</span>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">系统状态</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">系统运行时间</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">{stats.systemUptime}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">服务器负载</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stats.serverLoad < 50 ? 'bg-green-500' : stats.serverLoad < 80 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className="font-medium text-gray-900">{stats.serverLoad}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">数据库连接</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">正常</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">AI服务状态</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">运行中</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-emerald-600" />
            <h3 className="text-xl font-bold text-gray-900">实时活动</h3>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {activity.type === 'user_register' && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'lesson_complete' && <BookOpen className="w-4 h-4 text-green-600" />}
                    {activity.type === 'quiz_taken' && <Award className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'feedback' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">{activity.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">快速操作</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-center">
            <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-700">添加用户</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 text-center">
            <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-700">创建课程</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 text-center">
            <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-700">查看分析</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200 text-center">
            <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-gray-700">系统备份</p>
          </button>
        </div>
      </div>
    </div>
  );
}