import React, { useEffect, memo } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useContent, useContentByType } from '../hooks/useDatabase';
import { useWatchProgress } from '../hooks/useWatchProgress';
import { tvShows, movies, newAndPopular } from '../data/mockData';
import { preloadImages, cleanupResources } from '../utils/performance';



const HomePage = memo(function HomePage() {
  const { content: allContent, loading: allLoading } = useContent();
  const { content: tvContent, loading: tvLoading } = useContentByType('电视剧');
  const { content: movieContent, loading: movieLoading } = useContentByType('电影');
  const { getContinueWatching, getRecentlyWatched } = useWatchProgress();

  const isLoading = allLoading || tvLoading || movieLoading;
  
  // 合并所有内容用于继续观看功能
  const combinedContent = [...(allContent || []), ...tvShows, ...movies, ...newAndPopular];
  const continueWatchingItems = getContinueWatching(combinedContent);
  const recentlyWatchedItems = getRecentlyWatched(combinedContent);
  
  // 性能优化：预加载图片和清理资源
  useEffect(() => {
    const preloadCriticalImages = async () => {
      const criticalImages = [
        ...tvShows.slice(0, 6).map(item => item.image),
        ...movies.slice(0, 6).map(item => item.image)
      ];
      await preloadImages(criticalImages, 2);
    };
    
    preloadCriticalImages();
    cleanupResources();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <LoadingSpinner size="large" text="正在加载精彩内容..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      <HeroSection />
      
      <div className="relative z-10 pt-8">
        {continueWatchingItems.length > 0 && (
          <MovieRow 
            title="继续观看" 
            movies={continueWatchingItems} 
            showProgress={true}
            priority={true}
          />
        )}
        
        {recentlyWatchedItems.length > 0 && (
          <MovieRow 
            title="最近观看" 
            movies={recentlyWatchedItems} 
            showProgress={true}
          />
        )}
        
        <MovieRow 
          title="热门电视剧" 
          movies={tvContent.length > 0 ? tvContent : tvShows} 
          showSmartTags={true}
        />
        <MovieRow 
          title="精选电影" 
          movies={movieContent.length > 0 ? movieContent : movies} 
          showSmartTags={true}
        />
        <MovieRow 
          title="最新热门" 
          movies={newAndPopular} 
          showSmartTags={true}
        />
        <MovieRow 
          title="Netflix 原创" 
          movies={allContent.slice(0, 6)} 
          showSmartTags={true}
        />
        <MovieRow 
          title="高分推荐" 
          movies={allContent.filter(item => item.rating >= 8.0)} 
          showSmartTags={true}
        />
        <MovieRow 
          title="最近添加" 
          movies={allContent.slice(-6)} 
          showSmartTags={true}
        />
      </div>
      
      <Footer />
    </div>
  );
});

export default HomePage;
