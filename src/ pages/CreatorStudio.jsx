import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useUser, useContent } from '../hooks/useDatabase';

function CreatorStudio() {
  const { user } = useUser();
  const { content: allContent, loading } = useContent();
  const [creatorStats, setCreatorStats] = useState({});
  const [recentUploads, setRecentUploads] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    if (allContent.length > 0) {
      generateCreatorStats();
      setRecentUploads(allContent.slice(0, 5));
    }
  }, [allContent]);

  const generateCreatorStats = () => {
    const stats = {
      totalContent: allContent.length,
      totalViews: Math.floor(Math.random() * 1000000) + 500000,
      avgRating: (allContent.reduce((sum, item) => sum + item.rating, 0) / allContent.length).toFixed(1),
      monthlyViews: Math.floor(Math.random() * 100000) + 50000,
      subscribers: Math.floor(Math.random() * 10000) + 5000,
      revenue: Math.floor(Math.random() * 50000) + 10000
    };
    setCreatorStats(stats);
  };

  const tabs = [
    { id: 'overview', name: '概览', icon: '📊' },
    { id: 'content', name: '内容管理', icon: '🎬' },
    { id: 'analytics', name: '数据分析', icon: '📈' },
    { id: 'monetization', name: '收益管理', icon: '💰' },
    { id: 'settings', name: '频道设置', icon: '⚙️' }
  ];

  const quickActions = [
    { 
      title: '上传新内容', 
      description: '发布新的视频内容',
      icon: '📤',
      link: '/upload',
      color: 'bg-netflix-red'
    },
    { 
      title: '查看分析', 
      description: '查看详细数据分析',
      icon: '📊',
      link: '/analytics',
      color: 'bg-blue-600'
    },
    { 
      title: '管理内容', 
      description: '编辑已发布的内容',
      icon: '✏️',
      link: '#',
      color: 'bg-green-600'
    },
    { 
      title: '收益报告', 
      description: '查看收益详情',
      icon: '💵',
      link: '#',
      color: 'bg-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="large" text="正在加载创作者工作台..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎬 创作者工作台
          </h1>
          <p className="text-gray-300 text-lg">
            管理你的内容，追踪表现，优化创作策略
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-netflix-red/20 to-red-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">总内容数</h3>
              <span className="text-2xl">🎥</span>
            </div>
            <div className="text-3xl font-bold text-netflix-red">
              {creatorStats.totalContent}
            </div>
            <div className="text-gray-400 text-sm">+2 本月</div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">总观看量</h3>
              <span className="text-2xl">👁️</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">
              {(creatorStats.totalViews / 1000).toFixed(0)}K
            </div>
            <div className="text-gray-400 text-sm">+15% 本月</div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">平均评分</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-3xl font-bold text-green-400">
              {creatorStats.avgRating}
            </div>
            <div className="text-gray-400 text-sm">+0.2 本月</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">订阅者</h3>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-3xl font-bold text-purple-400">
              {(creatorStats.subscribers / 1000).toFixed(1)}K
            </div>
            <div className="text-gray-400 text-sm">+8% 本月</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} rounded-lg p-6 hover:opacity-90 transition-opacity group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{action.icon}</span>
                <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">{action.title}</h3>
              <p className="text-white/80 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  selectedTab === tab.id
                    ? 'bg-netflix-red text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {selectedTab === 'overview' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">最近上传</h3>
              <div className="space-y-4">
                {recentUploads.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-700/50 rounded-lg p-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{item.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>评分: {item.rating}</span>
                        <span>类型: {item.type}</span>
                        <span>年份: {item.year}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'content' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">内容管理</h3>
                <Link 
                  to="/upload"
                  className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  上传新内容
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allContent.slice(0, 9).map(item => (
                  <div key={item.id} className="bg-gray-700/50 rounded-lg p-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <span>{item.type}</span>
                      <span>⭐ {item.rating}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700">
                        编辑
                      </button>
                      <button className="flex-1 bg-gray-600 text-white py-1 px-3 rounded text-sm hover:bg-gray-700">
                        统计
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">数据分析</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">观看趋势</h4>
                  <div className="h-32 bg-gray-600/50 rounded flex items-center justify-center">
                    <span className="text-gray-400">📈 图表占位符</span>
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">用户分布</h4>
                  <div className="h-32 bg-gray-600/50 rounded flex items-center justify-center">
                    <span className="text-gray-400">🌍 地图占位符</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'monetization' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">收益管理</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-500/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">本月收益</h4>
                  <div className="text-2xl font-bold text-green-400">
                    ¥{creatorStats.revenue?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-blue-500/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">待结算</h4>
                  <div className="text-2xl font-bold text-blue-400">
                    ¥{Math.floor(creatorStats.revenue * 0.3)?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-purple-500/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">总收益</h4>
                  <div className="text-2xl font-bold text-purple-400">
                    ¥{Math.floor(creatorStats.revenue * 12)?.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">频道设置</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">频道名称</label>
                  <input 
                    type="text" 
                    defaultValue="我的创作频道"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">频道描述</label>
                  <textarea 
                    rows="4"
                    defaultValue="欢迎来到我的创作频道，这里有最精彩的内容等着你！"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  />
                </div>
                <button className="bg-netflix-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  保存设置
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CreatorStudio;
