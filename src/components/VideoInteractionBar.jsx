import React, { useState } from 'react';
import { useVideoInteractions } from '../hooks/useVideoInteractions';
import Toast from './Toast';

function VideoInteractionBar({ contentId, contentTitle, publishDate }) {
  const { interactions, toggleLike, toggleBookmark, incrementShare, formatNumber } = useVideoInteractions(contentId);
  const [showToast, setShowToast] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleLike = () => {
    toggleLike();
    setShowToast({
      message: interactions.isLiked ? '已取消点赞' : '已点赞',
      type: interactions.isLiked ? 'info' : 'success'
    });
  };

  const handleBookmark = () => {
    toggleBookmark();
    setShowToast({
      message: interactions.isBookmarked ? '已从收藏中移除' : '已添加到收藏',
      type: interactions.isBookmarked ? 'info' : 'success'
    });
  };

  const handleShare = (platform) => {
    incrementShare();
    const url = window.location.href;
    const text = `正在观看《${contentTitle}》`;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url);
        setShowToast({ message: '链接已复制到剪贴板', type: 'success' });
        break;
      case 'weibo':
        window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`);
        break;
      case 'wechat':
        setShowToast({ message: '请使用微信扫码分享', type: 'info' });
        break;
      case 'qq':
        window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`);
        break;
      default:
        break;
    }
    setShowShareModal(false);
  };

  return (
    <>
      <div className="bg-netflix-black border-t border-gray-800">
        <div className="px-4 md:px-16 py-4">
          {/* 所有交互按钮单行右对齐布局 */}
          <div className="flex items-center justify-end space-x-3">
            {/* 播放统计 */}
            <div className="flex items-center space-x-2 text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm font-medium">{formatNumber(interactions.views)} 次播放</span>
            </div>
            
            {/* 点赞按钮 */}
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                interactions.isLiked 
                  ? 'bg-netflix-red text-white shadow-lg shadow-red-500/25' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill={interactions.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span className="text-sm font-medium">{formatNumber(interactions.likes)}</span>
            </button>

            {/* 不喜欢按钮 */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 hover:scale-105">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
              <span className="text-sm font-medium">不喜欢</span>
            </button>
            
            {/* 分享按钮 */}
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-sm font-medium">分享</span>
            </button>

            {/* 收藏按钮 */}
            <button
              onClick={handleBookmark}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                interactions.isBookmarked 
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/25' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill={interactions.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="text-sm font-medium">收藏</span>
            </button>
          </div>
        </div>
      </div>

      {/* 分享模态框 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowShareModal(false)}>
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">分享到</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleShare('copy')}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-white text-sm">复制链接</span>
              </button>
              
              <button
                onClick={() => handleShare('weibo')}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">微</span>
                </div>
                <span className="text-white text-sm">微博</span>
              </button>
              
              <button
                onClick={() => handleShare('wechat')}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">微</span>
                </div>
                <span className="text-white text-sm">微信</span>
              </button>
              
              <button
                onClick={() => handleShare('qq')}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">Q</span>
                </div>
                <span className="text-white text-sm">QQ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast 通知 */}
      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(null)}
        />
      )}
    </>
  );
}

export default VideoInteractionBar;
