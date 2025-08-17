import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tvShows, movies, newAndPopular } from '../data/mockData';
import Header from '../components/Header';
import RecommendationSidebar from '../components/RecommendationSidebar';
import SimilarContent from '../components/SimilarContent';
import VideoInteractionBar from '../components/VideoInteractionBar';
import { useVideoInteractions } from '../hooks/useVideoInteractions';
import { useWatchProgress } from '../hooks/useWatchProgress';

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const { incrementView } = useVideoInteractions(parseInt(id));

  const allContent = [...tvShows, ...movies, ...newAndPopular];
  const currentContent = allContent.find(item => item.id === parseInt(id));

  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
      const timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
      setControlsTimeout(timeout);
    };

    const handleKeyPress = (e) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipTime(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipTime(10);
          break;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyPress);
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [isPlaying, controlsTimeout]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        // 播放时增加播放次数
        if (currentTime === 0) {
          incrementView();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
      if (newMuted) {
        videoRef.current.volume = 0;
        setVolume(0);
      } else {
        const newVolume = volume === 0 ? 0.5 : volume;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
      }
    }
  };

  const skipTime = (seconds) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentContent) {
    return (
      <div className="bg-netflix-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">内容未找到</h1>
          <Link to="/" className="text-netflix-red hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="flex flex-col xl:flex-row pt-16">
        <div className="flex-1 min-w-0 xl:mr-6">
          <div className="relative bg-black">
            <video
              ref={videoRef}
              src={videoUrl}
              className={`w-full object-cover cursor-pointer ${
                isFullscreen ? 'h-screen' : 'h-[70vh]'
              }`}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
            />

            {showControls && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50">
                {!isFullscreen && (
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <button
                      onClick={() => navigate(-1)}
                      className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>返回</span>
                    </button>

                    <div className="text-white text-center">
                      <h1 className="text-xl font-semibold">{currentContent.title}</h1>
                      <p className="text-sm text-gray-300">
                        {currentContent.year} • {currentContent.genre}
                      </p>
                    </div>

                    <div />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0">
                  <div className="bg-gradient-to-t from-black/90 to-transparent p-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlay}
                        className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>

                      <button
                        onClick={() => skipTime(-10)}
                        className="text-white hover:text-gray-300 transition-colors"
                        title="后退10秒"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => skipTime(10)}
                        className="text-white hover:text-gray-300 transition-colors"
                        title="前进10秒"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                        </svg>
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-gray-300 transition-colors"
                        >
                          {isMuted || volume === 0 ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                          ) : volume < 0.5 ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      <div className="flex-1 flex items-center space-x-2">
                        <span className="text-white text-sm whitespace-nowrap">{formatTime(currentTime)}</span>
                        <div
                          className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group"
                          onClick={handleSeek}
                        >
                          <div
                            className="h-full bg-netflix-red rounded-full relative"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          >
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-netflix-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                        <span className="text-white text-sm whitespace-nowrap">{formatTime(duration)}</span>
                      </div>

                      <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-gray-300 transition-colors"
                        title={isFullscreen ? '退出全屏' : '全屏'}
                      >
                        {isFullscreen ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5m11 5.5V4.5M15 9h4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5m11-5.5v4.5m0-4.5h4.5m-4.5 0l5.5 5.5" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full xl:w-72 flex-shrink-0 mt-4 xl:mt-0">
          <RecommendationSidebar 
            currentContent={currentContent} 
            allContent={allContent}
          />
        </div>
      </div>
      
      {/* 视频播放器下方的互动区域 - 一行布局 */}
      <div className="bg-netflix-black px-4 md:px-16 py-6">
        <div className="max-w-4xl">
          {/* 播放次数、发布时间、点赞踩按钮一行布局 */}
          <div className="flex items-center justify-between mb-8">
            {/* 左侧：播放次数和发布时间 */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-lg font-medium">{Math.floor(Math.random() * 50000 + 10000).toLocaleString()} 次播放</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-lg font-medium">{new Date().toLocaleDateString('zh-CN')} 发布</span>
              </div>
              
              {/* 点赞和踩按钮 */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-green-600 hover:text-white transition-all duration-200 hover:scale-105 group">
                  <svg className="w-5 h-5 group-hover:fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="text-sm font-medium">{Math.floor(Math.random() * 5000 + 1000).toLocaleString()}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-105 group">
                  <svg className="w-5 h-5 group-hover:fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                  <span className="text-sm font-medium">{Math.floor(Math.random() * 200 + 50)}</span>
                </button>
              </div>
            </div>
            
            {/* 右侧：操作按钮 */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm font-medium">分享</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="text-sm font-medium">收藏</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium">下载</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 视频介绍和评论区域 - 左右两栏布局 */}
      <div className="bg-netflix-black px-4 md:px-16 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* 左侧：视频介绍 */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{currentContent.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="bg-netflix-red text-white px-3 py-1 rounded-full text-sm font-semibold">{currentContent.rating}</span>
                <span className="text-gray-300 text-lg">{currentContent.year}</span>
                <span className="text-gray-300 text-lg">{currentContent.genre}</span>
                {currentContent.duration && <span className="text-gray-300 text-lg">{currentContent.duration}</span>}
                {currentContent.seasons && <span className="text-gray-300 text-lg">{currentContent.seasons}季</span>}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-gray-300 ml-2">4.2/5.0</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">剧情简介</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {currentContent.description || `《${currentContent.title}》是一部精彩的${currentContent.genre}作品，讲述了一个引人入胜的故事。这部作品以其出色的制作质量和深刻的主题内容获得了观众的广泛好评。故事情节跌宕起伏，人物刻画深入人心，是一部不可多得的优秀作品。无论是视觉效果还是音效制作都达到了业界顶尖水准，为观众带来了沉浸式的观影体验。`}
                </p>
              </div>
              
              {/* 标签区域 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {['动作', '冒险', '科幻', '悬疑', '热门', '高分', '经典', '必看'].map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-netflix-red hover:text-white transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* 章节导航 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">章节导航</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { time: '00:00', title: '开场介绍' },
                    { time: '05:30', title: '主角登场' },
                    { time: '15:45', title: '冲突爆发' },
                    { time: '32:10', title: '高潮部分' },
                    { time: '45:20', title: '结局揭晓' }
                  ].map((chapter, index) => (
                    <button key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left">
                      <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-mono">{chapter.time}</span>
                      </div>
                      <span className="text-gray-300 hover:text-white">{chapter.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 快速操作 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">快速操作</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center space-x-2 py-2 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>收藏</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>下载</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>分享</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>播放列表</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* 右侧：评论区域 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-white">评论 (1,234)</h3>
                <div className="flex items-center space-x-4">
                  <select className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-netflix-red focus:outline-none">
                    <option>最新</option>
                    <option>最热</option>
                    <option>最早</option>
                  </select>
                </div>
              </div>
              
              {/* 评论输入框 */}
              <div className="mb-8">
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-netflix-red to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">我</span>
                  </div>
                  <div className="flex-1">
                    <textarea 
                      placeholder="写下你的评论..." 
                      className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:border-netflix-red focus:outline-none resize-none"
                      rows="3"
                    ></textarea>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center space-x-4">
                        <button className="text-gray-400 hover:text-white transition-colors" title="添加图片">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors" title="添加表情">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9 5a9 9 0 1118 0H3z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors" title="@提及用户">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400 text-sm">0/500</span>
                        <button className="bg-netflix-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                          发布评论
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 评论列表 */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {[1, 2, 3, 4, 5, 6].map((comment) => (
                  <div key={comment} className="flex space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold">用</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-white font-medium">用户{comment}</span>
                        <span className="text-gray-400 text-sm">{comment}小时前</span>
                        {comment <= 2 && <span className="bg-netflix-red text-white px-2 py-1 rounded text-xs">热门</span>}
                      </div>
                      <p className="text-gray-300 mb-3">
                        这部作品真的很棒！{comment === 1 ? '剧情紧凑，演员演技在线，特效也很棒。强烈推荐大家观看！' : comment === 2 ? '看了好几遍了，每次都有新的感受。导演的功力真的很深厚。' : comment === 3 ? '不错的作品，值得一看。画面很美，音乐也很棒。' : comment === 4 ? '演员的表演很自然，故事情节也很吸引人。' : comment === 5 ? '制作精良，每个细节都很用心。' : comment === 6 ? '这种类型的作品很少见，很有创意。' : comment === 7 ? '配乐很棒，增强了观影体验。' : '期待续集！'}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <span className="text-sm">{Math.floor(Math.random() * 100 + 10)}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="text-sm">回复</span>
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 加载更多按钮 */}
              <div className="text-center mt-6">
                <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  加载更多评论
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 相关推荐视频区域 */}
      <div className="bg-netflix-black px-4 md:px-16 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-6">相关推荐</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {allContent.filter(item => item.id !== currentContent.id).slice(0, 18).map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => navigate(`/watch/${item.id}`)}>
                <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-video mb-3">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {item.duration || '2:15:30'}
                  </div>
                </div>
                <h4 className="text-white font-medium text-sm group-hover:text-netflix-red transition-colors duration-200 line-clamp-2">
                  {item.title}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-gray-400 text-xs">{item.year}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-xs">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* 查看更多按钮 */}
          <div className="text-center mt-8">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              查看更多相关内容
            </button>
          </div>
        </div>
      </div>
      
      {/* 继续观看历史 */}
      <div className="bg-netflix-black px-4 md:px-16 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-6">继续观看</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContent.slice(0, 6).map((item, index) => {
              const progress = Math.floor(Math.random() * 80 + 10);
              return (
                <div key={item.id} className="group cursor-pointer" onClick={() => navigate(`/watch/${item.id}`)}>
                  <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-video mb-3">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* 进度条 */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                      <div 
                        className="h-full bg-netflix-red transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {progress}% 已观看
                    </div>
                  </div>
                  <h4 className="text-white font-medium group-hover:text-netflix-red transition-colors duration-200">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">{item.year}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{item.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 7 + 1)}天前</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
