import React from 'react';

function SmartRecommendationTag({ reason, type = 'default' }) {
  const getTagStyles = () => {
    switch (type) {
      case 'genre':
        return 'bg-blue-600/80 text-blue-100 border-blue-500/30';
      case 'actor':
        return 'bg-purple-600/80 text-purple-100 border-purple-500/30';
      case 'director':
        return 'bg-green-600/80 text-green-100 border-green-500/30';
      case 'similar':
        return 'bg-orange-600/80 text-orange-100 border-orange-500/30';
      case 'trending':
        return 'bg-red-600/80 text-red-100 border-red-500/30';
      case 'new':
        return 'bg-yellow-600/80 text-yellow-100 border-yellow-500/30';
      default:
        return 'bg-gray-600/80 text-gray-100 border-gray-500/30';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'genre':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case 'actor':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'trending':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'new':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (!reason) return null;

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getTagStyles()}`}>
      {getIcon()}
      <span className="truncate max-w-32">{reason}</span>
    </div>
  );
}

export default SmartRecommendationTag;
