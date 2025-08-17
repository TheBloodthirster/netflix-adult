import React, { useState } from 'react';
import { GENRES, AGE_RATINGS, COUNTRIES, CONTENT_TAGS, MOOD_TAGS } from '../data/categories';

function TagFilter({ onFilterChange, initialFilters = {} }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    genres: initialFilters.genres || [],
    ageRating: initialFilters.ageRating || '',
    countries: initialFilters.countries || [],
    tags: initialFilters.tags || [],
    moods: initialFilters.moods || [],
    yearRange: initialFilters.yearRange || { min: '', max: '' },
    ratingRange: initialFilters.ratingRange || { min: '', max: '' }
  });

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleGenre = (genreName) => {
    const newGenres = filters.genres.includes(genreName)
      ? filters.genres.filter(g => g !== genreName)
      : [...filters.genres, genreName];
    updateFilters({ genres: newGenres });
  };

  const toggleCountry = (countryId) => {
    const newCountries = filters.countries.includes(countryId)
      ? filters.countries.filter(c => c !== countryId)
      : [...filters.countries, countryId];
    updateFilters({ countries: newCountries });
  };

  const toggleTag = (tagId) => {
    const newTags = filters.tags.includes(tagId)
      ? filters.tags.filter(t => t !== tagId)
      : [...filters.tags, tagId];
    updateFilters({ tags: newTags });
  };

  const toggleMood = (moodId) => {
    const newMoods = filters.moods.includes(moodId)
      ? filters.moods.filter(m => m !== moodId)
      : [...filters.moods, moodId];
    updateFilters({ moods: newMoods });
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      genres: [],
      ageRating: '',
      countries: [],
      tags: [],
      moods: [],
      yearRange: { min: '', max: '' },
      ratingRange: { min: '', max: '' }
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = () => {
    return filters.genres.length > 0 || 
           filters.ageRating || 
           filters.countries.length > 0 || 
           filters.tags.length > 0 || 
           filters.moods.length > 0 ||
           filters.yearRange.min || 
           filters.yearRange.max ||
           filters.ratingRange.min || 
           filters.ratingRange.max;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-white font-semibold text-lg">标签筛选</h3>
          {hasActiveFilters() && (
            <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded-full">
              {filters.genres.length + filters.countries.length + filters.tags.length + filters.moods.length + (filters.ageRating ? 1 : 0)}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              清除全部
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 快速筛选 - 始终显示 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.values(GENRES).slice(0, 8).map(genre => (
          <button
            key={genre.id}
            onClick={() => toggleGenre(genre.name)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              filters.genres.includes(genre.name)
                ? 'text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            style={{
              backgroundColor: filters.genres.includes(genre.name) ? genre.color : undefined
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* 展开的筛选选项 */}
      {isExpanded && (
        <div className="space-y-6 border-t border-gray-700 pt-4">
          {/* 年龄分级 */}
          <div>
            <h4 className="text-white font-medium mb-3">年龄分级</h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(AGE_RATINGS).map(rating => (
                <button
                  key={rating.id}
                  onClick={() => updateFilters({ ageRating: filters.ageRating === rating.id ? '' : rating.id })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.ageRating === rating.id
                      ? 'bg-netflix-red text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  title={rating.description}
                >
                  {rating.name}
                </button>
              ))}
            </div>
          </div>

          {/* 制作国家 */}
          <div>
            <h4 className="text-white font-medium mb-3">制作国家/地区</h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(COUNTRIES).map(country => (
                <button
                  key={country.id}
                  onClick={() => toggleCountry(country.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    filters.countries.includes(country.id)
                      ? 'bg-netflix-red text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 内容标签 */}
          <div>
            <h4 className="text-white font-medium mb-3">内容标签</h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(CONTENT_TAGS).map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filters.tags.includes(tag.id)
                      ? 'text-white shadow-lg transform scale-105'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  style={{
                    backgroundColor: filters.tags.includes(tag.id) ? tag.color : undefined
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* 情绪标签 */}
          <div>
            <h4 className="text-white font-medium mb-3">观看心情</h4>
            <div className="flex flex-wrap gap-2">
              {Object.values(MOOD_TAGS).map(mood => (
                <button
                  key={mood.id}
                  onClick={() => toggleMood(mood.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    filters.moods.includes(mood.id)
                      ? 'bg-netflix-red text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span>{mood.icon}</span>
                  <span>{mood.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 年份和评分范围 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">上映年份</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="最早"
                  value={filters.yearRange.min}
                  onChange={(e) => updateFilters({ yearRange: { ...filters.yearRange, min: e.target.value } })}
                  className="w-20 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-netflix-red focus:outline-none"
                  min="1900"
                  max="2024"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="最晚"
                  value={filters.yearRange.max}
                  onChange={(e) => updateFilters({ yearRange: { ...filters.yearRange, max: e.target.value } })}
                  className="w-20 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-netflix-red focus:outline-none"
                  min="1900"
                  max="2024"
                />
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">评分范围</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="最低"
                  value={filters.ratingRange.min}
                  onChange={(e) => updateFilters({ ratingRange: { ...filters.ratingRange, min: e.target.value } })}
                  className="w-20 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-netflix-red focus:outline-none"
                  min="0"
                  max="10"
                  step="0.1"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="最高"
                  value={filters.ratingRange.max}
                  onChange={(e) => updateFilters({ ratingRange: { ...filters.ratingRange, max: e.target.value } })}
                  className="w-20 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-netflix-red focus:outline-none"
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TagFilter;
