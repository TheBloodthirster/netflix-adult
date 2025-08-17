import React, { useState } from 'react';

function NotificationModal({ isOpen, onClose }) {
  const [notifications] = useState([
    {
      id: 1,
      type: 'new_release',
      title: '新剧上线',
      message: '《黑镜》第六季现已上线，立即观看',
      time: '2小时前',
      read: false,
      image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      type: 'recommendation',
      title: '为您推荐',
      message: '根据您的观看历史，我们为您推荐《怪奇物语》',
      time: '5小时前',
      read: false,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      type: 'reminder',
      title: '观看提醒',
      message: '您收藏的《纸牌屋》有新一集更新',
      time: '1天前',
      read: true,
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      type: 'system',
      title: '系统通知',
      message: '您的会员将在7天后到期，请及时续费',
      time: '2天前',
      read: true,
      image: null
    },
    {
      id: 5,
      type: 'new_release',
      title: '热门电影',
      message: '《复仇者联盟：终局之战》现已上线',
      time: '3天前',
      read: true,
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=100&fit=crop'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_release':
        return (
          <div className="w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        );
      case 'recommendation':
        return (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        );
      case 'reminder':
        return (
          <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
        );
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20">
      <div className="bg-netflix-black border border-gray-700 rounded-lg w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white">通知</h2>
            {unreadCount > 0 && (
              <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'all' 
                ? 'text-white border-b-2 border-netflix-red' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'unread' 
                ? 'text-white border-b-2 border-netflix-red' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            未读 ({unreadCount})
          </button>
          <button
            onClick={() => setActiveTab('new_release')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'new_release' 
                ? 'text-white border-b-2 border-netflix-red' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            新内容
          </button>
        </div>

        <div className="overflow-y-auto max-h-96">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              </svg>
              <p className="text-gray-400">暂无通知</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-800/50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-gray-800/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {notification.image ? (
                      <img
                        src={notification.image}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      getNotificationIcon(notification.type)
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-sm font-medium ${
                          !notification.read ? 'text-white' : 'text-gray-300'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-netflix-red rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full text-center text-sm text-netflix-red hover:text-red-400 transition-colors">
            标记全部为已读
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
