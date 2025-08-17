# Netflix 首页克隆项目

## 项目概述
这是一个Netflix首页的1:1复原项目，使用React + Tailwind CSS构建，完全还原Netflix的视觉设计和交互体验。

## 路由结构
```
/ - 首页 (HomePage)
/tv-shows - 电视剧页面 (TVShows)
/movies - 电影页面 (Movies)
/new-and-popular - 最新热门页面 (NewAndPopular)
/my-list - 我的片单页面 (MyList)
/browse-by-language - 按语言浏览页面 (BrowseByLanguage)
/tags - 标签分类页面 (TagSystem)
/watch/:id - 视频播放器页面 (VideoPlayer)
/recommendations - 个性化推荐页面 (Recommendations)
/trending - 实时热门趋势页面 (Trending)
/for-you - 专为你推荐页面 (ForYou)
/creator-studio - 内容创作者工作台 (CreatorStudio)
/upload - 视频上传页面 (Upload)
/analytics - 观看数据分析页面 (Analytics)
/subscription - 订阅管理页面 (Subscription)
/billing - 账单历史页面 (Billing)
/gift-cards - 礼品卡兑换页面 (GiftCards)
/referral - 推荐奖励系统页面 (Referral)
```

## URL 映射表
### 核心功能页面
- 首页: `1d.alibaba-inc.com/_p/3001/index.html#/`
- 电视剧: `1d.alibaba-inc.com/_p/3001/index.html#/tv-shows`
- 电影: `1d.alibaba-inc.com/_p/3001/index.html#/movies`
- 最新热门: `1d.alibaba-inc.com/_p/3001/index.html#/new-and-popular`
- 我的片单: `1d.alibaba-inc.com/_p/3001/index.html#/my-list`
- 按语言浏览: `1d.alibaba-inc.com/_p/3001/index.html#/browse-by-language`
- 标签分类: `1d.alibaba-inc.com/_p/3001/index.html#/tags`
- 视频播放器: `1d.alibaba-inc.com/_p/3001/index.html#/watch/{id}` (例如: `/watch/1`)
- 搜索结果: `1d.alibaba-inc.com/_p/3001/index.html#/search?q={query}`

### 个性化推荐系统
- 个性化推荐: `1d.alibaba-inc.com/_p/3001/index.html#/recommendations`
- 实时热门趋势: `1d.alibaba-inc.com/_p/3001/index.html#/trending`
- 专为你推荐: `1d.alibaba-inc.com/_p/3001/index.html#/for-you`

### 内容管理系统
- 创作者工作台: `1d.alibaba-inc.com/_p/3001/index.html#/creator-studio`
- 视频上传: `1d.alibaba-inc.com/_p/3001/index.html#/upload`
- 数据分析: `1d.alibaba-inc.com/_p/3001/index.html#/analytics`

### 商业功能系统
- 订阅管理: `1d.alibaba-inc.com/_p/3001/index.html#/subscription`
- 账单历史: `1d.alibaba-inc.com/_p/3001/index.html#/billing`
- 礼品卡中心: `1d.alibaba-inc.com/_p/3001/index.html#/gift-cards`
- 推荐奖励: `1d.alibaba-inc.com/_p/3001/index.html#/referral`

### 用户管理页面
- 用户个人资料: `1d.alibaba-inc.com/_p/3001/index.html#/profile`
- 内容详情: `1d.alibaba-inc.com/_p/3001/index.html#/content/{id}` (例如: `/content/1`)
- 下载管理: `1d.alibaba-inc.com/_p/3001/index.html#/downloads`
- 账户设置: `1d.alibaba-inc.com/_p/3001/index.html#/account-settings`
- 帮助中心: `1d.alibaba-inc.com/_p/3001/index.html#/help`

## 技术栈
- React 18.2.0
- React Router DOM 6.8.0 (HashRouter)
- Tailwind CSS 3.3.5
- Webpack 5.89.0
- Webpack Dev Server 4.15.1

