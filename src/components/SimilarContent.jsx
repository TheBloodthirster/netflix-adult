import React from 'react';
import { Link } from 'react-router-dom';

function SimilarContent({ currentContent, allContent }) {
  const getSimilarContent = () => {
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
    
    let similarContent = [];
    if (genreMatched.length >= 12) {
      similarContent = genreMatched.slice(0, 12);
    } else {
      similarContent = [...genreMatched, ...filtered.filter(item => !genreMatched.includes(item))].slice(0, 12);
    }
    
    return similarContent;
  };

  const similarContent = getSimilarContent();
  
  if (similarContent.length === 0) {
    return (
      <div className="bg-netflix-black px-4 md:px-16 py-8">
        <h2 className="text-white text-2xl font-semibold mb-6">相似内容</h2>
        <div className="text-center py-8">
          <p className="text-gray-400">暂无相似内容推荐</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-netflix-black px-4 md:px-16 py-8">
      <h2 className="text-white text-2xl font-semibold mb-6">相似内容</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {similarContent.map((item) => (
          <Link 
            key={item.id}
            to={`/watch/${item.id}`}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-32 md:h-36 object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white text-sm font-semibold truncate mb-1">{item.title}</h3>
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
          </Link>
        ))}
      </div>
      
      {similarContent.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            根据《{currentContent?.title}》为您推荐的相似内容
          </p>
          <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors">
            查看更多推荐
          </button>
        </div>
      )}
    </div>
  );
}

export default SimilarContent;
