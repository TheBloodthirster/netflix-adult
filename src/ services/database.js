import localforage from 'localforage';

class NetflixDatabase {
  constructor() {
    this.contentStore = localforage.createInstance({
      name: 'netflix-content',
      storeName: 'content'
    });
    
    this.userStore = localforage.createInstance({
      name: 'netflix-users',
      storeName: 'users'
    });
    
    this.userListStore = localforage.createInstance({
      name: 'netflix-user-lists',
      storeName: 'user_lists'
    });
    
    this.watchHistoryStore = localforage.createInstance({
      name: 'netflix-watch-history',
      storeName: 'watch_history'
    });
    
    this.initialized = false;
    this.init();
  }

  async init() {
    if (this.initialized) return;
    
    try {
      await this.initializeData();
      this.initialized = true;
      console.log('Netflix数据库初始化成功');
    } catch (error) {
      console.error('数据库初始化失败:', error);
    }
  }

  async initializeData() {
    const existingContent = await this.contentStore.getItem('initialized');
    if (existingContent) return;

    const initialContent = [
      {
        id: 1,
        title: '怪奇物语',
        description: '在1980年代的印第安纳州霍金斯小镇，一个男孩神秘失踪，引发了一系列超自然事件的连锁反应。',
        image: 'https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8a?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8a?w=1920&h=1080&fit=crop',
        rating: 9.2,
        year: 2016,
        genre: '科幻/惊悚',
        type: '电视剧',
        seasons: 4,
        language: '中文',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        title: '纸牌屋',
        description: '一个冷酷无情的政治家弗兰克·安德伍德和他同样野心勃勃的妻子克莱尔，在华盛顿特区的权力走廊中不择手段地攀登权力巅峰。',
        image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
        rating: 8.7,
        year: 2013,
        genre: '政治剧/惊悚',
        type: '电视剧',
        seasons: 6,
        language: '中文',
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        title: '王冠',
        description: '这部史诗般的剧集讲述了英国女王伊丽莎白二世的统治历程，从她1940年代的新婚生活开始，一直到现代。',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
        rating: 8.9,
        year: 2016,
        genre: '历史剧/传记',
        type: '电视剧',
        seasons: 6,
        language: '中文',
        created_at: new Date().toISOString()
      },
      {
        id: 4,
        title: '复仇者联盟：终局之战',
        description: '在灭霸毁灭性的响指之后，复仇者们必须团结起来，再次集结，以逆转灭霸的行动并恢复宇宙的秩序。',
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
        rating: 8.4,
        year: 2019,
        genre: '动作/科幻',
        type: '电影',
        duration: '181分钟',
        language: '中文',
        created_at: new Date().toISOString()
      },
      {
        id: 5,
        title: '鱿鱼游戏',
        description: '数百名现金拮据的玩家接受邀请，参加儿童游戏竞赛。等待他们的是456亿韩元的诱人奖品。',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
        rating: 8.0,
        year: 2021,
        genre: '惊悚/剧情',
        type: '电视剧',
        seasons: 2,
        language: '韩语',
        created_at: new Date().toISOString()
      },
      {
        id: 6,
        title: '蜘蛛侠：英雄无归',
        description: '彼得·帕克的身份被曝光后，他寻求奇异博士的帮助来恢复秘密。',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080&fit=crop',
        rating: 8.2,
        year: 2021,
        genre: '动作/冒险',
        type: '电影',
        duration: '148分钟',
        language: '中文',
        created_at: new Date().toISOString()
      },
      {
        id: 7,
        title: '黑镜',
        description: '探讨现代社会和科技对人类生活影响的反乌托邦选集剧。',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
        rating: 8.8,
        year: 2011,
        genre: '科幻/惊悚',
        type: '电视剧',
        seasons: 6,
        language: '中文',
        created_at: new Date().toISOString()
      },
      {
        id: 8,
        title: '女王的棋局',
        description: '一个孤儿女孩在1960年代成为国际象棋天才的成长故事。',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop',
        rating: 8.6,
        year: 2020,
        genre: '剧情',
        type: '电视剧',
        seasons: 1,
        language: '中文',
        created_at: new Date().toISOString()
      }
    ];

    for (const content of initialContent) {
      await this.contentStore.setItem(`content_${content.id}`, content);
    }
    
    await this.contentStore.setItem('initialized', true);
    await this.contentStore.setItem('content_list', initialContent.map(c => c.id));
  }

