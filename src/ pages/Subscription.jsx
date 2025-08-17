import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../hooks/useDatabase';
import { useToast } from '../hooks/useToast';

function Subscription() {
  const { user } = useUser();
  const { showToast } = useToast();
  const [currentPlan, setCurrentPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: '基础套餐',
      price: { monthly: 25, yearly: 250 },
      features: [
        '标清画质 (480p)',
        '1个设备同时观看',
        '无限观看时长',
        '手机和平板观看',
        '基础内容库'
      ],
      color: 'gray',
      popular: false
    },
    {
      id: 'standard',
      name: '标准套餐',
      price: { monthly: 35, yearly: 350 },
      features: [
        '高清画质 (1080p)',
        '2个设备同时观看',
        '无限观看时长',
        '所有设备观看',
        '完整内容库',
        '离线下载'
      ],
      color: 'blue',
      popular: false
    },
    {
      id: 'premium',
      name: '高级套餐',
      price: { monthly: 45, yearly: 450 },
      features: [
        '超高清画质 (4K+HDR)',
        '4个设备同时观看',
        '无限观看时长',
        '所有设备观看',
        '完整内容库',
        '离线下载',
        '杜比全景声',
        '独家内容'
      ],
      color: 'netflix-red',
      popular: true
    },
    {
      id: 'family',
      name: '家庭套餐',
      price: { monthly: 65, yearly: 650 },
      features: [
        '超高清画质 (4K+HDR)',
        '6个设备同时观看',
        '无限观看时长',
        '所有设备观看',
        '完整内容库',
        '离线下载',
        '杜比全景声',
        '独家内容',
        '家长控制',
        '个人档案管理'
      ],
      color: 'purple',
      popular: false
    }
  ];

  const addOns = [
    {
      id: 'sports',
      name: '体育频道包',
      price: 15,
      description: '包含所有体育赛事直播和回放',
      icon: '⚽'
    },
    {
      id: 'kids',
      name: '儿童内容包',
      description: '专为儿童设计的安全内容',
      price: 10,
      icon: '🧸'
    },
    {
      id: 'documentary',
      name: '纪录片专区',
      price: 8,
      description: '高质量纪录片和教育内容',
      icon: '🎬'
    }
  ];

  const handlePlanChange = (planId) => {
    setCurrentPlan(planId);
    showToast(`已切换到${plans.find(p => p.id === planId)?.name}`, 'success');
  };

  const handleCancelSubscription = () => {
    setShowCancelModal(false);
    showToast('订阅已取消，将在当前计费周期结束后生效', 'info');
  };

  const getSavings = (plan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyPrice = plan.price.yearly;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            💳 订阅管理
          </h1>
          <p className="text-gray-300 text-lg">
            管理你的订阅计划和付费选项
          </p>
        </div>

        <div className="bg-gradient-to-r from-netflix-red/20 to-red-600/20 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">当前订阅</h3>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-netflix-red">
                  {plans.find(p => p.id === currentPlan)?.name}
                </span>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                  活跃
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-1">
                下次续费: 2024年9月15日 • ¥{plans.find(p => p.id === currentPlan)?.price[billingCycle]}/{billingCycle === 'monthly' ? '月' : '年'}
              </p>
            </div>
            <div className="text-right">
              <button 
                onClick={() => setShowCancelModal(true)}
                className="text-red-400 hover:text-red-300 transition-colors text-sm"
              >
                取消订阅
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-netflix-red text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                按月付费
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-netflix-red text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                按年付费
                <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded">省钱</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map(plan => {
              const savings = getSavings(plan);
              const isCurrentPlan = plan.id === currentPlan;
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-gray-800/50 rounded-lg p-6 transition-all hover:bg-gray-800/70 ${
                    isCurrentPlan ? 'ring-2 ring-netflix-red' : ''
                  } ${plan.popular ? 'transform scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-netflix-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                        最受欢迎
                      </span>
                    </div>
                  )}
                  
                  {isCurrentPlan && (
                    <div className="absolute -top-3 right-4">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        当前计划
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-white">
                        ¥{plan.price[billingCycle]}
                      </span>
                      <span className="text-gray-400">
                        /{billingCycle === 'monthly' ? '月' : '年'}
                      </span>
                    </div>
                    
                    {billingCycle === 'yearly' && (
                      <div className="text-green-400 text-sm">
                        节省 ¥{savings.amount} ({savings.percentage}%)
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanChange(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      isCurrentPlan
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : plan.color === 'netflix-red'
                        ? 'bg-netflix-red text-white hover:bg-red-700'
                        : plan.color === 'blue'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : plan.color === 'purple'
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    {isCurrentPlan ? '当前计划' : '选择此计划'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">📦 附加服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map(addon => (
              <div key={addon.id} className="bg-gray-800/50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{addon.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold">{addon.name}</h3>
                      <p className="text-gray-400 text-sm">{addon.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">¥{addon.price}</div>
                    <div className="text-gray-400 text-xs">/月</div>
                  </div>
                </div>
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors">
                  添加到订阅
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">💰 费用明细</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">基础套餐</span>
                <span className="text-white">¥{plans.find(p => p.id === currentPlan)?.price[billingCycle]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">税费</span>
                <span className="text-white">¥{Math.floor(plans.find(p => p.id === currentPlan)?.price[billingCycle] * 0.1)}</span>
              </div>
              <div className="border-t border-gray-600 pt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">总计</span>
                  <span className="text-netflix-red">
                    ¥{Math.floor(plans.find(p => p.id === currentPlan)?.price[billingCycle] * 1.1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">🎁 推荐奖励</h3>
            <p className="text-gray-300 mb-4">
              邀请朋友加入Netflix，你和朋友都可以获得一个月免费订阅！
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                value="https://netflix.com/invite/abc123"
                readOnly
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('https://netflix.com/invite/abc123');
                  showToast('邀请链接已复制', 'success');
                }}
                className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                复制
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              已成功邀请: 3人 • 获得奖励: 3个月免费
            </div>
          </div>
        </div>

        {showCancelModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-4">
              <h3 className="text-xl font-semibold text-white mb-4">确认取消订阅</h3>
              <p className="text-gray-300 mb-6">
                取消后，你将在当前计费周期结束后失去对Netflix的访问权限。你确定要取消吗？
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  保留订阅
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  确认取消
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Subscription;
