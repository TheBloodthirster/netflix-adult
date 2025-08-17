import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('account');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'account', name: '账户管理', icon: '👤' },
    { id: 'billing', name: '账单支付', icon: '💳' },
    { id: 'streaming', name: '播放问题', icon: '▶️' },
    { id: 'devices', name: '设备支持', icon: '📱' },
    { id: 'content', name: '内容相关', icon: '🎬' },
    { id: 'technical', name: '技术支持', icon: '🔧' }
  ];

  const faqs = {
    account: [
      {
        id: 1,
        question: '如何重置我的密码？',
        answer: '您可以在登录页面点击"忘记密码"链接，输入您的邮箱地址，我们会发送重置密码的链接到您的邮箱。您也可以在账户设置中直接修改密码。'
      },
      {
        id: 2,
        question: '如何更改我的邮箱地址？',
        answer: '登录您的账户后，进入"账户设置" > "账户信息"，在邮箱地址栏中输入新的邮箱地址，点击"保存更改"即可。系统会向新邮箱发送验证邮件。'
      },
      {
        id: 3,
        question: '如何删除我的账户？',
        answer: '在账户设置的隐私设置中，您可以找到"删除账户"选项。请注意，删除账户将永久移除您的所有数据，此操作无法撤销。'
      },
      {
        id: 4,
        question: '如何管理个人资料？',
        answer: '您可以在用户个人资料页面管理您的个人信息、偏好设置、语言选择和家长控制等功能。'
      }
    ],
    billing: [
      {
        id: 5,
        question: '如何查看我的账单？',
        answer: '在账户设置的订阅管理中，您可以查看当前订阅状态、下次扣费时间和历史账单记录。'
      },
      {
        id: 6,
        question: '支持哪些支付方式？',
        answer: '我们支持信用卡、借记卡、支付宝、微信支付等多种支付方式。您可以在支付方式页面添加或管理您的支付方法。'
      },
      {
        id: 7,
        question: '如何取消订阅？',
        answer: '在订阅管理页面，您可以选择"取消订阅"。取消后，您仍可以使用服务直到当前计费周期结束。'
      },
      {
        id: 8,
        question: '退款政策是什么？',
        answer: '我们提供30天无理由退款保证。如果您在订阅后30天内不满意，可以申请全额退款。'
      }
    ],
    streaming: [
      {
        id: 9,
        question: '视频无法播放怎么办？',
        answer: '请检查您的网络连接，尝试刷新页面或重启应用。如果问题持续存在，请检查您的设备是否支持当前视频格式。'
      },
      {
        id: 10,
        question: '视频画质模糊怎么办？',
        answer: '画质取决于您的网络速度和订阅套餐。您可以在播放器设置中手动选择画质，或升级到更高级的订阅套餐。'
      },
      {
        id: 11,
        question: '如何开启字幕？',
        answer: '在视频播放时，点击播放器右下角的设置按钮，选择"字幕"选项，您可以选择不同语言的字幕或关闭字幕。'
      },
      {
        id: 12,
        question: '视频加载缓慢怎么办？',
        answer: '请检查网络连接速度，建议使用WiFi观看。您也可以降低视频画质或清除浏览器缓存来改善加载速度。'
      }
    ],
    devices: [
      {
        id: 13,
        question: '支持哪些设备？',
        answer: '我们支持智能手机、平板电脑、电脑、智能电视、游戏机等多种设备。具体兼容性请查看设备支持列表。'
      },
      {
        id: 14,
        question: '如何在电视上观看？',
        answer: '您可以通过智能电视应用、投屏功能或连接电脑到电视来观看。大部分智能电视都有我们的官方应用。'
      },
      {
        id: 15,
        question: '同时可以在几个设备上观看？',
        answer: '根据您的订阅套餐，基础套餐支持1个设备，标准套餐支持2个设备，高级套餐支持4个设备同时观看。'
      },
      {
        id: 16,
        question: '如何管理已登录的设备？',
        answer: '在账户设置的设备管理中，您可以查看所有已登录的设备，并可以远程注销不使用的设备。'
      }
    ],
    content: [
      {
        id: 17,
        question: '如何搜索内容？',
        answer: '您可以使用页面顶部的搜索框输入关键词搜索，或使用高级搜索功能按类型、年份、评分等条件筛选内容。'
      },
      {
        id: 18,
        question: '如何添加到我的片单？',
        answer: '在内容详情页面或内容卡片上点击"+"按钮即可添加到我的片单。您可以在"我的片单"页面管理收藏的内容。'
      },
      {
        id: 19,
        question: '内容多久更新一次？',
        answer: '我们每周都会添加新的电影和电视剧。您可以在"最新热门"页面查看最新上线的内容。'
      },
      {
        id: 20,
        question: '如何下载内容离线观看？',
        answer: '在支持下载的内容页面点击下载按钮，下载完成后可在"我的下载"中离线观看。下载功能需要标准套餐或以上。'
      }
    ],
    technical: [
      {
        id: 21,
        question: '网站打不开怎么办？',
        answer: '请检查网络连接，尝试清除浏览器缓存和Cookie，或使用其他浏览器访问。如果问题持续，可能是服务器维护。'
      },
      {
        id: 22,
        question: '应用崩溃怎么办？',
        answer: '请尝试重启应用或设备，确保应用是最新版本。如果问题持续存在，请卸载后重新安装应用。'
      },
      {
        id: 23,
        question: '如何清除缓存？',
        answer: '在浏览器设置中找到"清除浏览数据"选项，选择清除缓存和Cookie。移动应用可以在设置中找到清除缓存选项。'
      },
      {
        id: 24,
        question: '系统要求是什么？',
        answer: '建议使用最新版本的Chrome、Firefox、Safari或Edge浏览器。移动设备需要iOS 12+或Android 7+系统。'
      }
    ]
  };

  const contactOptions = [
    {
      id: 1,
      title: '在线客服',
      description: '与我们的客服团队实时聊天',
      icon: '💬',
      available: '24/7 全天候服务',
      action: '开始聊天'
    },
    {
      id: 2,
      title: '电话支持',
      description: '拨打客服热线获得帮助',
      icon: '📞',
      available: '工作日 9:00-18:00',
      action: '400-123-4567'
    },
    {
      id: 3,
      title: '邮件支持',
      description: '发送邮件详细描述您的问题',
      icon: '📧',
      available: '24小时内回复',
      action: 'support@netflix.com'
    },
    {
      id: 4,
      title: '社区论坛',
      description: '在用户社区寻找答案和讨论',
      icon: '👥',
      available: '用户互助',
      action: '访问论坛'
    }
  ];

  const getFilteredFaqs = () => {
    const categoryFaqs = faqs[activeCategory] || [];
    if (!searchQuery) return categoryFaqs;
    
    return categoryFaqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* 页面标题和搜索 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">帮助中心</h1>
            <p className="text-gray-400 text-lg mb-8">我们随时为您提供帮助</p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索帮助内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none pl-12"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 分类导航 */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-4 sticky top-24">
                <h3 className="text-white font-semibold mb-4">帮助分类</h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-netflix-red text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* 主要内容区域 */}
            <div className="lg:col-span-3">
              {/* 常见问题 */}
              <div className="bg-gray-900 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {categories.find(cat => cat.id === activeCategory)?.name} - 常见问题
                </h2>
                
                <div className="space-y-4">
                  {getFilteredFaqs().length === 0 ? (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-white mb-2">未找到相关问题</h3>
                      <p className="text-gray-400">请尝试其他关键词或联系客服获得帮助</p>
                    </div>
                  ) : (
                    getFilteredFaqs().map((faq) => (
                      <div key={faq.id} className="border border-gray-700 rounded-lg">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800 transition-colors"
                        >
                          <h3 className="text-white font-medium pr-4">{faq.question}</h3>
                          <svg
                            className={`w-5 h-5 text-gray-400 transform transition-transform ${
                              expandedFaq === faq.id ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {expandedFaq === faq.id && (
                          <div className="px-4 pb-4 border-t border-gray-700">
                            <p className="text-gray-300 leading-relaxed pt-4">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 联系我们 */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">联系我们</h2>
                <p className="text-gray-400 mb-6">没有找到您需要的答案？我们的客服团队随时为您提供帮助。</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactOptions.map((option) => (
                    <div key={option.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{option.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">{option.title}</h3>
                          <p className="text-gray-400 text-sm mb-3">{option.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-xs">{option.available}</span>
                            <button className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                              {option.action}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 快速链接 */}
              <div className="mt-8 bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">快速链接</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: '账户设置', path: '/profile' },
                    { name: '订阅管理', path: '/account-settings' },
                    { name: '下载管理', path: '/downloads' },
                    { name: '我的片单', path: '/my-list' }
                  ].map((link, index) => (
                    <a
                      key={index}
                      href={`#${link.path}`}
                      className="bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors text-center"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* 反馈区域 */}
              <div className="mt-8 bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">帮助我们改进</h2>
                <p className="text-gray-400 mb-4">您的反馈对我们很重要，请告诉我们这个页面是否有帮助。</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>有帮助</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>没有帮助</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HelpCenter;
