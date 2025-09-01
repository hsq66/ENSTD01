import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, UserCheck, UserX, Filter } from 'lucide-react';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockUsers = [
    {
      id: '1',
      name: '张明',
      email: 'zhang.ming@email.com',
      phone: '13800138001',
      role: 'learner',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-12-30',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: '2',
      name: '李老师',
      email: 'li.teacher@email.com',
      phone: '13800138002',
      role: 'instructor',
      status: 'active',
      joinDate: '2023-09-01',
      lastLogin: '2024-12-30',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: '3',
      name: '王小红',
      email: 'wang.xiaohong@email.com',
      phone: '13800138003',
      role: 'learner',
      status: 'inactive',
      joinDate: '2024-02-20',
      lastLogin: '2024-12-15',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-700',
      instructor: 'bg-blue-100 text-blue-700',
      learner: 'bg-green-100 text-green-700'
    };
    const labels = {
      admin: '管理员',
      instructor: '教师',
      learner: '学生'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[role as keyof typeof colors]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {status === 'active' ? '活跃' : '非活跃'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">用户管理</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
          <Plus className="w-4 h-4" />
          添加用户
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索用户..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部角色</option>
            <option value="learner">学生</option>
            <option value="instructor">教师</option>
            <option value="admin">管理员</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部状态</option>
            <option value="active">活跃</option>
            <option value="inactive">非活跃</option>
          </select>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="w-4 h-4" />
            高级筛选
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">用户</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">角色</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">状态</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">注册日期</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">最后登录</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(user.joinDate).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(user.lastLogin).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors duration-200">
                        {user.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">用户概览</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{filteredUsers.length}</p>
            <p className="text-gray-600">搜索结果</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {filteredUsers.filter(u => u.status === 'active').length}
            </p>
            <p className="text-gray-600">活跃用户</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {filteredUsers.filter(u => u.role === 'learner').length}
            </p>
            <p className="text-gray-600">学生用户</p>
          </div>
        </div>
      </div>
    </div>
  );
}