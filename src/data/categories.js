// 影片类别系统定义
export const GENRES = {
  // 主要类别
  ACTION: { id: 'action', name: '动作', color: '#ff6b6b' },
  ADVENTURE: { id: 'adventure', name: '冒险', color: '#4ecdc4' },
  COMEDY: { id: 'comedy', name: '喜剧', color: '#45b7d1' },
  DRAMA: { id: 'drama', name: '剧情', color: '#96ceb4' },
  HORROR: { id: 'horror', name: '恐怖', color: '#feca57' },
  THRILLER: { id: 'thriller', name: '惊悚', color: '#ff9ff3' },
  SCIFI: { id: 'scifi', name: '科幻', color: '#54a0ff' },
  FANTASY: { id: 'fantasy', name: '奇幻', color: '#5f27cd' },
  ROMANCE: { id: 'romance', name: '爱情', color: '#ff6b9d' },
  MYSTERY: { id: 'mystery', name: '悬疑', color: '#c44569' },
  CRIME: { id: 'crime', name: '犯罪', color: '#40407a' },
  DOCUMENTARY: { id: 'documentary', name: '纪录片', color: '#2c2c54' },
  ANIMATION: { id: 'animation', name: '动画', color: '#ff6348' },
  FAMILY: { id: 'family', name: '家庭', color: '#2ed573' },
  MUSIC: { id: 'music', name: '音乐', color: '#ffa502' },
  SPORT: { id: 'sport', name: '体育', color: '#3742fa' },
  WAR: { id: 'war', name: '战争', color: '#747d8c' },
  WESTERN: { id: 'western', name: '西部', color: '#a4b0be' },
  BIOGRAPHY: { id: 'biography', name: '传记', color: '#57606f' },
  HISTORY: { id: 'history', name: '历史', color: '#2f3542' },
  POLITICAL: { id: 'political', name: '政治', color: '#1e3799' }
};

// 年龄分级
export const AGE_RATINGS = {
  G: { id: 'g', name: '全年龄', description: '适合所有年龄观看' },
  PG: { id: 'pg', name: 'PG', description: '建议家长指导' },
  PG13: { id: 'pg13', name: 'PG-13', description: '13岁以下需家长陪同' },
  R: { id: 'r', name: 'R级', description: '17岁以下需成人陪同' },
  NC17: { id: 'nc17', name: 'NC-17', description: '17岁以下禁止观看' },
  TV_Y: { id: 'tv_y', name: 'TV-Y', description: '适合儿童' },
  TV_PG: { id: 'tv_pg', name: 'TV-PG', description: '建议家长指导' },
  TV_14: { id: 'tv_14', name: 'TV-14', description: '14岁以上适宜' },
  TV_MA: { id: 'tv_ma', name: 'TV-MA', description: '成人内容' }
};

// 制作国家/地区
export const COUNTRIES = {
  US: { id: 'us', name: '美国', flag: '🇺🇸' },
  UK: { id: 'uk', name: '英国', flag: '🇬🇧' },
  KR: { id: 'kr', name: '韩国', flag: '🇰🇷' },
  JP: { id: 'jp', name: '日本', flag: '🇯🇵' },
  CN: { id: 'cn', name: '中国', flag: '🇨🇳' },
  FR: { id: 'fr', name: '法国', flag: '🇫🇷' },
  DE: { id: 'de', name: '德国', flag: '🇩🇪' },
  ES: { id: 'es', name: '西班牙', flag: '🇪🇸' },
  IT: { id: 'it', name: '意大利', flag: '🇮🇹' },
  IN: { id: 'in', name: '印度', flag: '🇮🇳' },
  BR: { id: 'br', name: '巴西', flag: '🇧🇷' },
  CA: { id: 'ca', name: '加拿大', flag: '🇨🇦' },
  AU: { id: 'au', name: '澳大利亚', flag: '🇦🇺' },
  MX: { id: 'mx', name: '墨西哥', flag: '🇲🇽' },
  RU: { id: 'ru', name: '俄罗斯', flag: '🇷🇺' }
};

