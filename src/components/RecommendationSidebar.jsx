import React from 'react';
import { Link } from 'react-router-dom';

function RecommendationSidebar({ currentContent, allContent }) {
  const getRecommendations = () => {
    if (!currentContent || !allContent) return [];
    
    const filtered = allContent.filter(item => item.id !== currentContent.id);
    
    if (filtered.length === 0) return [];
    
    const genreMatched = filtered.filter(item => {
      if (currentContent.genre && item.genre) {
        const currentGenres = currentContent.genre.split('/');
        const itemGenres = item.genre.split('/');
        return currentGenres.some(genre => itemGenres.includes(genre));
      }
      return false;
    });
    
    const recommendations = genreMatched.length > 0 ? genreMatched : filtered;
    return recommendations.slice(0, 6);
  };

  const recommendations = getRecommendations();

  return (
    <div className="w-full border-l border-gray-800 p-4 bg-netflix-black min-h-[70vh] lg:h-[70vh] overflow-y-auto">
      <h3 className="text-white text-lg font-semibold mb-4">推荐内容</h3>
      
      <div className="space-y-4">
        {recommendations.length > 0 ? recommendations.map((item) => (
          <Link 
            key={item.id}
            to={`/watch/${item.id}`}
            className="block group"
          >
            <div className="flex space-x-3 p-2 rounded hover:bg-gray-800 transition-colors">
              <div className="relative flex-shrink-0">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-12 object-cover rounded"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-sm font-medium truncate">{item.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="bg-netflix-red text-white text-xs px-1 rounded">
                    {item.rating}
                  </span>
                  <span className="text-gray-400 text-xs">{item.year}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">{item.genre}</p>
              </div>
            </div>
          </Link>
        )) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">暂无推荐内容</p>
          </div>
        )}
      </div>
      
      {recommendations.length > 0 && (
        <div className="mt-6 p-4 bg-gray-900 rounded">
          <h4 className="text-white font-semibold mb-2">为什么推荐这些内容？</h4>
          <p className="text-gray-400 text-sm">
            基于您正在观看的《{currentContent?.title}》，我们为您推荐了相似类型和风格的内容。
          </p>
        </div>
      )}
    </div>
  );
}

export default RecommendationSidebar;
