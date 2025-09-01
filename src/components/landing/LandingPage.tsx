import React from 'react';
import { BookOpen, Users, Award, Smartphone, Brain, Globe } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function LandingPage({ onLogin, onRegister }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EnglishMaster</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onLogin}
              className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              登录
            </button>
            <button
              onClick={onRegister}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              免费注册
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                AI驱动的
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                  智能英语
                </span>
                学习平台
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                基于艾宾浩斯遗忘曲线的科学记忆法，为中国学生量身定制的英语学习解决方案。
                从小学到大学，从CET-4到IELTS，我们助您实现英语学习目标。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onRegister}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl text-lg font-medium"
                >
                  开始免费学习
                </button>
                <button
                  onClick={onLogin}
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 text-lg font-medium"
                >
                  已有账户登录
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                alt="Students learning English"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="font-bold text-gray-900">98%</p>
                    <p className="text-sm text-gray-600">学习效率提升</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              为什么选择EnglishMaster？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我们结合了最新的AI技术和经过验证的学习方法，为您提供最高效的英语学习体验
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI智能个性化</h3>
              <p className="text-gray-600 leading-relaxed">
                基于你的学习进度和薄弱环节，AI自动调整学习内容难度，提供个性化的学习路径和练习建议。
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-emerald-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">科学记忆法</h3>
              <p className="text-gray-600 leading-relaxed">
                运用艾宾浩斯遗忘曲线理论，通过间隔重复算法确保词汇和语法知识的长期记忆和有效巩固。
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-orange-200">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <Smartphone className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">多端同步学习</h3>
              <p className="text-gray-600 leading-relaxed">
                支持手机、平板、电脑多设备学习，学习进度实时同步，随时随地继续你的英语学习之旅。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <p className="text-4xl font-bold mb-2">50万+</p>
              <p className="text-blue-100">注册用户</p>
            </div>
            <div className="text-white">
              <p className="text-4xl font-bold mb-2">1000+</p>
              <p className="text-blue-100">学习课程</p>
            </div>
            <div className="text-white">
              <p className="text-4xl font-bold mb-2">98%</p>
              <p className="text-blue-100">满意度</p>
            </div>
            <div className="text-white">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-blue-100">在线支持</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            开始你的英语学习之旅
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            加入我们的学习社区，与千万学习者一起进步
          </p>
          <button
            onClick={onRegister}
            className="px-12 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl text-xl font-medium"
          >
            立即免费注册
          </button>
        </div>
      </section>
    </div>
  );
}