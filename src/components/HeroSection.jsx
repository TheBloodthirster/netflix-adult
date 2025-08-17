import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tvShows, movies, newAndPopular } from '../data/mockData';

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const heroContent = [
    {
      id: 1,
      title: '怪奇物语',
      description: '在1980年代的印第安纳州霍金斯小镇，一个男孩神秘失踪，引发了一系列超自然事件的连锁反应。',
      image: 'https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8a?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8a?w=1920&h=1080&fit=crop',
      rating: '9.2',
      year: '2016',
      genre: '科幻/惊悚',
      type: '电视剧'
    },
    {
      id: 2,
      title: '纸牌屋',
      description: '一个冷酷无情的政治家弗兰克·安德伍德和他同样野心勃勃的妻子克莱尔，在华盛顿特区的权力走廊中不择手段地攀登权力巅峰。',
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
      rating: '8.7',
      year: '2013',
      genre: '政治剧/惊悚',
      type: '电视剧'
    },
    {
      id: 3,
      title: '王冠',
      description: '这部史诗般的剧集讲述了英国女王伊丽莎白二世的统治历程，从她1940年代的新婚生活开始，一直到现代。',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
      rating: '8.9',
      year: '2016',
      genre: '历史剧/传记',
      type: '电视剧'
    },
    {
      id: 7,
      title: '复仇者联盟：终局之战',
      description: '在灭霸毁灭性的响指之后，复仇者们必须团结起来，再次集结，以逆转灭霸的行动并恢复宇宙的秩序。',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
      rating: '8.4',
      year: '2019',
      genre: '动作/科幻',
      type: '电影'
    },
    {
      id: 6,
      title: '鱿鱼游戏',
      description: '数百名现金拮据的玩家接受邀请，参加儿童游戏竞赛。等待他们的是456亿韩元的诱人奖品。',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
      rating: '8.0',
      year: '2021',
      genre: '惊悚/剧情',
      type: '电视剧'
    },
    {
      id: 8,
      title: '蜘蛛侠：英雄无归',
      description: '彼得·帕克的身份被曝光后，他寻求奇异博士的帮助来恢复秘密。',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080&fit=crop',
      rating: '8.2',
      year: '2021',
      genre: '动作/冒险',
      type: '电影'
    },
    {
      id: 4,
      title: '黑镜',
      description: '探讨现代社会和科技对人类生活影响的反乌托邦选集剧。',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
      rating: '8.8',
      year: '2011',
      genre: '科幻/惊悚',
      type: '电视剧'
    },
    {
      id: 5,
      title: '女王的棋局',
      description: '一个孤儿女孩在1960年代成为国际象棋天才的成长故事。',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop',
      rating: '8.6',
      year: '2020',
      genre: '剧情',
      type: '电视剧'
    }
  ];

  const currentContent = heroContent[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroContent.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % heroContent.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + heroContent.length) % heroContent.length;
    goToSlide(prevIndex);
  };

  const getVisibleItems = () => {
    const items = [];
    const totalItems = heroContent.length;
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalItems) % totalItems;
      items.push({
        ...heroContent[index],
        position: i,
        isActive: i === 0
      });
    }
    
    return items;
  };

  return (
    <div className="relative h-[85vh] bg-netflix-black overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentContent.backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex items-center pt-20">
        <div className="w-full px-4 md:px-16">
          <div className="mb-8">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">今日热门推荐</h2>
            <p className="text-gray-300 text-lg">精选优质内容，为您量身推荐</p>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-center relative">
              {getVisibleItems().map((item, index) => {
                const getCardStyles = () => {
                  const pos = item.position;
                  
                  if (pos === 0) {
                    // 中心卡片 - 最大
                    return {
                      width: 'w-80 md:w-96 lg:w-[28rem]',
                      height: 'h-96 md:h-[28rem] lg:h-[34rem]',
                      zIndex: 'z-50',
                      opacity: 'opacity-100',
                      scale: 'scale-100',
                      margin: 'mx-4'
                    };
                  } else if (pos === -1 || pos === 1) {
                    // 第二层卡片 - 中等
                    return {
                      width: 'w-64 md:w-80 lg:w-96',
                      height: 'h-80 md:h-96 lg:h-[28rem]',
                      zIndex: 'z-30',
                      opacity: 'opacity-90',
                      scale: 'scale-95',
                      margin: pos === -1 ? '-mr-8' : '-ml-8'
                    };
                  } else {
                    // 最外层卡片 - 最小，淡化
                    return {
                      width: 'w-48 md:w-64 lg:w-80',
                      height: 'h-64 md:h-80 lg:h-96',
                      zIndex: 'z-10',
                      opacity: 'opacity-60',
                      scale: 'scale-90',
                      margin: pos === -2 ? '-mr-12' : '-ml-12'
                    };
                  }
                };
                
                const styles = getCardStyles();
                
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className={`relative transition-all duration-500 transform cursor-pointer group ${styles.zIndex} ${styles.opacity} ${styles.scale} ${styles.margin}`}
                    onClick={() => goToSlide((currentIndex + item.position + heroContent.length) % heroContent.length)}
                  >
                    <div className={`relative transition-all duration-500 ${styles.width}`}>
                      <div className="relative overflow-hidden rounded-lg shadow-2xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`w-full ${styles.height} object-cover transition-transform duration-300 group-hover:scale-105`}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
                        
                        {/* 添加发光效果 */}
                        {item.position === 0 && (
                          <div className="absolute inset-0 rounded-lg shadow-2xl shadow-netflix-red/20"></div>
                        )}
                        
                        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                          {item.position === 0 && (
                            <>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded font-semibold">
                                  {item.rating}
                                </span>
                                <span className="text-gray-300 text-sm">{item.year}</span>
                                <span className="text-gray-400 text-sm">•</span>
                                <span className="text-gray-300 text-sm">{item.type}</span>
                              </div>
                              
                              <h3 className="text-white font-bold text-lg md:text-xl mb-2 line-clamp-2">
                                {item.title}
                              </h3>
                              
                              <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                                {item.description}
                              </p>
                              
                              <div className="text-gray-400 text-xs mb-3">
                                {item.genre}
                              </div>
                            </>
                          )}
                          
                          {item.position !== 0 && (
                            <>
                              <div className="flex items-center space-x-1 mb-1">
                                <span className="bg-netflix-red text-white text-xs px-1 py-0.5 rounded font-semibold">
                                  {item.rating}
                                </span>
                                <span className="text-gray-300 text-xs">{item.year}</span>
                              </div>
                              
                              <h3 className="text-white font-bold text-sm md:text-base line-clamp-1 mb-2">
                                {item.title}
                              </h3>
                            </>
                          )}
                          
                          <div className={`flex space-x-1 ${item.position === 0 ? 'space-x-2' : 'space-x-1'}`}>
                            <Link
                              to={`/watch/${item.id}`}
                              className={`flex items-center space-x-1 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-colors ${
                                item.position === 0 
                                  ? 'px-4 py-2 text-sm' 
                                  : 'px-2 py-1 text-xs'
                              }`}
                            >
                              <svg className={`fill-current ${item.position === 0 ? 'w-4 h-4' : 'w-3 h-3'}`} viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                              <span>播放</span>
                            </Link>
                            
                            <Link
                              to={`/content/${item.id}`}
                              className={`flex items-center space-x-1 bg-gray-600/70 text-white rounded font-semibold hover:bg-gray-600/90 transition-colors ${
                                item.position === 0 
                                  ? 'px-4 py-2 text-sm' 
                                  : 'px-2 py-1 text-xs'
                              }`}
                            >
                              <svg className={`fill-none stroke-current ${item.position === 0 ? 'w-4 h-4' : 'w-3 h-3'}`} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>详情</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 z-40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-all duration-200 z-40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {heroContent.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-netflix-red w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
