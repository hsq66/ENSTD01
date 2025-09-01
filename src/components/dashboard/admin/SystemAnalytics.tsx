import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Clock, Download } from 'lucide-react';

export default function SystemAnalytics() {
  const [dateRange, setDateRange] = useState('7d');
  const [metric, setMetric] = useState('users');

  const analyticsData = {
    userGrowth: [
      { period: '1月', users: 15420 },
      { period: '2月', users: 18750 },
      { period: '3月', users: 22340 },
      { period: '4月', users: 26890 },
      { period: '5月', users: 31250 },
      { period: '6月', users: 35670 },
    ],
    contentEngagement: [
      { level: 'A1', views: 45230, completions: 32180 },
      { level: 'A2', views: 38950, completions: 28760 },
      { level: 'B1', views: 29870, completions: 19340 },
      { level: 'B2', views: 18430, completions: 11890 },
      { level: 'C1', views: 8950, completions: 4560 },
      { level: 'C2', views: 3420, completions: 1230 },
    ],
    deviceUsage: [
      { device: '移动端', percentage: 68, users: 85476 },
      { device: '桌面端', percentage: 28, users: 35237 },
      { device: '平板', percentage: 4, users: 5034 }
    ]
  };

  const kpiCards = [
    {
      title: '日活跃用户',
      value: '8,943',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: '课程完成率',
      value: '73.2%',
      change: '+5%',
      trend: 'up',
      icon: BookOpen,
      color: 'emerald'
    },
    {
      title: '平均学习时长',
      value: '28分钟',
      change: '+8%',
      trend: 'up',
      icon: Clock,
      color: 'purple'
    },
    {
      title: '用户满意度',
      value: '4.8/5.0',
      change: '+0.2',
      trend: 'up',
      icon: TrendingUp,
      color: 'yellow'
    }
  ];

  const maxViews = Math.max(...analyticsData.contentEngagement.map(item => item.views));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">数据分析</h2>
        
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">最近7天</option>
            <option value="30d">最近30天</option>
            <option value="90d">最近90天</option>
            <option value="1y">最近1年</option>
          </select>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200">
            <Download className="w-4 h-4" />
            导出报告
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${kpi.color}-100`}>
                  <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{kpi.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-gray-600">{kpi.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">用户增长趋势</h3>
          <BarChart3 className="w-6 h-6 text-blue-600" />
        </div>
        
        <div className="h-64 flex items-end justify-between gap-4">
          {analyticsData.userGrowth.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-600 to-emerald-600 rounded-t-lg transition-all duration-500 hover:shadow-lg cursor-pointer"
                style={{ 
                  height: `${(data.users / Math.max(...analyticsData.userGrowth.map(d => d.users))) * 200}px`,
                  minHeight: '20px'
                }}
              />
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-gray-900">{data.period}</p>
                <p className="text-xs text-gray-600">{data.users.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Performance */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">各等级内容表现</h3>
          
          <div className="space-y-4">
            {analyticsData.contentEngagement.map((item) => (
              <div key={item.level} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{item.level}</span>
                  <span className="text-sm text-gray-600">
                    {item.views.toLocaleString()} 浏览 / {item.completions.toLocaleString()} 完成
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(item.views / maxViews) * 100}%` }}
                  />
                </div>
                <div className="text-right">
                  <span className="text-sm text-emerald-600 font-medium">
                    完成率: {Math.round((item.completions / item.views) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">设备使用分布</h3>
          
          <div className="space-y-6">
            {analyticsData.deviceUsage.map((device, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{device.device}</span>
                    <span className="text-sm text-gray-600">{device.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-blue-600' :
                        index === 1 ? 'bg-emerald-600' :
                        'bg-purple-600'
                      }`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{device.users.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">用户</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">系统活动日志</h3>
        
        <div className="space-y-4">
          {[
            { time: '2小时前', action: '新用户注册', details: '张明 注册了新账户', type: 'user' },
            { time: '3小时前', action: '内容更新', details: '《商务英语词汇》课程已发布', type: 'content' },
            { time: '5小时前', action: '系统维护', details: '数据库优化完成', type: 'system' },
            { time: '8小时前', action: '用户反馈', details: '收到15条新的用户反馈', type: 'feedback' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'user' ? 'bg-blue-100' :
                activity.type === 'content' ? 'bg-emerald-100' :
                activity.type === 'system' ? 'bg-purple-100' :
                'bg-yellow-100'
              }`}>
                {activity.type === 'user' && <Users className="w-5 h-5 text-blue-600" />}
                {activity.type === 'content' && <BookOpen className="w-5 h-5 text-emerald-600" />}
                {activity.type === 'system' && <BarChart3 className="w-5 h-5 text-purple-600" />}
                {activity.type === 'feedback' && <TrendingUp className="w-5 h-5 text-yellow-600" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}