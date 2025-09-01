import React, { useState } from 'react';
import { Save, User, Mail, Phone, Lock, Bell, Globe, Palette } from 'lucide-react';
import { User as UserType } from '../../../contexts/AuthContext';

interface UserSettingsProps {
  user: UserType;
}

export default function UserSettings({ user }: UserSettingsProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    preferences: {
      language: 'zh-CN',
      theme: 'light',
      autoPlay: true,
      fontSize: 'medium'
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    console.log('Settings saved:', formData);
  };

  const tabs = [
    { id: 'profile', label: '个人资料', icon: User },
    { id: 'security', label: '安全设置', icon: Lock },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'preferences', label: '偏好设置', icon: Palette }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">个人设置</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transform hover:scale-105 disabled:transform-none transition-all duration-200 shadow-lg"
        >
          <Save className="w-4 h-4" />
          {isSaving ? '保存中...' : '保存设置'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-100">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">
                    {user.role === 'admin' ? '管理员' : 
                     user.role === 'instructor' ? '教师' : '学生'}
                  </p>
                  <button className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
                    更换头像
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手机号
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    学习目标
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {user.learningGoals.map((goal) => (
                      <span key={goal} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">修改密码</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    当前密码
                  </label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    新密码
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    确认新密码
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">通知偏好</h3>
              <div className="space-y-4">
                {[
                  { key: 'email', label: '邮件通知', description: '接收学习提醒和重要更新' },
                  { key: 'push', label: '推送通知', description: '在设备上接收即时通知' },
                  { key: 'sms', label: '短信通知', description: '接收重要系统消息' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications[item.key as keyof typeof formData.notifications]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            [item.key]: e.target.checked
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">使用偏好</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    界面语言
                  </label>
                  <select
                    value={formData.preferences.language}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, language: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="zh-TW">繁体中文</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主题模式
                  </label>
                  <select
                    value={formData.preferences.theme}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, theme: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="light">浅色模式</option>
                    <option value="dark">深色模式</option>
                    <option value="auto">跟随系统</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    字体大小
                  </label>
                  <select
                    value={formData.preferences.fontSize}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, fontSize: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="small">小</option>
                    <option value="medium">中</option>
                    <option value="large">大</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">自动播放音频</p>
                    <p className="text-sm text-gray-600">在学习过程中自动播放发音</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferences.autoPlay}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, autoPlay: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-100 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Account Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">账户信息</p>
              <p className="text-sm text-blue-700">
                注册时间: {new Date(user.joinDate).toLocaleDateString('zh-CN')} | 
                最后登录: {new Date(user.lastLogin).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}