// 内容标签
export const CONTENT_TAGS = {
  NETFLIX_ORIGINAL: { id: 'netflix_original', name: 'Netflix原创', color: '#e50914' },
  TRENDING: { id: 'trending', name: '热门趋势', color: '#ff6b35' },
  NEW_RELEASE: { id: 'new_release', name: '新上线', color: '#4ecdc4' },
  CRITICALLY_ACCLAIMED: { id: 'critically_acclaimed', name: '获奖作品', color: '#ffd700' },
  BINGE_WORTHY: { id: 'binge_worthy', name: '值得刷剧', color: '#9b59b6' },
  FEEL_GOOD: { id: 'feel_good', name: '治愈系', color: '#2ecc71' },
  MIND_BENDING: { id: 'mind_bending', name: '烧脑', color: '#e74c3c' },
  BASED_ON_BOOK: { id: 'based_on_book', name: '改编自小说', color: '#34495e' },
  BASED_ON_TRUE_STORY: { id: 'based_on_true_story', name: '真实故事改编', color: '#16a085' },
  CULT_CLASSIC: { id: 'cult_classic', name: '经典佳作', color: '#8e44ad' }
};

// 情绪标签
export const MOOD_TAGS = {
  EXCITING: { id: 'exciting', name: '刺激', icon: '⚡' },
  FUNNY: { id: 'funny', name: '搞笑', icon: '😂' },
  ROMANTIC: { id: 'romantic', name: '浪漫', icon: '💕' },
  SCARY: { id: 'scary', name: '恐怖', icon: '😱' },
  EMOTIONAL: { id: 'emotional', name: '感人', icon: '😢' },
  INSPIRING: { id: 'inspiring', name: '励志', icon: '💪' },
  RELAXING: { id: 'relaxing', name: '轻松', icon: '😌' },
  INTENSE: { id: 'intense', name: '紧张', icon: '😰' },
  THOUGHT_PROVOKING: { id: 'thought_provoking', name: '深度思考', icon: '🤔' },
  NOSTALGIC: { id: 'nostalgic', name: '怀旧', icon: '🕰️' }
};

// 获取类别颜色
export const getGenreColor = (genreId) => {
  const genre = Object.values(GENRES).find(g => g.id === genreId);
  return genre ? genre.color : '#6c757d';
};

// 解析类别字符串为数组
export const parseGenres = (genreString) => {
  if (!genreString) return [];
  return genreString.split('/').map(g => g.trim());
};

// 获取类别对象
export const getGenreObject = (genreName) => {
  return Object.values(GENRES).find(g => g.name === genreName) || { id: 'unknown', name: genreName, color: '#6c757d' };
};

// 筛选函数
export const filterContentByGenre = (content, selectedGenres) => {
  if (!selectedGenres || selectedGenres.length === 0) return content;
  
  return content.filter(item => {
    const itemGenres = parseGenres(item.genre);
    return selectedGenres.some(selectedGenre => 
      itemGenres.some(itemGenre => itemGenre === selectedGenre)
    );
  });
};

export const filterContentByRating = (content, minRating) => {
  if (!minRating) return content;
  return content.filter(item => parseFloat(item.rating) >= minRating);
};

export const filterContentByYear = (content, yearRange) => {
  if (!yearRange || (!yearRange.min && !yearRange.max)) return content;
  
  return content.filter(item => {
    const year = parseInt(item.year);
    const min = yearRange.min ? parseInt(yearRange.min) : 0;
    const max = yearRange.max ? parseInt(yearRange.max) : 9999;
    return year >= min && year <= max;
  });
};

export const filterContentByCountry = (content, selectedCountries) => {
  if (!selectedCountries || selectedCountries.length === 0) return content;
  
  return content.filter(item => {
    if (!item.countries) return false;
    return selectedCountries.some(country => item.countries.includes(country));
  });
};

export const filterContentByTags = (content, selectedTags) => {
  if (!selectedTags || selectedTags.length === 0) return content;
  
  return content.filter(item => {
    if (!item.tags) return false;
    return selectedTags.some(tag => item.tags.includes(tag));
  });
};

export const filterContentByMoods = (content, selectedMoods) => {
  if (!selectedMoods || selectedMoods.length === 0) return content;
  
  return content.filter(item => {
    if (!item.moods) return false;
    return selectedMoods.some(mood => item.moods.includes(mood));
  });
};
