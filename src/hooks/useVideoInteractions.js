import { useState, useEffect } from 'react';

export function useVideoInteractions(contentId) {
  const [interactions, setInteractions] = useState({
    views: 0,
    likes: 0,
    isLiked: false,
    isBookmarked: false,
    shares: 0
  });

  useEffect(() => {
    // 从本地存储加载数据
    const savedInteractions = localStorage.getItem('netflix_video_interactions');
    if (savedInteractions) {
      try {
        const allInteractions = JSON.parse(savedInteractions);
        if (allInteractions[contentId]) {
          setInteractions(prev => ({
            ...prev,
            ...allInteractions[contentId]
          }));
        }
      } catch (e) {
        console.error('Failed to parse video interactions:', e);
      }
    }

    // 生成随机播放次数（模拟真实数据）
    const baseViews = Math.floor(Math.random() * 1000000) + 50000;
    const baseLikes = Math.floor(baseViews * (0.05 + Math.random() * 0.15)); // 5-20% 点赞率
    const baseShares = Math.floor(baseLikes * (0.1 + Math.random() * 0.3)); // 10-40% 分享率

    setInteractions(prev => ({
      ...prev,
      views: prev.views || baseViews,
      likes: prev.likes || baseLikes,
      shares: prev.shares || baseShares
    }));
  }, [contentId]);

  const saveInteractions = (newInteractions) => {
    const savedInteractions = localStorage.getItem('netflix_video_interactions');
    let allInteractions = {};
    
    if (savedInteractions) {
      try {
        allInteractions = JSON.parse(savedInteractions);
      } catch (e) {
        console.error('Failed to parse existing interactions:', e);
      }
    }
    
    allInteractions[contentId] = newInteractions;
    localStorage.setItem('netflix_video_interactions', JSON.stringify(allInteractions));
  };

  const toggleLike = () => {
    const newInteractions = {
      ...interactions,
      isLiked: !interactions.isLiked,
      likes: interactions.isLiked ? interactions.likes - 1 : interactions.likes + 1
    };
    setInteractions(newInteractions);
    saveInteractions(newInteractions);
  };

  const toggleBookmark = () => {
    const newInteractions = {
      ...interactions,
      isBookmarked: !interactions.isBookmarked
    };
    setInteractions(newInteractions);
    saveInteractions(newInteractions);
  };

  const incrementShare = () => {
    const newInteractions = {
      ...interactions,
      shares: interactions.shares + 1
    };
    setInteractions(newInteractions);
    saveInteractions(newInteractions);
  };

  const incrementView = () => {
    const newInteractions = {
      ...interactions,
      views: interactions.views + 1
    };
    setInteractions(newInteractions);
    saveInteractions(newInteractions);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return {
    interactions,
    toggleLike,
    toggleBookmark,
    incrementShare,
    incrementView,
    formatNumber
  };
}
