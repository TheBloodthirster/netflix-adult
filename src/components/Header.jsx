import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchModal from './SearchModal';
import NotificationModal from './NotificationModal';
import WatchHistoryModal from './WatchHistoryModal';
import { throttle } from '../utils/performance';

const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showWatchHistoryModal, setShowWatchHistoryModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 0);
    }, 16); // 60fps

    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.relative')) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 gpu-accelerated ${
      isScrolled ? 'bg-netflix-black glass-effect' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-netflix-red text-2xl md:text-3xl font-bold gradient-text">
            NETFLIX
          </div>
          
          <nav className="hidden lg:flex space-x-6">
            <Link to="/" className={`transition-colors ${
              location.pathname === '/' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }`}>首页</Link>
            <Link to="/tv-shows" className={`transition-colors ${
              location.pathname === '/tv-shows' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }`}>电视剧</Link>
            <Link to="/movies" className={`transition-colors ${
              location.pathname === '/movies' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }`}>电影</Link>
            <Link to="/new-and-popular" className={`transition-colors ${
              location.pathname === '/new-and-popular' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }`}>最新热门</Link>
            <Link to="/my-list" className={`transition-colors ${
              location.pathname === '/my-list' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }`}>我的片单</Link>
            <Link to="/browse-by-language" className={`transition-colors ${
              location.pathname === '/browse-by-language' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }`}>按语言浏览</Link>
            <Link to="/tags" className={`transition-colors ${
              location.pathname === '/tags' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
            }`}>标签分类</Link>
          </nav>
          
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative hidden lg:block">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchInput.trim()) {
                    window.location.href = `#/search?q=${encodeURIComponent(searchInput.trim())}`;
                  }
                }}
                placeholder="搜索内容..."
                className="w-48 px-3 py-1 bg-gray-800/50 text-white text-sm rounded border border-gray-600 focus:border-netflix-red focus:outline-none focus:bg-gray-800 transition-all"
              />
            </div>
            <button 
              onClick={() => {
                if (searchInput.trim()) {
                  window.location.href = `#/search?q=${encodeURIComponent(searchInput.trim())}`;
                } else {
                  setShowSearchModal(true);
                }
              }}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          <button 
            onClick={() => setShowNotificationModal(true)}
            className="text-white hover:text-gray-300 transition-colors hidden lg:block relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-netflix-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </button>

          <button 
            onClick={() => setShowWatchHistoryModal(true)}
            className="text-white hover:text-gray-300 transition-colors hidden lg:block"
            title="观看历史"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
              >
                <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">用</span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${
                  showUserMenu ? 'rotate-180' : ''
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-black/90 border border-gray-700 rounded-md shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-netflix-red rounded flex items-center justify-center">
                          <span className="text-white font-semibold">用</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">用户名</p>
                          <p className="text-gray-400 text-sm">user@example.com</p>
                        </div>
                      </div>
                    </div>
                    
                    <Link to="/my-list" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                      我的片单
                    </Link>
                    <Link to="/creator-studio" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                      创作者工作台
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                      个人资料
                    </Link>
                    <Link to="/subscription" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                      订阅管理
                    </Link>
                    <Link to="/account-settings" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                      账户设置
                    </Link>
                    <Link to="/help" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                      帮助中心
                    </Link>
                    <div className="border-t border-gray-700 mt-2 pt-2">
                      <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                      >
                        退出登录
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-netflix-red text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition-colors"
            >
              登录
            </button>
          )}
        </div>
      </div>
      
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black/90 p-8 rounded-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">登录</h2>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">邮箱地址</label>
                  <input 
                    type="email" 
                    placeholder="请输入您的邮箱地址"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none focus:ring-2 focus:ring-netflix-red/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">密码</label>
                  <input 
                    type="password" 
                    placeholder="请输入您的密码"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none focus:ring-2 focus:ring-netflix-red/20 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-netflix-red bg-gray-800 border-gray-600 rounded focus:ring-netflix-red focus:ring-2" />
                  <span className="ml-2 text-sm text-gray-300">记住我</span>
                </label>
                <a href="#" className="text-sm text-netflix-red hover:underline">忘记密码？</a>
              </div>
              
              <button 
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoggedIn(true);
                  setShowLoginModal(false);
                }}
                className="w-full bg-netflix-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors transform hover:scale-105"
              >
                登录
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">或者</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                还没有账户？
                <a href="#" className="text-netflix-red hover:underline ml-1 font-semibold">立即注册</a>
              </p>
              <p className="text-xs text-gray-500 mt-4">
                登录即表示您同意我们的
                <a href="#" className="text-netflix-red hover:underline">服务条款</a>
                和
                <a href="#" className="text-netflix-red hover:underline">隐私政策</a>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <SearchModal 
        isOpen={showSearchModal} 
        onClose={() => setShowSearchModal(false)} 
      />
      
      <NotificationModal 
        isOpen={showNotificationModal} 
        onClose={() => setShowNotificationModal(false)} 
      />
      
      <WatchHistoryModal 
        isOpen={showWatchHistoryModal} 
        onClose={() => setShowWatchHistoryModal(false)} 
      />
      
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/90" onClick={() => setShowMobileMenu(false)}>
          <div className="fixed top-16 left-0 right-0 bg-netflix-black border-t border-gray-800 max-h-[80vh] overflow-y-auto">
            <div className="p-4 space-y-1">
              <Link 
                to="/" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                首页
              </Link>
              <Link 
                to="/tv-shows" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/tv-shows' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                电视剧
              </Link>
              <Link 
                to="/movies" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/movies' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                电影
              </Link>
              <Link 
                to="/new-and-popular" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/new-and-popular' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                最新热门
              </Link>
              <Link 
                to="/my-list" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/my-list' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                我的片单
              </Link>
              <Link 
                to="/browse-by-language" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/browse-by-language' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                按语言浏览
              </Link>
              <Link 
                to="/tags" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/tags' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                标签分类
              </Link>
              <Link 
                to="/recommendations" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/recommendations' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                推荐
              </Link>
              <Link 
                to="/trending" 
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/trending' ? 'bg-netflix-red text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                排行榜
              </Link>
              
              <div className="border-t border-gray-700 mt-4 pt-4">
                <button 
                  onClick={() => {
                    setShowNotificationModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  </svg>
                  <span>通知</span>
                  <span className="bg-netflix-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">2</span>
                </button>
                
                <button 
                  onClick={() => {
                    setShowWatchHistoryModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>观看历史</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
