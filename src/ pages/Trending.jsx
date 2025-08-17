import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentCard from '../components/ContentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useContent } from '../hooks/useDatabase';

function Trending() {
  const { content: allContent, loading } = useContent();
  const [trendingData, setTrendingData] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    if (allContent.length > 0) {
      generateTrendingData();
    }
  }, [allContent]);

  const generateTrendingData = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const addTrendingScore = (content) => {
      const daysSinceRelease = Math.floor((now - new Date(content.created_at)) / (1000 * 60 * 60 * 24));
      const recencyScore = Math.max(0, 100 - daysSinceRelease);
      const ratingScore = content.rating * 10;
      const yearScore = content.year >= 2020 ? 20 : 0;
      
      return {
        ...content,
        trendingScore: recencyScore + ratingScore + yearScore + Math.random() * 10
      };
    };

    const contentWithScores = allContent.map(addTrendingScore);

    setTrendingData({
      today: contentWithScores
        .sort((a, b) => b.trendingScore - a.trendingScore)
        .slice(0, 20),
      week: contentWithScores
        .filter(item => item.year >= 2020)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 20),
      month: contentWithScores
        .sort((a, b) => b.year - a.year)
        .slice(0, 20)
    });
  };

  const periods = [
    { id: 'today', name: '今日热门', icon: '🔥' },
    { id: 'week', name: '本周热门', icon: '📈' },
    { id: 'month', name: '本月热门', icon: '🏆' }
  ];

  const types = [
    { id: 'all', name: '全部' },
    { id: '电影', name: '电影' },
    { id: '电视剧', name: '电视剧' }
  ];

  const getFilteredContent = () => {
    const periodContent = trendingData[selectedPeriod] || [];
    if (selectedType === 'all') {
      return periodContent;
    }
    return periodContent.filter(item => item.type === selectedType);
  };

  const getTrendingStats = () => {
    const content = getFilteredContent();
    const avgRating = content.length > 0 
      ? (content.reduce((sum, item) => sum + item.rating, 0) / content.length).toFixed(1)
      : 0;
    
    const genreCount = {};
    content.forEach(item => {
      const genres = item.genre.split('/');
      genres.forEach(genre => {
        genreCount[genre.trim()] = (genreCount[genre.trim()] || 0) + 1;
      });
    });
    
    const topGenre = Object.entries(genreCount)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '暂无';

    return { avgRating, topGenre, total: content.length };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="large" text="正在加载热门趋势..." />
        </div>
      </div>
    );
  }

  const stats = getTrendingStats();

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🏆 实时排行榜
          </h1>
          <p className="text-gray-300 text-lg">
            发现当下最热门的内容排行
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">排行统计</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-400">
                {stats.total}
              </div>
              <div className="text-gray-400 text-sm">热门内容</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">
                {stats.avgRating}
              </div>
              <div className="text-gray-400 text-sm">平均评分</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">
                {stats.topGenre}
              </div>
              <div className="text-gray-400 text-sm">热门类型</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">
                🔥
              </div>
              <div className="text-gray-400 text-sm">排行指数</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {periods.map(period => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                selectedPeriod === period.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{period.icon}</span>
              <span>{period.name}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {types.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedType === type.id
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white">
              {periods.find(p => p.id === selectedPeriod)?.name} 排行榜
            </h2>
            <div className="text-gray-400 text-sm">
              实时更新 • {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredContent().slice(0, 9).map((item, index) => (
              <div key={item.id} className="relative">
                <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <ContentCard item={item} showDetails={true} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {getFilteredContent().slice(9).map(item => (
            <ContentCard key={item.id} item={item} showDetails={true} />
          ))}
        </div>

        {getFilteredContent().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              暂无排行数据
            </h3>
            <p className="text-gray-400">
              请稍后再试，我们正在收集最新的排行数据
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Trending;
