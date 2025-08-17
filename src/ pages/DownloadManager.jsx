import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DownloadManager() {
  const [downloads, setDownloads] = useState([]);
  const [activeTab, setActiveTab] = useState('downloaded');
  const [sortBy, setSortBy] = useState('recent');
  const [storageInfo, setStorageInfo] = useState({
    used: 2.4,
    total: 32,
    available: 29.6
  });

  // 模拟下载数据
  useEffect(() => {
    const mockDownloads = [
      {
        id: 1,
        title: '怪奇物语',
        type: 'series',
        season: 4,
        episode: 1,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
        size: '1.2 GB',
        quality: '高清',
        downloadDate: '2024-01-15',
        status: 'completed',
        progress: 100,
        expiryDate: '2024-02-15'
      },
      {
        id: 2,
        title: '王冠',
        type: 'series',
        season: 5,
        episode: 3,
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop',
        size: '980 MB',
        quality: '标清',
        downloadDate: '2024-01-14',
        status: 'completed',
        progress: 100,
        expiryDate: '2024-02-14'
      },
      {
        id: 3,
        title: '黑镜',
        type: 'movie',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
        size: '2.1 GB',
        quality: '超高清',
        downloadDate: '2024-01-13',
        status: 'downloading',
        progress: 65,
        expiryDate: '2024-02-13'
      },
      {
        id: 4,
        title: '鱿鱼游戏',
        type: 'series',
        season: 1,
        episode: 6,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=450&fit=crop',
        size: '1.5 GB',
        quality: '高清',
        downloadDate: '2024-01-12',
        status: 'paused',
        progress: 30,
        expiryDate: '2024-02-12'
      },
      {
        id: 5,
        title: '水曜日',
        type: 'series',
        season: 1,
        episode: 2,
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=450&fit=crop',
        size: '850 MB',
        quality: '高清',
        downloadDate: '2024-01-11',
        status: 'failed',
        progress: 0,
        expiryDate: '2024-02-11'
      }
    ];
    setDownloads(mockDownloads);
  }, []);

  const getFilteredDownloads = () => {
    let filtered = downloads;
    
    switch (activeTab) {
      case 'downloaded':
        filtered = downloads.filter(item => item.status === 'completed');
        break;
      case 'downloading':
        filtered = downloads.filter(item => item.status === 'downloading' || item.status === 'paused');
        break;
      case 'failed':
        filtered = downloads.filter(item => item.status === 'failed');
        break;
      default:
        filtered = downloads;
    }

    // 排序
    switch (sortBy) {
      case 'recent':
        return filtered.sort((a, b) => new Date(b.downloadDate) - new Date(a.downloadDate));
      case 'name':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'size':
        return filtered.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
      default:
        return filtered;
    }
  };

  const handleDeleteDownload = (id) => {
    setDownloads(downloads.filter(item => item.id !== id));
  };

  const handlePauseResume = (id) => {
    setDownloads(downloads.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'downloading' ? 'paused' : 'downloading'
        };
      }
      return item;
    }));
  };

  const handleRetryDownload = (id) => {
    setDownloads(downloads.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'downloading',
          progress: 0
        };
      }
      return item;
    }));
  };

  const clearAllCompleted = () => {
    setDownloads(downloads.filter(item => item.status !== 'completed'));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        );
      case 'downloading':
        return (
          <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'paused':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'all', name: '全部', count: downloads.length },
    { id: 'downloaded', name: '已下载', count: downloads.filter(item => item.status === 'completed').length },
    { id: 'downloading', name: '下载中', count: downloads.filter(item => item.status === 'downloading' || item.status === 'paused').length },
    { id: 'failed', name: '失败', count: downloads.filter(item => item.status === 'failed').length }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* 页面标题和存储信息 */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">我的下载</h1>
              <p className="text-gray-400">管理您的离线内容</p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <div className="bg-gray-900 rounded-lg p-4 min-w-64">
                <h3 className="text-white font-semibold mb-3">存储空间</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">已使用</span>
                    <span className="text-white">{storageInfo.used} GB</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-netflix-red h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(storageInfo.used / storageInfo.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">可用空间</span>
                    <span className="text-white">{storageInfo.available} GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 标签页导航 */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex space-x-1 bg-gray-900 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-netflix-red text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none"
              >
                <option value="recent">最近下载</option>
                <option value="name">按名称</option>
                <option value="size">按大小</option>
              </select>

              {activeTab === 'downloaded' && (
                <button
                  onClick={clearAllCompleted}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  清空已下载
                </button>
              )}
            </div>
          </div>

          {/* 下载列表 */}
          <div className="space-y-4">
            {getFilteredDownloads().length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">暂无下载内容</h3>
                <p className="text-gray-400">开始下载您喜欢的节目和电影以便离线观看</p>
              </div>
            ) : (
              getFilteredDownloads().map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors">
                  <div className="flex items-center space-x-4">
                    {/* 缩略图 */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-lg"
                      />
                    </div>

                    {/* 内容信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                          {item.type === 'series' && (
                            <p className="text-gray-400 text-sm mb-2">
                              第{item.season}季 第{item.episode}集
                            </p>
                          )}
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{item.size}</span>
                            <span>{item.quality}</span>
                            <span>下载于 {item.downloadDate}</span>
                            {item.status === 'completed' && (
                              <span>到期时间 {item.expiryDate}</span>
                            )}
                          </div>
                        </div>

                        {/* 状态图标 */}
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <span className="text-sm text-gray-400 capitalize">
                            {item.status === 'completed' && '已完成'}
                            {item.status === 'downloading' && '下载中'}
                            {item.status === 'paused' && '已暂停'}
                            {item.status === 'failed' && '失败'}
                          </span>
                        </div>
                      </div>

                      {/* 进度条 */}
                      {item.status !== 'completed' && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-400">
                              {item.status === 'downloading' && '下载进度'}
                              {item.status === 'paused' && '已暂停'}
                              {item.status === 'failed' && '下载失败'}
                            </span>
                            <span className="text-sm text-white">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                item.status === 'downloading' ? 'bg-blue-500' :
                                item.status === 'paused' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* 操作按钮 */}
                      <div className="flex items-center space-x-3 mt-4">
                        {item.status === 'completed' && (
                          <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            <span>播放</span>
                          </button>
                        )}

                        {(item.status === 'downloading' || item.status === 'paused') && (
                          <button
                            onClick={() => handlePauseResume(item.id)}
                            className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            {item.status === 'downloading' ? (
                              <>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                </svg>
                                <span>暂停</span>
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                                <span>继续</span>
                              </>
                            )}
                          </button>
                        )}

                        {item.status === 'failed' && (
                          <button
                            onClick={() => handleRetryDownload(item.id)}
                            className="flex items-center space-x-2 bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>重试</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteDownload(item.id)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>删除</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DownloadManager;
