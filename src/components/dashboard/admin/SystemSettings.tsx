import React, { useState } from 'react';
import { Save, Shield, Database, Bell, Globe, Cpu, RefreshCw } from 'lucide-react';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: 'EnglishMaster',
    maxUsers: 100000,
    enableRegistration: true,
    enableNotifications: true,
    defaultLanguage: 'zh-CN',
    sessionTimeout: 30,
    backupInterval: 24,
    maintenanceMode: false,
    aiModelVersion: 'v2.1',
    enableAnalytics: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Simulate API call
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">系统设置</h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <Save className="w-4 h-4" />
          保存设置
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">基本设置</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              网站名称
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              最大用户数
            </label>
            <input
              type="number"
              value={settings.maxUsers}
              onChange={(e) => handleSettingChange('maxUsers', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              默认语言
            </label>
            <select
              value={settings.defaultLanguage}
              onChange={(e) => handleSettingChange('defaultLanguage', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="zh-CN">简体中文</option>
              <option value="zh-TW">繁体中文</option>
              <option value="en">English</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              会话超时 (分钟)
            </label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-bold text-gray-900">安全设置</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">允许用户注册</p>
              <p className="text-sm text-gray-600">控制新用户是否可以注册账户</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableRegistration}
                onChange={(e) => handleSettingChange('enableRegistration', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">维护模式</p>
              <p className="text-sm text-gray-600">启用后，普通用户无法访问系统</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* AI & Analytics Settings */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">AI设置</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI模型版本
              </label>
              <select
                value={settings.aiModelVersion}
                onChange={(e) => handleSettingChange('aiModelVersion', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="v2.1">v2.1 (最新)</option>
                <option value="v2.0">v2.0 (稳定)</option>
                <option value="v1.9">v1.9 (旧版)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-medium text-gray-900">启用数据分析</p>
                <p className="text-sm text-gray-600">收集用户行为数据用于改进服务</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableAnalytics}
                  onChange={(e) => handleSettingChange('enableAnalytics', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-emerald-600" />
            <h3 className="text-xl font-bold text-gray-900">数据库设置</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                备份间隔 (小时)
              </label>
              <input
                type="number"
                value={settings.backupInterval}
                onChange={(e) => handleSettingChange('backupInterval', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="font-medium text-gray-900">启用推送通知</p>
                <p className="text-sm text-gray-600">向用户发送学习提醒和系统通知</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <RefreshCw className="w-6 h-6 text-yellow-600" />
          <h3 className="text-xl font-bold text-gray-900">系统操作</h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-center">
            <Database className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">数据库备份</p>
          </button>
          
          <button className="p-4 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors duration-200 text-center">
            <RefreshCw className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">清理缓存</p>
          </button>
          
          <button className="p-4 border border-yellow-200 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors duration-200 text-center">
            <Bell className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">发送通知</p>
          </button>
          
          <button className="p-4 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">安全检查</p>
          </button>
        </div>
      </div>
    </div>
  );
}