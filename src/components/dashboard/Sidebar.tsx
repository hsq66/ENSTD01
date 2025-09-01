import React from 'react';
import { 
  BookOpen, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Trophy,
  Clock,
  MessageSquare
} from 'lucide-react';
import { useAuth, User } from '../../contexts/AuthContext';

interface SidebarProps {
  user: User;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ user, activeSection, onSectionChange, isOpen, onToggle }: SidebarProps) {
  const { logout } = useAuth();

  const menuItems = {
    admin: [
      { id: 'overview', label: '系统概览', icon: BarChart3 },
      { id: 'users', label: '用户管理', icon: Users },
      { id: 'content', label: '内容管理', icon: BookOpen },
      { id: 'analytics', label: '数据分析', icon: BarChart3 },
      { id: 'settings', label: '系统设置', icon: Settings }
    ],
    instructor: [
      { id: 'overview', label: '教学概览', icon: BarChart3 },
      { id: 'students', label: '学生管理', icon: Users },
      { id: 'lessons', label: '课程管理', icon: BookOpen },
      { id: 'feedback', label: '学习反馈', icon: MessageSquare },
      { id: 'settings', label: '个人设置', icon: Settings }
    ],
    learner: [
      { id: 'overview', label: '学习概览', icon: BarChart3 },
      { id: 'lessons', label: '我的课程', icon: BookOpen },
      { id: 'vocabulary', label: '词汇复习', icon: GraduationCap },
      { id: 'progress', label: '学习进度', icon: Trophy },
      { id: 'history', label: '学习历史', icon: Clock },
      { id: 'settings', label: '个人设置', icon: Settings }
    ]
  };

  const currentMenuItems = menuItems[user.role];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg lg:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EnglishMaster</span>
            </div>
          </div>

          {/* User profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">
                  {user.role === 'admin' ? '管理员' : 
                   user.role === 'instructor' ? '教师' : '学生'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {currentMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">退出登录</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}