## 项目结构
```
src/
├── components/
│   ├── Header.jsx          # 顶部导航栏（支持路由导航、用户菜单、登录模态框）
│   ├── HeroSection.jsx     # 主要英雄区域（支持播放按钮跳转）
│   ├── MovieRow.jsx        # 电影轮播组件（支持播放按钮跳转）
│   ├── ContentCard.jsx     # 内容卡片组件（支持播放按钮跳转）
│   └── Footer.jsx          # 页脚组件
├── pages/
│   ├── HomePage.jsx        # 首页
│   ├── TVShows.jsx         # 电视剧页面
│   ├── Movies.jsx          # 电影页面
│   ├── NewAndPopular.jsx   # 最新热门页面
│   ├── MyList.jsx          # 我的片单页面
│   ├── BrowseByLanguage.jsx # 按语言浏览页面
│   ├── TagSystem.jsx       # 标签分类页面
│   ├── VideoPlayer.jsx     # 视频播放器页面
│   ├── SearchResults.jsx   # 搜索结果页面
│   ├── UserProfile.jsx     # 用户个人资料页面
│   ├── ContentDetail.jsx   # 内容详情页面
│   ├── DownloadManager.jsx # 下载管理页面
│   ├── AccountSettings.jsx # 账户设置页面
│   ├── HelpCenter.jsx      # 帮助中心页面
│   ├── Recommendations.jsx # 个性化推荐页面
│   ├── Trending.jsx        # 实时热门趋势页面
│   ├── ForYou.jsx          # 专为你推荐页面
│   ├── CreatorStudio.jsx   # 创作者工作台页面
│   ├── Upload.jsx          # 视频上传页面
│   ├── Analytics.jsx       # 数据分析页面
│   ├── Subscription.jsx    # 订阅管理页面
│   ├── Billing.jsx         # 账单历史页面
│   ├── GiftCards.jsx       # 礼品卡中心页面
│   └── Referral.jsx        # 推荐奖励系统页面
├── data/
│   └── mockData.js         # 模拟数据
├── styles/
│   └── index.css          # 全局样式
├── App.jsx                # 主应用组件
└── index.jsx              # 入口文件
```

## 主要功能
### 核心功能
1. **响应式头部导航** - 滚动时背景变化效果，支持路由导航和当前页面高亮
2. **用户系统** - 完整的用户下拉菜单、登录模态框、登录状态管理
3. **英雄区域** - 大背景图片，渐变遮罩，播放按钮（支持跳转到播放器）
4. **电影轮播** - 水平滚动的电影列表，悬停效果，播放按钮跳转
5. **视频播放器** - 完整的HTML5视频播放器，支持播放控制、进度条、音量调节、全屏
6. **页脚** - 完整的链接和信息
7. **电视剧页面** - 专门的电视剧内容展示
8. **电影页面** - 电影内容分类展示
9. **最新热门页面** - 带标签筛选的新内容和热门内容
10. **我的片单页面** - 个人收藏管理，支持排序
11. **按语言浏览页面** - 多语言内容分类浏览
12. **搜索功能** - 全文搜索和高级筛选
13. **内容详情页** - 详细的内容信息和相关推荐
14. **下载管理** - 离线内容下载和管理

### 个性化推荐系统
15. **智能推荐** - 基于观看历史的个性化内容推荐
16. **实时热门** - 动态热门趋势和排行榜
17. **专属推荐** - 深度个性化的内容发现

### 内容管理系统
18. **创作者工作台** - 内容创作者的统一管理平台
19. **视频上传** - 多步骤的内容上传流程
20. **数据分析** - 详细的观看数据和用户行为分析

### 商业功能系统
21. **订阅管理** - 多层级订阅计划和管理
22. **账单系统** - 完整的付费记录和支付方式管理
23. **礼品卡系统** - 礼品卡购买、兑换和管理
24. **推荐奖励** - 用户推荐奖励和社交分享系统

### 用户体验优化
25. **响应式设计** - 完美适配各种设备和屏幕尺寸
26. **无障碍支持** - 键盘导航和屏幕阅读器支持
27. **性能优化** - 图片懒加载、代码分割、缓存策略
28. **错误处理** - 完善的错误边界和用户友好的错误提示

## 开发命令
- `anpm run dev` - 启动开发服务器
- `anpm run build` - 构建生产版本
