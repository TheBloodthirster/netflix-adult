import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userInfo, setUserInfo] = useState({
    name: '用户名',
    email: 'user@example.com',
    phone: '+86 138 0013 8000',
    birthday: '1990-01-01',
    avatar: '',
    bio: '这个人很懒，什么都没有留下...'
  });

  const [preferences, setPreferences] = useState({
    autoplay: true,
    autoplayPreviews: true,
    dataUsage: 'auto',
    downloadQuality: 'standard',
    notifications: {
      newReleases: true,
      recommendations: true,
      accountUpdates: false
    }
  });

  const [languageSettings, setLanguageSettings] = useState({
    displayLanguage: 'zh-CN',
    audioLanguage: 'zh-CN',
    subtitleLanguage: 'zh-CN',
    subtitleAppearance: {
      fontSize: 'medium',
      fontFamily: 'default',
      textColor: '#FFFFFF',
      backgroundColor: '#000000',
      backgroundOpacity: 75
    }
  });

  const [parentalControls, setParentalControls] = useState({
    enabled: false,
    maturityRating: 'PG-13',
    restrictedTitles: [],
    profilePin: '',
    allowedViewingHours: {
      start: '06:00',
      end: '22:00'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const handleLanguageChange = (field, value) => {
    setLanguageSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubtitleAppearanceChange = (field, value) => {
    setLanguageSettings(prev => ({
      ...prev,
      subtitleAppearance: {
        ...prev.subtitleAppearance,
        [field]: value
      }
    }));
  };

  const handleParentalControlChange = (field, value) => {
    setParentalControls(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveProfile = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', name: '个人信息', icon: '👤' },
    { id: 'preferences', name: '观看偏好', icon: '⚙️' },
    { id: 'language', name: '语言设置', icon: '🌐' },
    { id: 'parental', name: '家长控制', icon: '🔒' }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">个人资料</h1>
            <p className="text-gray-400">管理您的账户信息和偏好设置</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* 侧边栏导航 */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-gray-900 rounded-lg p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-netflix-red text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* 主内容区域 */}
            <div className="flex-1">
              <div className="bg-gray-900 rounded-lg p-6">
                {/* 个人信息标签页 */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">个人信息</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        {isEditing ? '取消编辑' : '编辑资料'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 flex items-center space-x-6 mb-6">
                        <div className="relative">
                          <div className="w-24 h-24 bg-netflix-red rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {userInfo.name.charAt(0)}
                          </div>
                          {isEditing && (
                            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{userInfo.name}</h3>
                          <p className="text-gray-400">{userInfo.email}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">用户名</label>
                        <input
                          type="text"
                          value={userInfo.name}
                          onChange={(e) => handleUserInfoChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">邮箱地址</label>
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => handleUserInfoChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">手机号码</label>
                        <input
                          type="tel"
                          value={userInfo.phone}
                          onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">生日</label>
                        <input
                          type="date"
                          value={userInfo.birthday}
                          onChange={(e) => handleUserInfoChange('birthday', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none disabled:opacity-50"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">个人简介</label>
                        <textarea
                          value={userInfo.bio}
                          onChange={(e) => handleUserInfoChange('bio', e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none disabled:opacity-50 resize-none"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4 mt-6">
                        <button
                          onClick={saveProfile}
                          className="px-6 py-3 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          保存更改
                        </button>
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          修改密码
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 观看偏好标签页 */}
                {activeTab === 'preferences' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">观看偏好</h2>
                    
                    <div className="space-y-6">
                      <div className="border-b border-gray-700 pb-6">
                        <h3 className="text-lg font-semibold text-white mb-4">播放设置</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium">自动播放下一集</p>
                              <p className="text-gray-400 text-sm">在一集结束后自动播放下一集</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences.autoplay}
                                onChange={(e) => handlePreferenceChange('autoplay', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium">自动播放预览</p>
                              <p className="text-gray-400 text-sm">在浏览时自动播放预览内容</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences.autoplayPreviews}
                                onChange={(e) => handlePreferenceChange('autoplayPreviews', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">通知设置</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium">新内容发布</p>
                              <p className="text-gray-400 text-sm">当有新的电影或剧集发布时通知我</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences.notifications.newReleases}
                                onChange={(e) => handleNotificationChange('newReleases', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium">个性化推荐</p>
                              <p className="text-gray-400 text-sm">根据我的观看历史推荐内容</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={preferences.notifications.recommendations}
                                onChange={(e) => handleNotificationChange('recommendations', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 语言设置标签页 */}
                {activeTab === 'language' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">语言和字幕设置</h2>
                    
                    <div className="space-y-6">
                      <div className="border-b border-gray-700 pb-6">
                        <h3 className="text-lg font-semibold text-white mb-4">语言偏好</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">界面语言</label>
                            <select
                              value={languageSettings.displayLanguage}
                              onChange={(e) => handleLanguageChange('displayLanguage', e.target.value)}
                              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                            >
                              <option value="zh-CN">简体中文</option>
                              <option value="zh-TW">繁體中文</option>
                              <option value="en-US">English</option>
                              <option value="ja-JP">日本語</option>
                              <option value="ko-KR">한국어</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">音频语言</label>
                            <select
                              value={languageSettings.audioLanguage}
                              onChange={(e) => handleLanguageChange('audioLanguage', e.target.value)}
                              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                            >
                              <option value="zh-CN">中文</option>
                              <option value="en-US">English</option>
                              <option value="ja-JP">日本語</option>
                              <option value="ko-KR">한국어</option>
                              <option value="original">原始语言</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">字幕外观</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">字体大小</label>
                              <select
                                value={languageSettings.subtitleAppearance.fontSize}
                                onChange={(e) => handleSubtitleAppearanceChange('fontSize', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                              >
                                <option value="small">小</option>
                                <option value="medium">中</option>
                                <option value="large">大</option>
                                <option value="xlarge">特大</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">背景透明度</label>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={languageSettings.subtitleAppearance.backgroundOpacity}
                                onChange={(e) => handleSubtitleAppearanceChange('backgroundOpacity', parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                              />
                              <div className="flex justify-between text-sm text-gray-400 mt-1">
                                <span>透明</span>
                                <span>{languageSettings.subtitleAppearance.backgroundOpacity}%</span>
                                <span>不透明</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-md font-medium text-white mb-3">预览效果</h4>
                            <div className="bg-gray-800 rounded-lg p-4 h-32 flex items-center justify-center relative">
                              <div 
                                className="px-3 py-1 rounded text-center"
                                style={{
                                  color: languageSettings.subtitleAppearance.textColor,
                                  backgroundColor: `${languageSettings.subtitleAppearance.backgroundColor}${Math.round(languageSettings.subtitleAppearance.backgroundOpacity * 2.55).toString(16).padStart(2, '0')}`,
                                  fontSize: languageSettings.subtitleAppearance.fontSize === 'small' ? '12px' : 
                                           languageSettings.subtitleAppearance.fontSize === 'medium' ? '14px' :
                                           languageSettings.subtitleAppearance.fontSize === 'large' ? '16px' : '18px'
                                }}
                              >
                                这是字幕预览效果
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 家长控制标签页 */}
                {activeTab === 'parental' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">家长控制</h2>
                    
                    <div className="space-y-6">
                      <div className="border-b border-gray-700 pb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">启用家长控制</h3>
                            <p className="text-gray-400 text-sm">限制不适合儿童观看的内容</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={parentalControls.enabled}
                              onChange={(e) => handleParentalControlChange('enabled', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
                          </label>
                        </div>
                      </div>

                      {parentalControls.enabled && (
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">内容分级限制</h3>
                          
                          <div>
                            <p className="text-gray-400 text-sm mb-3">选择允许观看的最高内容分级</p>
                            <div className="space-y-2">
                              {[
                                { value: 'G', label: 'G - 普通级', desc: '适合所有年龄观看' },
                                { value: 'PG', label: 'PG - 辅导级', desc: '建议家长指导观看' },
                                { value: 'PG-13', label: 'PG-13 - 特别辅导级', desc: '13岁以下需家长陪同' }
                              ].map((rating) => (
                                <label key={rating.value} className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="maturityRating"
                                    value={rating.value}
                                    checked={parentalControls.maturityRating === rating.value}
                                    onChange={(e) => handleParentalControlChange('maturityRating', e.target.value)}
                                    className="w-4 h-4 text-netflix-red bg-gray-800 border-gray-600 focus:ring-netflix-red"
                                  />
                                  <div>
                                    <p className="text-white">{rating.label}</p>
                                    <p className="text-gray-400 text-sm">{rating.desc}</p>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 修改密码模态框 */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">修改密码</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">当前密码</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">新密码</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">确认新密码</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default UserProfile;
