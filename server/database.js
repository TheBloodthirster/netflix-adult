const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = null;
    this.init();
  }

  init() {
    const dbPath = path.join(__dirname, 'netflix.db');
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('数据库连接失败:', err.message);
      } else {
        console.log('数据库连接成功');
        this.createTables();
      }
    });
  }

  createTables() {
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workid TEXT UNIQUE,
        name TEXT NOT NULL,
        headImg TEXT,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        backgroundImage TEXT,
        rating REAL,
        year INTEGER,
        genre TEXT,
        type TEXT CHECK(type IN ('电影', '电视剧')),
        duration TEXT,
        seasons INTEGER,
        language TEXT DEFAULT '中文',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS user_lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content_id INTEGER,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (content_id) REFERENCES content (id),
        UNIQUE(user_id, content_id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS watch_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content_id INTEGER,
        watch_time INTEGER DEFAULT 0,
        total_time INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        last_watched DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (content_id) REFERENCES content (id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS content_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_id INTEGER,
        tag TEXT,
        FOREIGN KEY (content_id) REFERENCES content (id)
      )`
    ];

    tables.forEach(sql => {
      this.db.run(sql, (err) => {
        if (err) {
          console.error('创建表失败:', err.message);
        }
      });
    });

    this.insertInitialData();
  }

  insertInitialData() {
    const contentData = [
      {
        title: '怪奇物语',
        description: '在1980年代的印第安纳州霍金斯小镇，一个男孩神秘失踪，引发了一系列超自然事件的连锁反应。',
        image: 'https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8a?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8a?w=1920&h=1080&fit=crop',
        rating: 9.2,
        year: 2016,
        genre: '科幻/惊悚',
        type: '电视剧',
        seasons: 4
      },
      {
        title: '纸牌屋',
        description: '一个冷酷无情的政治家弗兰克·安德伍德和他同样野心勃勃的妻子克莱尔，在华盛顿特区的权力走廊中不择手段地攀登权力巅峰。',
        image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop',
        rating: 8.7,
        year: 2013,
        genre: '政治剧/惊悚',
        type: '电视剧',
        seasons: 6
      },
      {
        title: '复仇者联盟：终局之战',
        description: '在灭霸毁灭性的响指之后，复仇者们必须团结起来，再次集结，以逆转灭霸的行动并恢复宇宙的秩序。',
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1920&h=1080&fit=crop',
        rating: 8.4,
        year: 2019,
        genre: '动作/科幻',
        type: '电影',
        duration: '181分钟'
      },
      {
        title: '鱿鱼游戏',
        description: '数百名现金拮据的玩家接受邀请，参加儿童游戏竞赛。等待他们的是456亿韩元的诱人奖品。',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
        backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
        rating: 8.0,
        year: 2021,
        genre: '惊悚/剧情',
        type: '电视剧',
        seasons: 2,
        language: '韩语'
      }
    ];

    const insertContent = this.db.prepare(`
      INSERT OR IGNORE INTO content 
      (title, description, image, backgroundImage, rating, year, genre, type, duration, seasons, language)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    contentData.forEach(item => {
      insertContent.run([
        item.title, item.description, item.image, item.backgroundImage,
        item.rating, item.year, item.genre, item.type,
        item.duration || null, item.seasons || null, item.language || '中文'
      ]);
    });

    insertContent.finalize();
  }

  getAllContent(callback) {
    const sql = 'SELECT * FROM content ORDER BY created_at DESC';
    this.db.all(sql, [], callback);
  }

  getContentByType(type, callback) {
    const sql = 'SELECT * FROM content WHERE type = ? ORDER BY rating DESC';
    this.db.all(sql, [type], callback);
  }

  getContentByLanguage(language, callback) {
    const sql = 'SELECT * FROM content WHERE language = ? ORDER BY rating DESC';
    this.db.all(sql, [language], callback);
  }

  getUserList(userId, callback) {
    const sql = `
      SELECT c.*, ul.added_at 
      FROM content c 
      JOIN user_lists ul ON c.id = ul.content_id 
      WHERE ul.user_id = ? 
      ORDER BY ul.added_at DESC
    `;
    this.db.all(sql, [userId], callback);
  }

  addToUserList(userId, contentId, callback) {
    const sql = 'INSERT OR IGNORE INTO user_lists (user_id, content_id) VALUES (?, ?)';
    this.db.run(sql, [userId, contentId], callback);
  }

  removeFromUserList(userId, contentId, callback) {
    const sql = 'DELETE FROM user_lists WHERE user_id = ? AND content_id = ?';
    this.db.run(sql, [userId, contentId], callback);
  }

  updateWatchHistory(userId, contentId, watchTime, totalTime, callback) {
    const sql = `
      INSERT OR REPLACE INTO watch_history 
      (user_id, content_id, watch_time, total_time, completed, last_watched)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const completed = watchTime >= totalTime * 0.9;
    this.db.run(sql, [userId, contentId, watchTime, totalTime, completed], callback);
  }

  getWatchHistory(userId, callback) {
    const sql = `
      SELECT c.*, wh.watch_time, wh.total_time, wh.completed, wh.last_watched
      FROM content c 
      JOIN watch_history wh ON c.id = wh.content_id 
      WHERE wh.user_id = ? 
      ORDER BY wh.last_watched DESC
    `;
    this.db.all(sql, [userId], callback);
  }

  createUser(userData, callback) {
    const sql = `
      INSERT OR REPLACE INTO users (workid, name, headImg, email)
      VALUES (?, ?, ?, ?)
    `;
    this.db.run(sql, [userData.workid, userData.name, userData.headImg, userData.email], callback);
  }

  getUserByWorkId(workid, callback) {
    const sql = 'SELECT * FROM users WHERE workid = ?';
    this.db.get(sql, [workid], callback);
  }

  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('关闭数据库失败:', err.message);
        } else {
          console.log('数据库连接已关闭');
        }
      });
    }
  }
}

module.exports = Database;
