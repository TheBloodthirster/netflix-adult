import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { tvShows, movies, newAndPopular } from '../data/mockData';

function ContentDetail() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);

  // 模拟演员和制作团队数据
  const [castAndCrew] = useState({
    cast: [
      { id: 1, name: '米莉·博比·布朗', character: '小十一', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
      { id: 2, name: '芬恩·沃尔夫哈德', character: '迈克·惠勒', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      { id: 3, name: '盖顿·马塔拉佐', character: '达斯汀·亨德森', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
      { id: 4, name: '卡莱布·麦克劳克林', character: '卢卡斯·辛克莱', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
      { id: 5, name: '诺亚·施纳普', character: '威尔·拜尔斯', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face' },
      { id: 6, name: '萨迪·辛克', character: '麦克斯·梅菲尔德', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }
    ],
    crew: [
      { id: 1, name: '达夫兄弟', role: '创作者/导演', department: '导演' },
      { id: 2, name: '肖恩·利维', role: '执行制片人', department: '制片' },
      { id: 3, name: '凯尔·迪克森', role: '音乐制作', department: '音乐' },
      { id: 4, name: '迈克尔·迪克森', role: '音乐制作', department: '音乐' }
    ]
  });

  // 模拟用户评论数据
  const [reviews] = useState([
    {
      id: 1,
      user: '影迷小王',
      rating: 5,
      comment: '绝对的神剧！每一季都让人欲罢不能，演员们的表演非常出色，特效也很棒。',
      date: '2024-01-15',
      helpful: 24
    },
    {
      id: 2,
      user: '电视剧爱好者',
      rating: 4,
      comment: '很好的科幻剧，剧情紧凑，人物刻画深入。唯一的缺点是有些地方节奏稍慢。',
      date: '2024-01-10',
      helpful: 18
    },
    {
      id: 3,
      user: '怀旧控',
      rating: 5,
      comment: '80年代的怀旧感做得太棒了！音乐、服装、道具都很用心，仿佛真的回到了那个年代。',
      date: '2024-01-08',
      helpful: 31
    }
  ]);

  // 模拟相关推荐内容
  const [recommendations] = useState([
    {
      id: 13,
      title: '水曜日',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
      rating: '8.1',
      year: '2022',
      genre: '喜剧/恐怖'
    },
    {
      id: 4,
      title: '黑镜',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop',
      rating: '8.8',
      year: '2011',
      genre: '科幻/惊悚'
    },
    {
      id: 17,
      title: '鱿鱼游戏',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop',
      rating: '8.0',
      year: '2021',
      genre: '惊悚/剧情'
    },
    {
      id: 3,
      title: '王冠',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
      rating: '8.9',
      year: '2016',
      genre: '历史/剧情'
    }
  ]);

  useEffect(() => {
    // 查找内容
    const allContent = [...tvShows, ...movies, ...newAndPopular];
    const foundContent = allContent.find(item => item.id === parseInt(id));
    
    if (foundContent) {
      setContent({
        ...foundContent,
        // 扩展详细信息
        fullDescription: '在1980年代的印第安纳州霍金斯小镇，一个男孩神秘失踪，引发了一系列超自然事件。当地警长吉姆·霍珀开始调查这起案件，同时男孩的母亲乔伊斯和他的朋友们也在寻找他。在寻找过程中，他们遇到了一个拥有超能力的神秘女孩小十一，并发现了一个被称为"颠倒世界"的平行维度。这个黑暗的世界充满了危险的生物，威胁着现实世界的安全。',
        director: '达夫兄弟',
        writers: ['达夫兄弟'],
        studio: 'Netflix',
        language: '英语',
        country: '美国',
        awards: ['艾美奖最佳剧情类剧集提名', 'SAG奖最佳群戏表演'],
        ageRating: 'TV-14',
        episodes: foundContent.seasons ? `${foundContent.seasons}季 共34集` : null,
        duration: foundContent.duration || '每集约50分钟'
      });
    }
  }, [id]);

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const handleAddToList = () => {
    setIsInMyList(!isInMyList);
  };

  const submitReview = () => {
    if (userRating > 0 && userReview.trim()) {
      // 这里可以添加提交评论的逻辑
      setShowReviewModal(false);
      setUserReview('');
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white text-xl">内容未找到</div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: '概览' },
    { id: 'cast', name: '演员阵容' },
    { id: 'reviews', name: '评价' },
    { id: 'recommendations', name: '相关推荐' }
  ];

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      {/* 英雄区域 */}
      <div className="relative h-96 md:h-screen">
        <div className="absolute inset-0">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex items-end h-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8 md:pb-20">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {content.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-netflix-red text-white px-2 py-1 rounded text-sm font-semibold">
                  {content.rating}
                </span>
                <span className="text-white">{content.year}</span>
                <span className="text-white">{content.ageRating}</span>
                <span className="text-white">{content.episodes || content.duration}</span>
              </div>
              
              <p className="text-white text-lg mb-8 leading-relaxed">
                {content.fullDescription}
              </p>
              
              <div className="flex items-center space-x-4">
                <Link
                  to={`/watch/${content.id}`}
                  className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span>播放</span>
                </Link>
                
                <button
                  onClick={handleAddToList}
                  className={`flex items-center space-x-2 px-6 py-3 rounded font-semibold transition-colors ${
                    isInMyList 
                      ? 'bg-gray-600 text-white hover:bg-gray-500' 
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isInMyList ? "M5 13l4 4L19 7" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
                  </svg>
                  <span>{isInMyList ? '已添加' : '我的片单'}</span>
                </button>
                
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="flex items-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded font-semibold hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>评分</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 详细信息区域 */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* 标签导航 */}
          <div className="flex space-x-8 mb-8 border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-netflix-red'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* 概览标签页 */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-6">剧情简介</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {content.fullDescription}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">基本信息</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">导演:</span>
                        <span className="text-white">{content.director}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">制片方:</span>
                        <span className="text-white">{content.studio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">语言:</span>
                        <span className="text-white">{content.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">国家:</span>
                        <span className="text-white">{content.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">类型:</span>
                        <span className="text-white">{content.genre}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">获奖情况</h3>
                    <div className="space-y-2">
                      {content.awards.map((award, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span className="text-gray-300">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">观看统计</h3>
                <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">用户评分</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{content.rating}</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${parseFloat(content.rating) >= star * 2 ? 'text-yellow-500' : 'text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">观看次数</span>
                    <span className="text-white">2.1M</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">收藏次数</span>
                    <span className="text-white">456K</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">评论数量</span>
                    <span className="text-white">{reviews.length}K</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 演员阵容标签页 */}
          {activeTab === 'cast' && (
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">主要演员</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {castAndCrew.cast.map((actor) => (
                    <div key={actor.id} className="text-center">
                      <div className="relative mb-3">
                        <img
                          src={actor.image}
                          alt={actor.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="text-white font-semibold text-sm mb-1">{actor.name}</h3>
                      <p className="text-gray-400 text-xs">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">制作团队</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {castAndCrew.crew.map((member) => (
                    <div key={member.id} className="bg-gray-900 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{member.role}</p>
                      <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        {member.department}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 评价标签页 */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">用户评价</h2>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-netflix-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  写评价
                </button>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-900 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-netflix-red rounded-full flex items-center justify-center text-white font-semibold">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{review.user}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${review.rating >= star ? 'text-yellow-500' : 'text-gray-600'}`}
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-400 text-sm">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{review.comment}</p>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span className="text-sm">有用 ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 相关推荐标签页 */}
          {activeTab === 'recommendations' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">相关推荐</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendations.map((item) => (
                  <Link
                    key={item.id}
                    to={`/content/${item.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-semibold mb-2 line-clamp-2">{item.title}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-netflix-red text-white text-xs px-2 py-1 rounded">
                              {item.rating}
                            </span>
                            <span className="text-gray-300 text-xs">{item.year}</span>
                          </div>
                          <p className="text-gray-300 text-xs line-clamp-1">{item.genre}</p>
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h3 className="text-white font-medium line-clamp-2 mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-1">{item.genre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 评分评论模态框 */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">为《{content.title}》评分</h3>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-3">点击星星评分</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    className="transition-colors"
                  >
                    <svg
                      className={`w-8 h-8 ${userRating >= star ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-400'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">写下您的评价 (可选)</label>
              <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                rows={4}
                placeholder="分享您的观看感受..."
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none resize-none"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                取消
              </button>
              <button
                onClick={submitReview}
                disabled={userRating === 0}
                className="flex-1 px-4 py-2 bg-netflix-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交评价
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ContentDetail;
