import React, { useState } from 'react';
import { ArrowLeft, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onBack: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onBack, onSwitchToRegister }: LoginFormProps) {
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(phone, password);
      if (!success) {
        setError('手机号或密码错误，请重试');
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">登录账户</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="请输入手机号"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="请输入密码"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transform hover:scale-105 disabled:transform-none transition-all duration-200 shadow-lg font-medium"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              还没有账户？立即注册
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">演示账户：</p>
            <p className="text-xs text-gray-500">学生: 13800138001 / 123456</p>
            <p className="text-xs text-gray-500">老师: 13800138002 / 123456</p>
            <p className="text-xs text-gray-500">管理员: 13800138000 / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}