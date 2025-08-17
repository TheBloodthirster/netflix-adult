import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tvShows, movies, newAndPopular } from '../data/mockData';

function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    '怪奇物语', '复仇者联盟', '纸牌屋', '王冠', '鱿鱼游戏'
  ]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [hotSearches] = useState([
    '鱿鱼游戏', '怪奇物语', '纸牌屋', '王冠', '黑镜', '权力的游戏', '绝命毒师', '复仇者联盟', '蜘蛛侠', '钢铁侠'
  ]);

  const allContent = [...tvShows, ...movies, ...newAndPopular];

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const results = allContent.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsLoading(false);
        
        // 生成搜索建议
        const suggestions = allContent
          .filter(item => 
            item.title.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
            item.title.toLowerCase() !== searchQuery.toLowerCase()
          )
          .slice(0, 5)
          .map(item => item.title);
        setSearchSuggestions(suggestions);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setSearchSuggestions([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      // 保存到本地存储
      localStorage.setItem('netflix_recent_searches', JSON.stringify([query, ...recentSearches.slice(0, 4)]));
    }
  };
  
  // 从本地存储加载搜索历史
  useEffect(() => {
    const saved = localStorage.getItem('netflix_recent_searches');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed);
        }
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="flex-shrink-0 p-4 md:p-8 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索电影、电视剧、纪录片..."
                className="w-full pl-12 pr-12 py-4 bg-gray-900 text-white text-lg rounded-lg border border-gray-700 focus:border-netflix-red focus:outline-none focus:ring-2 focus:ring-netflix-red/20"
                autoFocus
              />
              
              {/* 搜索建议下拉框 */}
              {searchQuery && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleSearch(suggestion);
                        setSearchSuggestions([]);
                      }}
                      className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!searchQuery && (
            <div className="space-y-8">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-lg font-semibold">最近搜索</h3>
                    <button 
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem('netflix_recent_searches');
                      }}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      清除全部
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 hover:text-white transition-colors group"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{search}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newSearches = recentSearches.filter((_, i) => i !== index);
                            setRecentSearches(newSearches);
                            localStorage.setItem('netflix_recent_searches', JSON.stringify(newSearches));
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">热门搜索</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {hotSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors text-sm"
                    >
                      <span className="text-netflix-red font-semibold text-xs">{index + 1}</span>
                      <span className="truncate">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red"></div>
            </div>
          )}

          {searchQuery && !isLoading && searchResults.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-24 w-24 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-white text-xl font-semibold mb-2">未找到相关内容</h3>
              <p className="text-gray-400">
                没有找到与 "{searchQuery}" 相关的电影或电视剧
              </p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div>
              <h3 className="text-white text-lg font-semibold mb-6">
                搜索结果 ({searchResults.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/watch/${item.id}`}
                    onClick={onClose}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 md:h-40 object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 left-2 right-2">
                          <h4 className="text-white text-sm font-semibold truncate mb-1">{item.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="bg-netflix-red text-white text-xs px-1 rounded">{item.rating}</span>
                            <span className="text-gray-300 text-xs">{item.year}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                      <p className="text-gray-400 text-xs truncate">{item.genre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!searchQuery && (
            <div className="mt-8">
              <h3 className="text-white text-lg font-semibold mb-6">推荐内容</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allContent.slice(0, 12).map((item) => (
                  <Link
                    key={item.id}
                    to={`/watch/${item.id}`}
                    onClick={onClose}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 md:h-40 object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 left-2 right-2">
                          <h4 className="text-white text-sm font-semibold truncate mb-1">{item.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="bg-netflix-red text-white text-xs px-1 rounded">{item.rating}</span>
                            <span className="text-gray-300 text-xs">{item.year}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                      <p className="text-gray-400 text-xs truncate">{item.genre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
