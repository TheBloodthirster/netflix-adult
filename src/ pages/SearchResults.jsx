import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { tvShows, movies, newAndPopular } from '../data/mockData';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');

  const allContent = [...tvShows, ...movies, ...newAndPopular];

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      
      setTimeout(() => {
        let results = allContent.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.genre.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
        );

        if (filterBy !== 'all') {
          if (filterBy === 'movies') {
            results = results.filter(item => movies.includes(item));
          } else if (filterBy === 'tv') {
            results = results.filter(item => tvShows.includes(item));
          } else if (filterBy === 'new') {
            results = results.filter(item => newAndPopular.includes(item));
          }
        }

        if (sortBy === 'title') {
          results.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'year') {
          results.sort((a, b) => b.year - a.year);
        } else if (sortBy === 'rating') {
          results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        }

        setSearchResults(results);
        setIsLoading(false);
      }, 500);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [query, sortBy, filterBy]);

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-400 text-black px-1 rounded">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {query ? `"${query}" 的搜索结果` : '搜索结果'}
            </h1>
            {query && (
              <p className="text-gray-400">
                {isLoading ? '搜索中...' : `找到 ${searchResults.length} 个相关结果`}
              </p>
            )}
          </div>

          {query && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
              <div className="flex flex-wrap items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-gray-400 text-sm">筛选:</label>
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:border-netflix-red focus:outline-none"
                  >
                    <option value="all">全部</option>
                    <option value="movies">电影</option>
                    <option value="tv">电视剧</option>
                    <option value="new">最新热门</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="text-gray-400 text-sm">排序:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:border-netflix-red focus:outline-none"
                  >
                    <option value="relevance">相关性</option>
                    <option value="title">标题</option>
                    <option value="year">年份</option>
                    <option value="rating">评分</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>显示结果:</span>
                <span className="text-white font-semibold">{searchResults.length}</span>
              </div>
            </div>
          )}

          {isLoading && query && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-netflix-red"></div>
            </div>
          )}

          {!query && !isLoading && (
            <div className="text-center py-16">
              <svg className="mx-auto h-24 w-24 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="text-white text-xl font-semibold mb-2">开始搜索</h2>
              <p className="text-gray-400">
                输入关键词来搜索您喜欢的电影和电视剧
              </p>
            </div>
          )}

          {query && !isLoading && searchResults.length === 0 && (
            <div className="text-center py-16">
              <svg className="mx-auto h-24 w-24 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="text-white text-xl font-semibold mb-2">未找到相关内容</h2>
              <p className="text-gray-400 mb-6">
                没有找到与 "{query}" 相关的电影或电视剧
              </p>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>建议您:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>检查拼写是否正确</li>
                  <li>尝试使用更通用的关键词</li>
                  <li>尝试使用不同的关键词</li>
                </ul>
              </div>
            </div>
          )}

          {searchResults.length > 0 && !isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  to={`/watch/${item.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 md:h-72 object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold mb-2 line-clamp-2">
                          {highlightText(item.title, query)}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded">
                            {item.rating}
                          </span>
                          <span className="text-gray-300 text-xs">{item.year}</span>
                        </div>
                        <p className="text-gray-300 text-xs line-clamp-2">
{item.genre}
                        </p>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h3 className="text-white font-medium line-clamp-2 mb-1">
                      {highlightText(item.title, query)}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-1">
                      {highlightText(item.genre, query)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="bg-netflix-red text-white text-xs px-1 rounded">
                        {item.rating}
                      </span>
                      <span className="text-gray-500 text-xs">{item.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {searchResults.length > 0 && !isLoading && (
            <div className="mt-12 text-center">
              <p className="text-gray-400 text-sm">
                显示了所有 {searchResults.length} 个搜索结果
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchResults;
