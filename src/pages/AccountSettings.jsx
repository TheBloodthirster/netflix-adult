import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AccountSettings() {
  const [activeTab, setActiveTab] = useState('account');
  const [userInfo, setUserInfo] = useState({
    email: 'user@example.com',
    phone: '+86 138****8888',
    name: '用户名',
    birthday: '1990-01-01'
  });
  
  const [subscription, setSubscription] = useState({
    plan: 'premium',
    nextBilling: '2024-02-15',
    price: '¥58/月',
    status: 'active'
  });

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      type: 'mobile',
      lastActive: '2024-01-15 14:30',
      location: '北京',
      current: true
    },
    {
      id: 2,
      name: 'MacBook Pro',
      type: 'computer',
      lastActive: '2024-01-15 10:15',
      location: '北京',
      current: false
    },
    {
      id: 3,
      name: 'Samsung Smart TV',
      type: 'tv',
      lastActive: '2024-01-14 20:45',
      location: '北京',
      current: false
    },
    {
      id: 4,
      name: 'iPad Air',
      type: 'tablet',
      lastActive: '2024-01-13 16:20',
      location: '上海',
      current: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      name: '招商银行信用卡',
      number: '**** **** **** 1234',
      expiry: '12/26',
      default: true
    },
    {
      id: 2,
      type: 'alipay',
      name: '支付宝',
      account: 'user@example.com',
      default: false
    },
    {
      id: 3,
      type: 'wechat',
      name: '微信支付',
      account: '138****8888',
      default: false
    }
  ]);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
    newContent: true,
    recommendations: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    watchHistory: 'private',
    recommendations: true,
    dataCollection: false,
    thirdPartySharing: false
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleUpdateUserInfo = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRemoveDevice = (deviceId) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  const handleSetDefaultPayment = (paymentId) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        default: method.id === paymentId
      }))
    );
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'mobile':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v14H7V4z"/>
          </svg>
        );
      case 'computer':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 13H5V5h14v11z"/>
          </svg>
        );
      case 'tv':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v2h8v-2l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 12H4V5h16v10z"/>
          </svg>
        );
      case 'tablet':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V5h12v14z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'account', name: '账户信息', icon: '👤' },
    { id: 'subscription', name: '订阅管理', icon: '💳' },
    { id: 'devices', name: '设备管理', icon: '📱' },
    { id: 'payment', name: '支付方式', icon: '💰' },
    { id: 'notifications', name: '通知设置', icon: '🔔' },
    { id: 'privacy', name: '隐私设置', icon: '🔒' }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">账户设置</h1>
            <p className="text-gray-400">管理您的账户信息和偏好设置</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 侧边栏导航 */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-netflix-red text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* 主要内容区域 */}
            <div className="lg:col-span-3">
              <div className="bg-gray-900 rounded-lg p-6">
                {/* 账户信息 */}
                {activeTab === 'account' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">账户信息</h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">邮箱地址</label>
                          <input
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => handleUpdateUserInfo('email', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">手机号码</label>
                          <input
                            type="tel"
                            value={userInfo.phone}
                            onChange={(e) => handleUpdateUserInfo('phone', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">用户名</label>
                          <input
                            type="text"
                            value={userInfo.name}
                            onChange={(e) => handleUpdateUserInfo('name', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">生日</label>
                          <input
                            type="date"
                            value={userInfo.birthday}
                            onChange={(e) => handleUpdateUserInfo('birthday', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                        <button className="bg-netflix-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                          保存更改
                        </button>
                        <button 
                          onClick={() => setShowPasswordModal(true)}
                          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          修改密码
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 订阅管理 */}
                {activeTab === 'subscription' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">订阅管理</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-white">当前订阅</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            subscription.status === 'active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {subscription.status === 'active' ? '活跃' : '已暂停'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div>
                            <p className="text-gray-400 text-sm">套餐类型</p>
                            <p className="text-white font-semibold">高级套餐</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">价格</p>
                            <p className="text-white font-semibold">{subscription.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">下次扣费</p>
                            <p className="text-white font-semibold">{subscription.nextBilling}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <button className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            升级套餐
                          </button>
                          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                            暂停订阅
                          </button>
                          <button className="text-red-400 hover:text-red-300 px-4 py-2 transition-colors">
                            取消订阅
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">套餐对比</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { name: '基础套餐', price: '¥25/月', features: ['标清画质', '1个设备', '无广告'] },
                            { name: '标准套餐', price: '¥35/月', features: ['高清画质', '2个设备', '无广告', '下载功能'] },
                            { name: '高级套餐', price: '¥58/月', features: ['超高清画质', '4个设备', '无广告', '下载功能', '杜比音效'] }
                          ].map((plan, index) => (
                            <div key={index} className={`border rounded-lg p-4 ${
                              plan.name === '高级套餐' ? 'border-netflix-red bg-netflix-red/10' : 'border-gray-600'
                            }`}>
                              <h4 className="text-white font-semibold mb-2">{plan.name}</h4>
                              <p className="text-2xl font-bold text-white mb-4">{plan.price}</p>
                              <ul className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="text-gray-300 text-sm flex items-center">
                                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 设备管理 */}
                {activeTab === 'devices' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">设备管理</h2>
                    
                    <div className="space-y-4">
                      {devices.map((device) => (
                        <div key={device.id} className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-gray-400">
                                {getDeviceIcon(device.type)}
                              </div>
                              <div>
                                <h3 className="text-white font-semibold flex items-center space-x-2">
                                  <span>{device.name}</span>
                                  {device.current && (
                                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                      当前设备
                                    </span>
                                  )}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  最后活跃: {device.lastActive} · {device.location}
                                </p>
                              </div>
                            </div>
                            
                            {!device.current && (
                              <button
                                onClick={() => handleRemoveDevice(device.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                移除设备
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                        </svg>
                        <div>
                          <h4 className="text-yellow-500 font-semibold">设备限制提醒</h4>
                          <p className="text-yellow-200 text-sm mt-1">
                            您的高级套餐最多支持4个设备同时使用。如需添加更多设备，请先移除不使用的设备。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 支付方式 */}
                {activeTab === 'payment' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">支付方式</h2>
                    
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                                {method.type === 'card' && '💳'}
                                {method.type === 'alipay' && '🅰️'}
                                {method.type === 'wechat' && '💬'}
                              </div>
                              <div>
                                <h3 className="text-white font-semibold flex items-center space-x-2">
                                  <span>{method.name}</span>
                                  {method.default && (
                                    <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded-full">
                                      默认
                                    </span>
                                  )}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                  {method.number || method.account}
                                  {method.expiry && ` · 有效期 ${method.expiry}`}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {!method.default && (
                                <button
                                  onClick={() => handleSetDefaultPayment(method.id)}
                                  className="text-netflix-red hover:text-red-400 transition-colors"
                                >
                                  设为默认
                                </button>
                              )}
                              <button className="text-gray-400 hover:text-white transition-colors">
                                编辑
                              </button>
                              <button className="text-red-400 hover:text-red-300 transition-colors">
                                删除
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="mt-6 bg-netflix-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                      添加支付方式
                    </button>
                  </div>
                )}

                {/* 通知设置 */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">通知设置</h2>
                    
                    <div className="space-y-6">
                      {[
                        { key: 'email', label: '邮件通知', desc: '接收账户和订阅相关的邮件通知' },
                        { key: 'sms', label: '短信通知', desc: '接收重要账户信息的短信提醒' },
                        { key: 'push', label: '推送通知', desc: '接收应用内推送通知' },
                        { key: 'marketing', label: '营销通知', desc: '接收促销活动和特别优惠信息' },
                        { key: 'newContent', label: '新内容通知', desc: '新剧集和电影上线时通知我' },
                        { key: 'recommendations', label: '推荐通知', desc: '根据观看历史推荐新内容' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0">
                          <div>
                            <h3 className="text-white font-medium">{item.label}</h3>
                            <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key] ? 'bg-netflix-red' : 'bg-gray-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 隐私设置 */}
                {activeTab === 'privacy' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">隐私设置</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-medium mb-4">个人资料可见性</h3>
                        <div className="space-y-3">
                          {[
                            { value: 'public', label: '公开', desc: '所有用户都可以看到您的个人资料' },
                            { value: 'friends', label: '仅好友', desc: '只有您的好友可以看到您的个人资料' },
                            { value: 'private', label: '私密', desc: '只有您自己可以看到个人资料信息' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="profileVisibility"
                                value={option.value}
                                checked={privacy.profileVisibility === option.value}
                                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                className="mt-1 text-netflix-red focus:ring-netflix-red"
                              />
                              <div>
                                <p className="text-white font-medium">{option.label}</p>
                                <p className="text-gray-400 text-sm">{option.desc}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-white font-medium mb-4">数据使用</h3>
                        <div className="space-y-4">
                          {[
                            { key: 'recommendations', label: '个性化推荐', desc: '使用观看历史改善推荐算法' },
                            { key: 'dataCollection', label: '数据收集', desc: '允许收集使用数据以改善服务' },
                            { key: 'thirdPartySharing', label: '第三方共享', desc: '与合作伙伴共享匿名使用数据' }
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium">{item.label}</h4>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                              </div>
                              <button
                                onClick={() => handlePrivacyChange(item.key, !privacy[item.key])}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  privacy[item.key] ? 'bg-netflix-red' : 'bg-gray-600'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    privacy[item.key] ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-white font-medium mb-4">账户操作</h3>
                        <div className="space-y-3">
                          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                            下载我的数据
                          </button>
                          <button 
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            删除账户
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 删除账户确认模态框 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">确认删除账户</h3>
            <p className="text-gray-300 mb-6">
              删除账户将永久移除您的所有数据，包括观看历史、收藏列表和个人设置。此操作无法撤销。
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                取消
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

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
              <button className="flex-1 px-4 py-2 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors">
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

export default AccountSettings;
