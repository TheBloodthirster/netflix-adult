import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentCard from '../components/ContentCard';

function Recommendations() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 伪造的推荐数据 - 直接定义，不依赖任何异步加载
  const recommendations = {
    byGenre: [
      {
        id: 101,
        title: "星际穿越",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
        rating: 9.3,
        year: 2014,
        type: "电影",
        genre: "科幻/剧情",
        description: "一部关于时间、空间和人类情感的史诗级科幻电影"
      },
      {
        id: 102,
        title: "盗梦空间",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
        rating: 9.2,
        year: 2010,
        type: "电影",
        genre: "科幻/悬疑",
        description: "在梦境中植入想法的复杂故事"
      },
      {
        id: 103,
        title: "银翼杀手2049",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
        rating: 8.8,
        year: 2017,
        type: "电影",
        genre: "科幻/动作",
        description: "经典科幻电影的续作，视觉震撼"
      },
      {
        id: 104,
        title: "黑客帝国",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
        rating: 8.7,
        year: 1999,
        type: "电影",
        genre: "科幻/动作",
        description: "改变电影历史的科幻经典"
      },
      {
        id: 105,
        title: "火星救援",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
        rating: 8.5,
        year: 2015,
        type: "电影",
        genre: "科幻/剧情",
        description: "一个人在火星上的生存故事"
      },
      {
        id: 106,
        title: "降临",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
        rating: 8.3,
        year: 2016,
        type: "电影",
        genre: "科幻/剧情",
        description: "关于语言和时间的深刻思考"
      }
    ],
    byRating: [
      {
        id: 201,
        title: "肖申克的救赎",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 9.7,
        year: 1994,
        type: "电影",
        genre: "剧情",
        description: "关于希望和友谊的永恒经典"
      },
      {
        id: 202,
        title: "教父",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 9.6,
        year: 1972,
        type: "电影",
        genre: "剧情/犯罪",
        description: "黑帮电影的巅峰之作"
      },
      {
        id: 203,
        title: "辛德勒的名单",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 9.5,
        year: 1993,
        type: "电影",
        genre: "剧情/历史",
        description: "关于人性光辉的感人故事"
      },
      {
        id: 204,
        title: "阿甘正传",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 9.4,
        year: 1994,
        type: "电影",
        genre: "剧情/喜剧",
        description: "生活就像一盒巧克力"
      },
      {
        id: 205,
        title: "泰坦尼克号",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 9.3,
        year: 1997,
        type: "电影",
        genre: "剧情/爱情",
        description: "永恒的爱情史诗"
      },
      {
        id: 206,
        title: "这个杀手不太冷",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 9.2,
        year: 1994,
        type: "电影",
        genre: "剧情/动作",
        description: "温暖人心的杀手故事"
      }
    ],
    byYear: [
      {
        id: 301,
        title: "沙丘",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
        rating: 8.9,
        year: 2021,
        type: "电影",
        genre: "科幻/冒险",
        description: "史诗级科幻巨制的重新演绎"
      },
      {
        id: 302,
        title: "蜘蛛侠：英雄无归",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
        rating: 8.7,
        year: 2021,
        type: "电影",
        genre: "动作/科幻",
        description: "多元宇宙的精彩碰撞"
      },
      {
        id: 303,
        title: "奇异博士2",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
        rating: 8.5,
        year: 2022,
        type: "电影",
        genre: "动作/奇幻",
        description: "多元宇宙的疯狂冒险"
      },
      {
        id: 304,
        title: "阿凡达：水之道",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
        rating: 8.4,
        year: 2022,
        type: "电影",
        genre: "科幻/冒险",
        description: "视觉奇观的全新篇章"
      },
      {
        id: 305,
        title: "壮志凌云2",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
        rating: 8.3,
        year: 2022,
        type: "电影",
        genre: "动作/剧情",
        description: "经典续作的完美回归"
      },
      {
        id: 306,
        title: "新蝙蝠侠",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
        rating: 8.2,
        year: 2022,
        type: "电影",
        genre: "动作/犯罪",
        description: "黑暗骑士的全新诠释"
      }
    ],
    similar: [
      {
        id: 401,
        title: "权力的游戏",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 9.1,
        year: 2011,
        type: "电视剧",
        genre: "剧情/奇幻",
        description: "史诗级奇幻剧集"
      },
      {
        id: 402,
        title: "绝命毒师",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 9.0,
        year: 2008,
        type: "电视剧",
        genre: "剧情/犯罪",
        description: "关于选择和后果的深刻故事"
      },
      {
        id: 403,
        title: "怪奇物语",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
        rating: 8.8,
        year: 2016,
        type: "电视剧",
        genre: "科幻/悬疑",
        description: "80年代风格的超自然冒险"
      },
      {
        id: 404,
        title: "黑镜",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
        rating: 8.7,
        year: 2011,
        type: "电视剧",
        genre: "科幻/悬疑",
        description: "科技对人性的深刻反思"
      },
      {
        id: 405,
        title: "纸牌屋",
        image: "https://images.unsplash.com/photo-1489599735734-79b4fe286040?w=300&h=450&fit=crop",
        rating: 8.6,
        year: 2013,
        type: "电视剧",
        genre: "剧情/政治",
        description: "政治权谋的精彩演绎"
      },
      {
        id: 406,
        title: "西部世界",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
        rating: 8.5,
        year: 2016,
        type: "电视剧",
        genre: "科幻/西部",
        description: "人工智能与人性的碰撞"
      }
    ]
  };

  const categories = [
    { id: 'all', name: '全部推荐', icon: '🎯' },
    { id: 'byGenre', name: '基于喜好', icon: '❤️' },
    { id: 'byRating', name: '高分推荐', icon: '⭐' },
    { id: 'byYear', name: '最新内容', icon: '🆕' },
    { id: 'similar', name: '相似内容', icon: '🔄' }
  ];

  const getDisplayContent = () => {
    if (selectedCategory === 'all') {
      return [
        ...recommendations.byGenre.slice(0, 4),
        ...recommendations.byRating.slice(0, 4),
        ...recommendations.byYear.slice(0, 4)
      ];
    }
    return recommendations[selectedCategory] || [];
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎯 为你推荐
          </h1>
          <p className="text-gray-300 text-lg">
            基于你的观看历史和偏好，为你精心挑选的内容
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-netflix-red text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {getDisplayContent().map(item => (
            <ContentCard key={item.id} item={item} showDetails={true} />
          ))}
        </div>

        {getDisplayContent().length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              暂无推荐内容
            </h3>
            <p className="text-gray-400">
              继续观看更多内容，我们将为你提供更好的推荐
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Recommendations;
