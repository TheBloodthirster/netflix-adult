import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function WatchHistoryModal({ isOpen, onClose }) {
  const [watchHistory, setWatchHistory] = useState([
    {
      id: 1,
      title: '怪奇物语',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4212bea40?w=300&h=400&fit=crop',
      watchedAt: '2024-01-15 20:30',
      progress: 75,
      duration: '45分钟',
      season: '第4季',
      episode: '第8集',
      type: 'tv'
    },
    {
      id: 2,
      title: '复仇者联盟：终局之战',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=400&fit=crop',
      watchedAt: '2024-01-14 19:15',
      progress: 100,
      duration: '181分钟',
      type: 'movie'
    },
    {
      id: 3,
      title: '纸牌屋',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop',
      watchedAt: '2024-01-13 21:45',
      progress: 45,
      duration: '50分钟',
      season: '第6季',
      episode: '第3集',
      type: 'tv'
    },
    {
      id: 4,
      title: '王冠',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      watchedAt: '2024-01-12 18:20',
      progress: 90,
      duration: '55分钟',
      season: '第5季',
      episode: '第10集',
      type: 'tv'
    },
    {
      id: 5,
      title: '黑镜',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop',
      watchedAt: '2024-01-11 22:10',
      progress: 100,
      duration: '60分钟',
      season: '第6季',
      episode: '第1集',
      type: 'tv'
    },
    {
      id: 6,
      title: '蜘蛛侠：英雄无归',
      image: 'https://images.unsplash.com/photo-1635863138275-d9864d3e8b86?w=300&h=400&fit=crop',
      watchedAt: '2024-01-10 16:30',
      progress: 85,
      duration: '148分钟',
      type: 'movie'
    },
    {
      id: 7,
      title: '鱿鱼游戏',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300&h=400&fit=crop',
      watchedAt: '2024-01-09 20:00',
      progress: 100,
      duration: '60分钟',
      season: '第1季',
      episode: '第9集',
      type: 'tv'
    },
    {
      id: 8,
      title: '沙丘',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300&h=400&fit=crop',
      watchedAt: '2024-01-08 19:45',
      progress: 60,
      duration: '155分钟',
      type: 'movie'
    }
  ]);

  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const clearAllHistory = () => {
    setWatchHistory([]);
    setShowClearConfirm(false);
  };

  const removeFromHistory = (id) => {
    setWatchHistory(prev => prev.filter(item => item.id !== id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '昨天';
    if (diffDays === 2) return '前天';
    if (diffDays <= 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-yellow-500';
    if (progress >= 50) return 'bg-orange-500';
    return 'bg-netflix-red';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="flex-shrink-0 p-4 md:p-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">观看历史</h2>
              <p className="text-gray-400">
                {watchHistory.length > 0 ? `共 ${watchHistory.length} 个观看记录` : '暂无观看记录'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {watchHistory.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  清空历史
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {watchHistory.length === 0 ? (
            <div className="text-center py-16">
              <svg className="mx-auto h-24 w-24 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-white text-xl font-semibold mb-2">暂无观看历史</h3>
              <p className="text-gray-400 mb-6">
                开始观看内容后，您的观看记录将显示在这里
              </p>
              <Link
                to="/"
                onClick={onClose}
                className="inline-flex items-center px-6 py-3 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                浏览内容
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {watchHistory.map((item) => (
                <div key={item.id} className="group relative bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
                          <div 
                            className={`h-1 rounded-full ${getProgressColor(item.progress)}`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-300">
                          <span>{item.progress}%</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromHistory(item.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <Link
                      to={`/watch/${item.id}`}
                      onClick={onClose}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </Link>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-1 truncate">{item.title}</h3>
                    {item.season && item.episode && (
                      <p className="text-gray-400 text-sm mb-2">{item.season} · {item.episode}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDate(item.watchedAt)}</span>
                      <span className="capitalize">{item.type === 'tv' ? '电视剧' : '电影'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">确认清空历史记录</h3>
            <p className="text-gray-400 mb-6">
              此操作将永久删除您的所有观看历史记录，无法恢复。确定要继续吗？
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                取消
              </button>
              <button
                onClick={clearAllHistory}
                className="flex-1 px-4 py-2 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                确认清空
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchHistoryModal;
