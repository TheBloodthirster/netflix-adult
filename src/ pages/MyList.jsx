import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { myListData } from '../data/mockData';

function MyList() {
  const [sortBy, setSortBy] = useState('recent');

  const sortedList = [...myListData].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.addedDate) - new Date(a.addedDate);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'rating') {
      return parseFloat(b.rating) - parseFloat(a.rating);
    }
    return 0;
  });

  return (
    <div className="bg-netflix-black min-h-screen">
      <Header />
      
      <div className="pt-24 px-4 md:px-16 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">我的片单</h1>
          <p className="text-gray-400 mb-6">您添加到片单中的电影和电视剧</p>
          
          <div className="flex items-center space-x-4">
            <span className="text-white">排序方式:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-netflix-red"
            >
              <option value="recent">最近添加</option>
              <option value="title">标题</option>
              <option value="rating">评分</option>
            </select>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-4">您的片单是空的</h2>
            <p className="text-gray-400 mb-6">浏览我们的内容并添加您想稍后观看的电影和电视剧</p>
            <button className="bg-netflix-red text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition-colors">
              浏览内容
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedList.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden group hover:bg-gray-800 transition-colors">
                <div className="relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to={`/watch/${item.id}`} className="bg-white/20 rounded-full p-3 hover:bg-white/30 transition-colors">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-netflix-red text-white px-2 py-1 rounded text-sm">
                      {item.rating}
                    </span>
                    <span className="text-gray-400 text-sm">{item.year}</span>
                    <span className="text-gray-400 text-sm">{item.type}</span>
                  </div>
                  
                  <p className="text-gray-500 text-sm">
                    添加于 {new Date(item.addedDate).toLocaleDateString('zh-CN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default MyList;
