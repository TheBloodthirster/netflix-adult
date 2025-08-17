import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentCard from '../components/ContentCard';
import { newAndPopular } from '../data/mockData';

function NewAndPopular() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredContent = newAndPopular.filter(item => {
    if (activeTab === 'new') return item.isNew;
    if (activeTab === 'popular') return item.isPopular;
    return true;
  });

  const heroContent = newAndPopular[0];

  return (
    <div className="bg-netflix-black min-h-screen">
      <Header />
      
      <div className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroContent.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 px-4 md:px-16 max-w-2xl">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {heroContent.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-netflix-red text-white px-2 py-1 rounded text-sm font-semibold">
              {heroContent.rating}
            </span>
            <span className="text-white">{heroContent.year}</span>
            <span className="text-white">{heroContent.type}</span>
            <span className="text-gray-300">{heroContent.genre}</span>
            {heroContent.isNew && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">新内容</span>
            )}
          </div>
          
          <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-200">
            {heroContent.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`/watch/${heroContent.id}`} className="btn flex items-center justify-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-all duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>播放</span>
            </Link>
            
            <button className="btn flex items-center justify-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600/90 transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>更多信息</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-16 pb-20">
        <div className="mb-8">
          <div className="flex space-x-8 border-b border-gray-700">
            <button 
              onClick={() => setActiveTab('all')}
              className={`pb-4 px-2 transition-colors ${
                activeTab === 'all' 
                  ? 'text-white border-b-2 border-netflix-red' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              全部
            </button>
            <button 
              onClick={() => setActiveTab('new')}
              className={`pb-4 px-2 transition-colors ${
                activeTab === 'new' 
                  ? 'text-white border-b-2 border-netflix-red' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              最新内容
            </button>
            <button 
              onClick={() => setActiveTab('popular')}
              className={`pb-4 px-2 transition-colors ${
                activeTab === 'popular' 
                  ? 'text-white border-b-2 border-netflix-red' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              排行榜
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredContent.map((item) => (
            <ContentCard key={item.id} item={item} showDetails={true} />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default NewAndPopular;
