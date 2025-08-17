import { useState, useEffect } from 'react';

export function useWatchProgress() {
  const [watchProgress, setWatchProgress] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('netflix_watch_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWatchProgress(parsed);
      } catch (e) {
        console.error('Failed to parse watch progress:', e);
      }
    }
  }, []);

  const updateProgress = (contentId, progress, totalTime) => {
    const newProgress = {
      ...watchProgress,
      [contentId]: {
        progress: Math.min(progress, 100),
        totalTime,
        lastWatched: new Date().toISOString(),
        completed: progress >= 90
      }
    };
    
    setWatchProgress(newProgress);
    localStorage.setItem('netflix_watch_progress', JSON.stringify(newProgress));
  };

  const getProgress = (contentId) => {
    return watchProgress[contentId]?.progress || 0;
  };

  const getContinueWatching = (allContent) => {
    return Object.entries(watchProgress)
      .filter(([_, data]) => data.progress > 5 && data.progress < 90)
      .sort((a, b) => new Date(b[1].lastWatched) - new Date(a[1].lastWatched))
      .map(([contentId, _]) => allContent.find(item => item.id === parseInt(contentId)))
      .filter(Boolean)
      .slice(0, 10);
  };

  const getRecentlyWatched = (allContent) => {
    return Object.entries(watchProgress)
      .sort((a, b) => new Date(b[1].lastWatched) - new Date(a[1].lastWatched))
      .map(([contentId, _]) => allContent.find(item => item.id === parseInt(contentId)))
      .filter(Boolean)
      .slice(0, 6);
  };

  return {
    watchProgress,
    updateProgress,
    getProgress,
    getContinueWatching,
    getRecentlyWatched
  };
}
