import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentCard from '../components/ContentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useContent, useWatchHistory, useUser, useUserList } from '../hooks/useDatabase';

function ForYou() {
  const { user } = useUser();
  const { content: allContent, loading: contentLoading } = useContent();
  const { watchHistory, loading: historyLoading } = useWatchHistory(user?.id);
  const { userList, loading: listLoading } = useUserList(user?.id);
  const [personalizedSections, setPersonalizedSections] = useState([]);
  const [userPreferences, setUserPreferences] = useState({});

  useEffect(() => {
    if (allContent.length > 0) {
      generatePersonalizedSections();
      analyzeUserPreferences();
    }
  }, [allContent, watchHistory, userList]);

  const analyzeUserPreferences = () => {
    const preferences = {
      favoriteGenres: {},
      preferredYears: {},
      ratingPreference: 0,
      typePreference: {}
    };

    [...watchHistory, ...userList].forEach(item => {
      const genres = item.genre.split('/');
      genres.forEach(genre => {
        const cleanGenre = genre.trim();
        preferences.favoriteGenres[cleanGenre] = (preferences.favoriteGenres[cleanGenre] || 0) + 1;
      });

      const yearRange = Math.floor(item.year / 10) * 10;
      preferences.preferredYears[yearRange] = (preferences.preferredYears[yearRange] || 0) + 1;
      
      preferences.ratingPreference += item.rating;
      preferences.typePreference[item.type] = (preferences.typePreference[item.type] || 0) + 1;
    });

    const totalItems = watchHistory.length + userList.length;
    if (totalItems > 0) {
      preferences.ratingPreference = preferences.ratingPreference / totalItems;
    }

    setUserPreferences(preferences);
  };

  const generatePersonalizedSections = () => {
    const watchedIds = watchHistory.map(item => item.id);
    const listedIds = userList.map(item => item.id);
    const excludedIds = [...new Set([...watchedIds, ...listedIds])];
    
    const availableContent = allContent.filter(item => !excludedIds.includes(item.id));

    const sections = [
      {
        title: '🎯 为你精选',
        description: '基于你的观看历史精心挑选',
        content: getSmartRecommendations(availableContent).slice(0, 12),
        priority: 1
      },
      {
        title: '🔥 继续观看',
        description: '继续你未完成的内容',
        content: watchHistory.filter(item => !item.completed).slice(0, 8),
        priority: watchHistory.filter(item => !item.completed).length > 0 ? 0 : 5
      },
      {
        title: '⭐ 高分佳作',
        description: '评分8.5以上的优质内容',
        content: availableContent.filter(item => item.rating >= 8.5).slice(0, 10),
        priority: 2
      },
      {
        title: '🆕 最新上线',
        description: '最近添加的新内容',
        content: availableContent
          .filter(item => item.year >= 2022)
          .sort((a, b) => b.year - a.year)
          .slice(0, 10),
        priority: 3
      },
      {
        title: '❤️ 猜你喜欢',
        description: '根据你的喜好推荐',
        content: getGenreBasedRecommendations(availableContent).slice(0, 12),
        priority: 2
      },
      {
        title: '🎬 同类型推荐',
        description: '与你收藏内容相似的作品',
        content: getSimilarContent(availableContent).slice(0, 10),
        priority: userList.length > 0 ? 2 : 4
      }
    ];

    const sortedSections = sections
      .filter(section => section.content.length > 0)
      .sort((a, b) => a.priority - b.priority);

    setPersonalizedSections(sortedSections);
  };

  const getSmartRecommendations = (content) => {
    return content
      .map(item => ({
        ...item,
        score: calculateRecommendationScore(item)
      }))
      .sort((a, b) => b.score - a.score);
  };

  const calculateRecommendationScore = (item) => {
    let score = item.rating * 10;
    
    if (item.year >= 2020) score += 15;
    if (item.year >= 2022) score += 10;
    
    const genres = item.genre.split('/');
    const genreBonus = genres.reduce((bonus, genre) => {
      const cleanGenre = genre.trim();
      return bonus + (userPreferences.favoriteGenres?.[cleanGenre] || 0) * 5;
    }, 0);
    
    score += genreBonus;
    score += (userPreferences.typePreference?.[item.type] || 0) * 3;
    score += Math.random() * 5;
    
    return score;
  };

  const getGenreBasedRecommendations = (content) => {
    const topGenres = Object.entries(userPreferences.favoriteGenres || {})
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    return content.filter(item => 
      topGenres.some(genre => item.genre.includes(genre))
    ).sort((a, b) => b.rating - a.rating);
  };

  const getSimilarContent = (content) => {
    if (userList.length === 0) return [];
    
    const listedGenres = userList.flatMap(item => item.genre.split('/').map(g => g.trim()));
    const genreFreq = {};
    listedGenres.forEach(genre => {
      genreFreq[genre] = (genreFreq[genre] || 0) + 1;
    });

    return content.filter(item => {
      const itemGenres = item.genre.split('/').map(g => g.trim());
      return itemGenres.some(genre => genreFreq[genre] > 0);
    }).sort((a, b) => b.rating - a.rating);
  };

  const getPersonalityInsights = () => {
    const topGenre = Object.entries(userPreferences.favoriteGenres || {})
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '未知';
    
    const topType = Object.entries(userPreferences.typePreference || {})
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '未知';

    const avgRating = userPreferences.ratingPreference?.toFixed(1) || '0.0';

    return { topGenre, topType, avgRating };
  };

  if (contentLoading || historyLoading || listLoading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="large" text="正在个性化定制..." />
        </div>
      </div>
    );
  }

  const insights = getPersonalityInsights();

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ✨ 专为你推荐
          </h1>
          <p className="text-gray-300 text-lg">
            基于你的独特品味，量身定制的个性化内容
          </p>
        </div>

        {(watchHistory.length > 0 || userList.length > 0) && (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">🎭 你的观影画像</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {insights.topGenre}
                </div>
                <div className="text-gray-400 text-sm">偏爱类型</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {insights.topType}
                </div>
                <div className="text-gray-400 text-sm">内容偏好</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {insights.avgRating}
                </div>
                <div className="text-gray-400 text-sm">平均评分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {watchHistory.length + userList.length}
                </div>
                <div className="text-gray-400 text-sm">互动内容</div>
              </div>
            </div>
          </div>
        )}

        {personalizedSections.length === 0 && (
          <div className="bg-gray-800/50 rounded-lg p-8 mb-8 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              开始你的个性化之旅
            </h3>
            <p className="text-gray-400 mb-4">
              观看一些内容或添加到片单，我们将为你提供个性化推荐
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => window.location.href = '#/'}
                className="bg-netflix-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                浏览首页
              </button>
              <button 
                onClick={() => window.location.href = '#/trending'}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                查看热门
              </button>
            </div>
          </div>
        )}

        {personalizedSections.map((section, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-1">
                  {section.title}
                </h2>
                <p className="text-gray-400 text-sm">
                  {section.description}
                </p>
              </div>
              {section.content.length > 6 && (
                <button className="text-netflix-red hover:text-red-400 transition-colors text-sm">
                  查看全部 →
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {section.content.slice(0, 12).map(item => (
                <ContentCard key={item.id} item={item} showDetails={true} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default ForYou;
