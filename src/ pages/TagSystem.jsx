import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import TagFilter from '../components/TagFilter';
import { movies, tvShows } from '../data/mockData';
import { 
  filterContentByGenre, 
  filterContentByYear, 
  filterContentByCountry, 
  filterContentByTags,
  filterContentByMoods,
  parseGenres 
} from '../data/categories';

function TagSystem() {
  const [filters, setFilters] = useState({});
  const [contentType, setContentType] = useState('all'); // all, movies, tvshows

  // 合并所有内容
  const allContent = [...movies, ...tvShows];

  // 根据内容类型筛选
  const typeFilteredContent = useMemo(() => {
    if (contentType === 'movies') {
      return allContent.filter(item => item.type === '电影');
    } else if (contentType === 'tvshows') {
      return allContent.filter(item => item.type === '电视剧');
    }
    return allContent;
  }, [allContent, contentType]);

  // 应用筛选条件
  const filteredContent = useMemo(() => {
    let filtered = typeFilteredContent;

    // 按类别筛选
    if (filters.genres && filters.genres.length > 0) {
      filtered = filterContentByGenre(filtered, filters.genres);
    }

    // 按评分筛选
    if (filters.ratingRange && (filters.ratingRange.min || filters.ratingRange.max)) {
      const min = filters.ratingRange.min ? parseFloat(filters.ratingRange.min) : 0;
      const max = filters.ratingRange.max ? parseFloat(filters.ratingRange.max) : 10;
      filtered = filtered.filter(item => {
        const rating = parseFloat(item.rating);
        return rating >= min && rating <= max;
      });
    }

    // 按年份筛选
    if (filters.yearRange && (filters.yearRange.min || filters.yearRange.max)) {
      filtered = filterContentByYear(filtered, filters.yearRange);
    }

    // 按国家筛选
    if (filters.countries && filters.countries.length > 0) {
      filtered = filterContentByCountry(filtered, filters.countries);
    }

    // 按标签筛选
    if (filters.tags && filters.tags.length > 0) {
      filtered = filterContentByTags(filtered, filters.tags);
    }

    // 按情绪筛选
    if (filters.moods && filters.moods.length > 0) {
      filtered = filterContentByMoods(filtered, filters.moods);
    }

    return filtered;
  }, [typeFilteredContent, filters]);

  // 按类别分组
  const contentByGenre = useMemo(() => {
    const genreGroups = {};
    
    filteredContent.forEach(item => {
      const genres = parseGenres(item.genre);
      genres.forEach(genre => {
        if (!genreGroups[genre]) {
          genreGroups[genre] = [];
        }
        if (!genreGroups[genre].find(c => c.id === item.id)) {
          genreGroups[genre].push(item);
        }
      });
    });
    
    return genreGroups;
  }, [filteredContent]);

  const getContentTypeText = () => {
    switch (contentType) {
      case 'movies': return '电影';
      case 'tvshows': return '电视剧';
      default: return '全部内容';
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 pb-8">
        <div className="px-4 md:px-16 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">标签分类</h1>
          <p className="text-gray-400 text-lg">
通过标签分类发现您喜欢的内容 - 当前显示 {getContentTypeText()} 共 {filteredContent.length} 项
          </p>
        </div>

        {/* 内容类型切换 */}
        <div className="px-4 md:px-16 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setContentType('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                contentType === 'all'
                  ? 'bg-netflix-red text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              全部内容
            </button>
            <button
              onClick={() => setContentType('movies')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                contentType === 'movies'
                  ? 'bg-netflix-red text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              电影
            </button>
            <button
              onClick={() => setContentType('tvshows')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                contentType === 'tvshows'
                  ? 'bg-netflix-red text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              电视剧
            </button>
          </div>
        </div>
        
        {/* 标签筛选组件 */}
        <div className="px-4 md:px-16">
          <TagFilter 
            onFilterChange={setFilters}
            initialFilters={filters}
          />
        </div>
        
        {/* 筛选结果 */}
        <div className="space-y-8">
          {Object.keys(contentByGenre).length > 0 ? (
            Object.entries(contentByGenre)
              .sort(([, a], [, b]) => b.length - a.length) // 按内容数量排序
              .map(([genre, items]) => (
                <MovieRow 
                  key={genre} 
                  title={`${genre} (${items.length})`} 
                  movies={items} 
                />
              ))
          ) : (
            <div className="px-4 md:px-16">
              <div className="text-center py-20">
                <div className="mb-6">
                  <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">没有找到符合条件的内容</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  请尝试调整标签筛选条件，或者清除所有筛选来查看全部内容。
                </p>
                <button 
                  onClick={() => setFilters({})}
                  className="bg-netflix-red text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors"
                >
                  清除筛选条件
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

export default TagSystem;
