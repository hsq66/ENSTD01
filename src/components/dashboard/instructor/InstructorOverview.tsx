import React from 'react';
import { Users, BookOpen, TrendingUp, Award, MessageSquare, Clock } from 'lucide-react';

export default function InstructorOverview() {
  const stats = {
    totalStudents: 127,
    activeStudents: 89,
    totalLessons: 24,
    avgCompletionRate: 78,
    feedbackCount: 45,
    avgScore: 82
  };

  const recentActivity = [
    {
      id: 1,
      type: 'completion',
      student: '张明',
      action: '完成了《基础语法》课程',
      time: '2小时前',
      score: 92
    },
    {
      id: 2,
      type: 'feedback',
      student: '李小华',
      action: '提交了学习反馈',
      time: '4小时前',
      rating: 5
    },
    {
      id: 3,
      type: 'question',
      student: '王小红',
      action: '提出了语法问题',
      time: '6小时前',
      status: 'pending'
    }
  ];

  const topPerformers = [
    {
      id: 1,
      name: '张明',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      score: 95,
      completedLessons: 18
    },
    {
      id: 2,
      name: '李小华',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      score: 90,
      completedLessons: 16
    },
    {
      id: 3,
      name: '王小红',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      score: 88,
      completedLessons: 15
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">教学概览</h1>
        <p className="text-gray-600">欢迎回来，李老师！查看您的学生进度和教学数据。</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              <p className="text-gray-600">总学生数</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-green-600">{stats.activeStudents}名</span>
            <span className="text-gray-600">活跃学生</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalLessons}</p>
              <p className="text-gray-600">创建课程</p>
            </div>
            <BookOpen className="w-8 h-8 text-emerald-600" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-600">{stats.avgCompletionRate}%</span>
            <span className="text-gray-600">平均完成率</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.avgScore}%</p>
              <p className="text-gray-600">平均成绩</p>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-600">+5%</span>
            <span className="text-gray-600">本月提升</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Top Performers */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">最近活动</h3>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'completion' ? 'bg-green-100' :
                  activity.type === 'feedback' ? 'bg-blue-100' :
                  'bg-yellow-100'
                }`}>
                  {activity.type === 'completion' && <Award className="w-5 h-5 text-green-600" />}
                  {activity.type === 'feedback' && <MessageSquare className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'question' && <BookOpen className="w-5 h-5 text-yellow-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.student}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                {activity.score && (
                  <div className="text-right">
                    <p className="font-bold text-green-600">{activity.score}%</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <h3 className="text-xl font-bold text-gray-900">优秀学生</h3>
          </div>
          
          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="relative">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">完成课程: {student.completedLessons}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-600">{student.score}%</p>
                  <p className="text-sm text-gray-600">平均分</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Class Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">班级学习表现</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">技能分布</h4>
            <div className="space-y-3">
              {[
                { skill: '词汇', score: 85, students: 45 },
                { skill: '语法', score: 78, students: 42 },
                { skill: '听力', score: 72, students: 38 },
                { skill: '口语', score: 68, students: 35 },
                { skill: '阅读', score: 80, students: 40 }
              ].map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{skill.skill}</span>
                    <span className="text-sm text-gray-600">{skill.score}% ({skill.students}人)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">等级分布</h4>
            <div className="space-y-3">
              {[
                { level: 'A1', count: 35, percentage: 28 },
                { level: 'A2', count: 42, percentage: 33 },
                { level: 'B1', count: 28, percentage: 22 },
                { level: 'B2', count: 15, percentage: 12 },
                { level: 'C1', count: 5, percentage: 4 },
                { level: 'C2', count: 2, percentage: 1 }
              ].map((level) => (
                <div key={level.level} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-gray-700">{level.level}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${level.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-sm text-gray-600">{level.count}人</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}