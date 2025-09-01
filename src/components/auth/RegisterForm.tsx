import React, { useState } from 'react';
import { ArrowLeft, Phone, Lock, Eye, EyeOff, User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onBack, onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    educationLevel: '',
    learningGoals: [] as string[]
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const educationLevels = [
    { value: 'primary', label: '小学' },
    { value: 'secondary', label: '中学' },
    { value: 'university', label: '大学' },
    { value: 'graduate', label: '研究生' }
  ];

  const learningGoalOptions = [
    'CET-4', 'CET-6', 'IELTS', 'TOEFL', 'Business English', 
    'Daily Conversation', 'Academic Writing', 'Pronunciation'
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    const newGoals = formData.learningGoals.includes(goal)
      ? formData.learningGoals.filter(g => g !== goal)
      : [...formData.learningGoals, goal];
    handleInputChange('learningGoals', newGoals);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('密码确认不匹配');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await register({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age),
        educationLevel: formData.educationLevel,
        learningGoals: formData.learningGoals
      });
      
      if (!success) {
        setError('注册失败，请稍后重试');
      }
    } catch (err) {
      setError('注册失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={step === 1 ? onBack : () => setStep(1)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 ml-4">
              {step === 1 ? '创建账户' : '学习偏好'}
            </h1>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="请输入您的姓名"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手机号
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="请输入手机号"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="请输入邮箱地址"
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
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    确认密码
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="请再次输入密码"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-medium"
                >
                  下一步
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    年龄
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="请输入年龄"
                      min="6"
                      max="100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    教育程度
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">请选择教育程度</option>
                    {educationLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    学习目标（可多选）
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {learningGoalOptions.map(goal => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => handleGoalToggle(goal)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                          formData.learningGoals.includes(goal)
                            ? 'bg-blue-100 border-blue-300 text-blue-700'
                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
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
                  {isLoading ? '注册中...' : '完成注册'}
                </button>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              已有账户？立即登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}