  async getAllContent() {
    await this.init();
    const contentIds = await this.contentStore.getItem('content_list') || [];
    const content = [];
    
    for (const id of contentIds) {
      const item = await this.contentStore.getItem(`content_${id}`);
      if (item) content.push(item);
    }
    
    return content.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  async getContentByType(type) {
    const allContent = await this.getAllContent();
    return allContent.filter(item => item.type === type)
                    .sort((a, b) => b.rating - a.rating);
  }

  async getContentByLanguage(language) {
    const allContent = await this.getAllContent();
    return allContent.filter(item => item.language === language)
                    .sort((a, b) => b.rating - a.rating);
  }

  async createUser(userData) {
    await this.init();
    const user = {
      id: Date.now(),
      workid: userData.workid,
      name: userData.name,
      headImg: userData.headImg,
      email: userData.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await this.userStore.setItem(`user_${userData.workid}`, user);
    return user;
  }

  async getUserByWorkId(workid) {
    await this.init();
    return await this.userStore.getItem(`user_${workid}`);
  }

  async getUserList(userId) {
    await this.init();
    const userListKey = `user_list_${userId}`;
    const contentIds = await this.userListStore.getItem(userListKey) || [];
    const userList = [];
    
    for (const contentId of contentIds) {
      const content = await this.contentStore.getItem(`content_${contentId}`);
      if (content) {
        const listItem = await this.userListStore.getItem(`${userListKey}_${contentId}`);
        userList.push({
          ...content,
          added_at: listItem?.added_at || new Date().toISOString()
        });
      }
    }
    
    return userList.sort((a, b) => new Date(b.added_at) - new Date(a.added_at));
  }

  async addToUserList(userId, contentId) {
    await this.init();
    const userListKey = `user_list_${userId}`;
    const contentIds = await this.userListStore.getItem(userListKey) || [];
    
    if (!contentIds.includes(contentId)) {
      contentIds.push(contentId);
      await this.userListStore.setItem(userListKey, contentIds);
      await this.userListStore.setItem(`${userListKey}_${contentId}`, {
        added_at: new Date().toISOString()
      });
    }
    
    return true;
  }

  async removeFromUserList(userId, contentId) {
    await this.init();
    const userListKey = `user_list_${userId}`;
    const contentIds = await this.userListStore.getItem(userListKey) || [];
    const updatedIds = contentIds.filter(id => id !== contentId);
    
    await this.userListStore.setItem(userListKey, updatedIds);
    await this.userListStore.removeItem(`${userListKey}_${contentId}`);
    
    return true;
  }

  async updateWatchHistory(userId, contentId, watchTime, totalTime) {
    await this.init();
    const historyKey = `history_${userId}_${contentId}`;
    const completed = watchTime >= totalTime * 0.9;
    
    const historyItem = {
      user_id: userId,
      content_id: contentId,
      watch_time: watchTime,
      total_time: totalTime,
      completed,
      last_watched: new Date().toISOString()
    };
    
    await this.watchHistoryStore.setItem(historyKey, historyItem);
    
    const userHistoryKey = `user_history_${userId}`;
    const historyIds = await this.watchHistoryStore.getItem(userHistoryKey) || [];
    if (!historyIds.includes(contentId)) {
      historyIds.push(contentId);
      await this.watchHistoryStore.setItem(userHistoryKey, historyIds);
    }
    
    return true;
  }

  async getWatchHistory(userId) {
    await this.init();
    const userHistoryKey = `user_history_${userId}`;
    const contentIds = await this.watchHistoryStore.getItem(userHistoryKey) || [];
    const watchHistory = [];
    
    for (const contentId of contentIds) {
      const historyItem = await this.watchHistoryStore.getItem(`history_${userId}_${contentId}`);
      const content = await this.contentStore.getItem(`content_${contentId}`);
      
      if (historyItem && content) {
        watchHistory.push({
          ...content,
          watch_time: historyItem.watch_time,
          total_time: historyItem.total_time,
          completed: historyItem.completed,
          last_watched: historyItem.last_watched
        });
      }
    }
    
    return watchHistory.sort((a, b) => new Date(b.last_watched) - new Date(a.last_watched));
  }
}

export default new NetflixDatabase();
