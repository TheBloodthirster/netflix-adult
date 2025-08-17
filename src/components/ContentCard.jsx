import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

const ContentCard = memo(function ContentCard({ item, showDetails = false, watchProgress = null, showPreview = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewTimeout, setPreviewTimeout] = useState(null);
  const handleMouseEnter = () => {
    if (showPreview) {
      const timeout = setTimeout(() => {
        setIsHovered(true);
      }, 800);
      setPreviewTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    if (previewTimeout) {
      clearTimeout(previewTimeout);
      setPreviewTimeout(null);
    }
    setIsHovered(false);
  };

  return (
    <div 
      className="flex-shrink-0 w-48 md:w-64 group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/content/${item.id}`} className="block">
        <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
          {isHovered && showPreview ? (
            <div className="relative w-full h-32 md:h-36 bg-black">
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
                poster={item.image}
                preload="metadata"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-2 left-2">
                <div className="flex items-center space-x-1 text-white text-xs backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>预览</span>
                </div>
              </div>
            </div>
          ) : (
            <OptimizedImage 
              src={item.image}
              alt={item.title}
              className="w-full h-32 md:h-36"
            />
          )}
          
          {/* 观看进度条 */}
          {watchProgress && watchProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
              <div 
                className="h-full bg-netflix-red transition-all duration-300"
                style={{ width: `${Math.min(watchProgress, 100)}%` }}
              />
            </div>
          )}
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-white text-sm font-semibold truncate mb-1">{item.title}</h3>
              {showDetails && (
                <div className="text-xs text-gray-300">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="bg-netflix-red px-1 rounded text-white">{item.rating}</span>
                    <span>{item.year}</span>
                    {item.seasons && <span>{item.seasons}季</span>}
                    {item.duration && <span>{item.duration}</span>}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">{item.genre}</p>
                </div>
              )}
              {watchProgress && watchProgress > 0 && (
                <div className="flex items-center space-x-2 mt-1">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-gray-400">{Math.round(watchProgress)}% 已观看</span>
                </div>
              )}
            </div>
          </div>
          
          <div className={`absolute top-2 right-2 transition-opacity duration-300 flex space-x-1 ${
            isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <Link 
              to={`/content/${item.id}`} 
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title="查看详情"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <Link 
              to={`/watch/${item.id}`} 
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title="立即播放"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </Link>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                // 添加到我的列表逻辑
              }}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              title="添加到我的列表"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          {!isHovered && (
            <>
              {item.isNew && (
                <div className="absolute top-2 left-2">
                  <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded font-semibold">新</span>
                </div>
              )}

              {item.isPopular && (
                <div className="absolute top-2 left-2">
                  <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-semibold">热门</span>
                </div>
              )}
            </>
          )}
        </div>
      </Link>
    </div>
  );
});

export default ContentCard;
