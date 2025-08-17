const express = require('express');
const cors = require('cors');
const Database = require('./database');

const app = express();
const db = new Database();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/api/content', (req, res) => {
  db.getAllContent((err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/content/type/:type', (req, res) => {
  const { type } = req.params;
  db.getContentByType(type, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/content/language/:language', (req, res) => {
  const { language } = req.params;
  db.getContentByLanguage(language, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/users', (req, res) => {
  const userData = req.body;
  db.createUser(userData, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, message: '用户创建成功' });
  });
});

app.get('/api/users/:workid', (req, res) => {
  const { workid } = req.params;
  db.getUserByWorkId(workid, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: '用户不存在' });
      return;
    }
    res.json(row);
  });
});

app.get('/api/users/:userId/list', (req, res) => {
  const { userId } = req.params;
  db.getUserList(userId, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/users/:userId/list/:contentId', (req, res) => {
  const { userId, contentId } = req.params;
  db.addToUserList(userId, contentId, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: '添加到我的片单成功' });
  });
});

app.delete('/api/users/:userId/list/:contentId', (req, res) => {
  const { userId, contentId } = req.params;
  db.removeFromUserList(userId, contentId, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: '从我的片单移除成功' });
  });
});

app.get('/api/users/:userId/history', (req, res) => {
  const { userId } = req.params;
  db.getWatchHistory(userId, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/users/:userId/history/:contentId', (req, res) => {
  const { userId, contentId } = req.params;
  const { watchTime, totalTime } = req.body;
  
  db.updateWatchHistory(userId, contentId, watchTime, totalTime, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: '观看记录更新成功' });
  });
});

app.listen(PORT, () => {
  console.log(`API服务器运行在端口 ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('正在关闭服务器...');
  db.close();
  process.exit(0);
});
