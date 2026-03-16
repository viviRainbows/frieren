/**
 * Frieren 博客首页
 * 
 * 设计主题：芙莉莲 - 魔法使的旅程
 * 灵感来源：《葬送的芙莉莲》
 * 核心理念：时间、记忆、魔法、旅程
 * 主要用途：美食/账目/运动/深度报告/日记等生活记录
 */

const { generatePage, generateNav, generateFooter, BASE_URL } = require('./template');

/**
 * 生成首页 HTML
 */
function generateHomepage(options = {}) {
  const {
    siteName = 'Frieren',
    features = [],
    stats = {}
  } = options;
  
  // 默认功能卡片 - 魔法使的生活记录
  const defaultFeatures = [
    {
      tag: '美食',
      tagNew: false,
      icon: '🍽️',
      title: '美食图鉴',
      desc: '记录每一个品尝过的村庄美食，像收集魔法卷轴一样珍藏味蕾的记忆',
      href: './food.html',
      color: '#f59e0b'
    },
    {
      tag: '账目',
      tagNew: false,
      icon: '💰',
      title: '魔力账簿',
      desc: '管理旅途中的金币与物资，让每一笔收支都清晰可见',
      href: './accounting.html',
      color: '#10b981'
    },
    {
      tag: '仓库',
      tagNew: false,
      icon: '📦',
      title: '生活仓库',
      desc: '管理生活物品，智能设备与宠物用品，让生活井井有条',
      href: './life-warehouse.html',
      color: '#00d9ff'
    },
    {
      tag: '衣橱',
      tagNew: true,
      icon: '👔',
      title: '我的衣橱',
      desc: '管理衣物，配饰与穿搭，让每一天都光彩照人',
      href: './closet.html',
      color: '#FF6B9D'
    },
    {
      tag: '修行',
      tagNew: false,
      icon: '🏃',
      title: '魔法修行',
      desc: '记录每一次魔力控制的训练，见证从弱小到强大的成长轨迹',
      href: './training.html',
      color: '#8b5cf6'
    },
    {
      tag: '研究',
      tagNew: false,
      icon: '📚',
      title: '魔导书房',
      desc: '在浩瀚的书海中探索，记录每一次对魔法与世界的深刻理解',
      href: './cate/',
      color: '#06b6d4'
    }
  ];
  
  // 芙莉莲经典语录集
  const quotes = [
    // 关于时间与记忆
    { text: '即使过了一千年，我依然会记得今天', source: 'Frieren', context: '对重要时刻的珍视' },
    { text: '人类的一生很短暂，但记忆会永远留存', source: 'Frieren', context: '关于记忆的力量' },
    { text: '漫长的生命里，总有那么几个瞬间值得永远铭记', source: 'Frieren', context: '珍惜当下' },
    { text: '即使是千年时光，也无法抹去那些珍贵的回忆', source: 'Frieren', context: '记忆的永恒' },
    
    // 关于魔法与生活
    { text: '魔法是为了让人们的生活更加便利而存在的', source: 'Frieren', context: '魔法的本质' },
    { text: '寻找魔法的乐趣，就在于过程中的点点滴滴', source: 'Frieren', context: '探索的意义' },
    { text: '即使是微不足道的魔法，也能为某个人带来幸福', source: 'Frieren', context: '魔法的价值' },
    { text: '魔法师的价值，不在于强大的魔力，而在于对魔法的热爱', source: 'Frieren', context: '魔法师的信念' },
    
    // 关于旅程与伙伴
    { text: '每一段旅程都是珍贵的回忆', source: 'Frieren', context: '旅程的意义' },
    { text: '旅途中遇到的每一个人，都是命运的馈赠', source: 'Frieren', context: '珍惜相遇' },
    { text: '即使伙伴们已经离去，我们的羁绊会永远存在', source: 'Frieren', context: '永恒的羁绊' },
    { text: '旅行不只是为了抵达目的地，更是为了沿途的风景', source: 'Frieren', context: '旅程的价值' },
    
    // 关于生命与存在
    { text: '重要的不是活了多久，而是如何度过', source: 'Himmel', context: '生命的意义' },
    { text: '即使是短暂的一生，也能创造出永恒的价值', source: 'Himmel', context: '短暂与永恒' },
    { text: '活着的意义，就是创造值得铭记的回忆', source: 'Frieren', context: '存在的意义' },
    { text: '在漫长的时光中，唯一不变的就是变化本身', source: 'Frieren', context: '时间与变化' },
    
    // 关于成长与未来
    { text: '现在的努力，是为了成为未来的回忆', source: 'Frieren', context: '当下的意义' },
    { text: '每一天都是新的开始，每一刻都值得珍惜', source: 'Frieren', context: '珍惜当下' },
    { text: '即使前路漫漫，也要坚定地走下去', source: 'Frieren', context: '坚持与勇气' },
    { text: '成长的过程，就是不断超越过去的自己', source: 'Frieren', context: '成长的意义' }
  ];
  
  // 随机选择一条语录
  const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  const featureList = features.length > 0 ? features : defaultFeatures;
  
  // 统计数据
  const defaultStats = {
    totalPosts: 365,
    totalCategories: 6,
    totalDays: 365,
    satisfaction: 98
  };
  const statsData = { ...defaultStats, ...stats };
  
  // 首页特定样式 - 芙莉莲主题
  const homepageStyles = `
/* ========== 芙莉莲主题首页样式 ========== */

/* 粒子背景容器 */
#particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

/* 魔法星空背景 */
body {
  background: linear-gradient(135deg, 
    #0f0c29 0%, 
    #1a1a3e 25%,
    #16213e 50%, 
    #1e1e2e 75%,
    #24243e 100%
  ) !important;
  background-size: 400% 400% !important;
  animation: magicBgShift 20s ease infinite !important;
}

@keyframes magicBgShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.home-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 30px;
}

/* ========== 英雄区域 - 魔法使之旅 ========== */
.hero-section {
  text-align: center;
  padding: 70px 30px 60px;
  margin-bottom: 60px;
  position: relative;
  border-radius: 32px;
  overflow: hidden;
}

/* 魔法阵装饰 */
.hero-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: 
    radial-gradient(circle at 50% 50%, transparent 20%, rgba(139, 92, 246, 0.03) 21%, transparent 22%),
    radial-gradient(circle at 50% 50%, transparent 35%, rgba(236, 72, 153, 0.02) 36%, transparent 37%);
  border-radius: 50%;
  animation: magicCircle 30s linear infinite;
  pointer-events: none;
}

@keyframes magicCircle {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 星星装饰 */
.hero-stars {
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  gap: 10px;
  font-size: 1.2rem;
  color: #a78bfa;
  animation: starTwinkle 3s ease-in-out infinite;
}

@keyframes starTwinkle {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.hero-stars span:nth-child(2) { animation-delay: 0.5s; }
.hero-stars span:nth-child(3) { animation-delay: 1s; }

/* 头像 */
.hero-avatar {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 35px;
}

.avatar-ring {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 50%;
  animation: ringRotate 10s linear infinite;
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, 
    rgba(139, 92, 246, 0.4), 
    rgba(236, 72, 153, 0.3)
  );
  border-radius: 50%;
  filter: blur(20px);
  animation: avatarGlow 4s ease-in-out infinite;
}

@keyframes avatarGlow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.1); }
}

.avatar-core {
  position: relative;
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 70px;
  box-shadow: 
    0 15px 40px rgba(139, 92, 246, 0.4),
    0 0 80px rgba(236, 72, 153, 0.2),
    inset 0 0 30px rgba(255, 255, 255, 0.1);
}

@keyframes avatarFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 标题 */
.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fff, #c4b5fd, #f0abfc, #fff);
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleShine 5s linear infinite;
  letter-spacing: 3px;
}

@keyframes titleShine {
  to { background-position: 300% center; }
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #a78bfa;
  margin-bottom: 20px;
  letter-spacing: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.hero-subtitle::before,
.hero-subtitle::after {
  content: '✦';
  font-size: 0.9rem;
  opacity: 0.6;
}

.hero-desc {
  font-size: 1.05rem;
  color: #94a3b8;
  line-height: 1.8;
  max-width: 650px;
  margin: 0 auto 45px;
}

/* 语录卡片 */
.quote-card {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 28px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  position: relative;
}

.quote-card::before {
  content: '"';
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 3rem;
  color: rgba(139, 92, 246, 0.2);
  font-family: Georgia, serif;
}

.quote-text {
  font-size: 0.95rem;
  color: #cbd5e1;
  line-height: 1.8;
  font-style: italic;
  padding-left: 30px;
}

.quote-source {
  font-size: 0.85rem;
  color: #a78bfa;
  text-align: right;
  margin-top: 10px;
}

.quote-context {
  font-size: 0.75rem;
  color: #64748b;
  font-style: normal;
  opacity: 0.8;
}

/* ========== 统计面板 - 魔法成就 ========== */
.stats-section {
  margin-bottom: 60px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  padding: 18px 24px;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.1), 
    rgba(236, 72, 153, 0.06)
  );
  border-radius: 20px;
  border-left: 4px solid #8b5cf6;
  position: relative;
  overflow: hidden;
}

.section-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #8b5cf6, #ec4899, transparent);
}

.section-icon {
  font-size: 1.6rem;
  animation: iconBounce 2s ease-in-out infinite;
}

@keyframes iconBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  flex: 1;
}

.section-badge {
  padding: 5px 14px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: #fff;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 32px 26px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

/* 顶部渐变光条 */
.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    var(--stat-color, #8b5cf6), 
    transparent
  );
  opacity: 0.6;
}

.stat-card:hover {
  transform: translateY(-8px);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 
    0 16px 40px rgba(139, 92, 246, 0.2),
    0 0 60px rgba(236, 72, 153, 0.1);
}

.stat-icon {
  font-size: 2.8rem;
  margin-bottom: 16px;
  display: block;
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.stat-number {
  font-size: 2.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #fff, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 0.95rem;
  color: #a78bfa;
  letter-spacing: 1px;
}

/* ========== 功能卡片 - 魔法传送门 ========== */
.features-section {
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 32px;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
  overflow: hidden;
}

/* 魔法光晕 */
.feature-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--card-color, rgba(139, 92, 246, 0.1)) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.feature-card:hover::after {
  opacity: 1;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: rgba(139, 92, 246, 0.25);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.3),
    0 0 80px var(--card-glow, rgba(139, 92, 246, 0.15));
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.feature-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 14px;
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
  letter-spacing: 1px;
}

.feature-tag.new {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: #fff;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.feature-icon {
  font-size: 3rem;
  transition: transform 0.4s ease;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
}

.feature-card:hover .feature-icon {
  transform: scale(1.15) rotate(5deg);
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #fff;
  font-weight: 600;
}

.feature-desc {
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 24px;
}

.feature-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.feature-action {
  font-size: 0.9rem;
  color: #a78bfa;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.feature-action::before {
  content: '✦';
  font-size: 0.8rem;
}

.feature-arrow {
  font-size: 1.3rem;
  color: #a78bfa;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-arrow {
  transform: translateX(8px);
  color: #ec4899;
}

/* ========== 响应式设计 ========== */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 40px 20px;
  }
  
  .hero-section {
    padding: 50px 20px 45px;
    margin-bottom: 60px;
  }
  
  .hero-avatar {
    width: 110px;
    height: 110px;
    margin-bottom: 28px;
  }
  
  .avatar-core {
    width: 110px;
    height: 110px;
    font-size: 55px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .quote-card {
    padding: 18px 22px;
  }
  
  .quote-text {
    font-size: 0.9rem;
    padding-left: 25px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  
  .stat-card {
    padding: 24px 20px;
  }
  
  .stat-number {
    font-size: 2.3rem;
  }
  
  .feature-card {
    padding: 26px;
  }
  
  .feature-title {
    font-size: 1.3rem;
  }
  
  .today-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    padding: 14px 18px;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stars {
    display: none;
  }
  
  .hero-section::before {
    width: 400px;
    height: 400px;
  }
}
`;

  // 功能卡片 HTML
  const featuresHtml = featureList.map((f, index) => `
    <a href="${f.href}" 
       class="feature-card" 
       >
      <div class="feature-header">
        <span class="feature-tag${f.tagNew ? ' new' : ''}">${f.tag}</span>
        <span class="feature-icon">${f.icon}</span>
      </div>
      <h2 class="feature-title">${f.title}</h2>
      <p class="feature-desc">${f.desc}</p>
      <div class="feature-footer">
        <span class="feature-action">开始探索</span>
        <span class="feature-arrow">→</span>
      </div>
    </a>
  `).join('');

  // 统计卡片 HTML
  const statsHtml = `
    <div class="stat-card" style="--stat-color: #8b5cf6">
      <span class="stat-icon">✨</span>
      <div class="stat-number" data-count="${statsData.totalPosts}">0</div>
      <div class="stat-label">魔法记录</div>
    </div>
    <div class="stat-card" style="--stat-color: #ec4899">
      <span class="stat-icon">🌌</span>
      <div class="stat-number" data-count="${statsData.totalCategories}">0</div>
      <div class="stat-label">探索领域</div>
    </div>
    <div class="stat-card" style="--stat-color: #06b6d4">
      <span class="stat-icon">📅</span>
      <div class="stat-number" data-count="${statsData.totalDays}">0</div>
      <div class="stat-label">魔法旅程</div>
    </div>
    <div class="stat-card" style="--stat-color: #f59e0b">
      <span class="stat-icon">⭐</span>
      <div class="stat-number" data-count="${statsData.satisfaction}">0</div>
      <div class="stat-label">满意度</div>
    </div>
  `;

  // 内容 HTML
  const content = `
<div class="home-container">
  <!-- 英雄区域 -->
  <section class="hero-section">
    <div class="hero-stars">
      <span>✦</span>
      <span>✦</span>
      <span>✦</span>
    </div>
    
    <div class="hero-avatar">
      <div class="avatar-ring"></div>
      <div class="avatar-glow"></div>
      <div class="avatar-core">
        <img src="./assets/avatar.webp" alt="Avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
        <span style="display: none; font-size: 3.5rem;">🎭</span>
      </div>
    </div>
    
    <h1 class="hero-title">${siteName}</h1>
    <p class="hero-subtitle">魔法使的旅程</p>
    <p class="hero-desc">
      让每一刻都化作永恒的记忆，如同魔法般珍藏
    </p>
    
    <div class="quote-card">
      <p class="quote-text">${todayQuote.text}</p>
      <p class="quote-source">—— ${todayQuote.source} ${todayQuote.context ? `<span class="quote-context">· ${todayQuote.context}</span>` : ''}</p>
    </div>
  </section>
  
  <!-- 统计面板 -->
  <section class="stats-section">
    <div class="section-header">
      <span class="section-icon">📊</span>
      <h2 class="section-title">魔法成就</h2>
      <span class="section-badge">实时更新</span>
    </div>
    <div class="stats-grid">
      ${statsHtml}
    </div>
  </section>
  
  <!-- 功能卡片区 -->
  <section class="features-section">
    <div class="section-header">
      <span class="section-icon">🌌</span>
      <h2 class="section-title">探索魔法领域</h2>
      <span class="section-badge">${featureList.length} 个传送门</span>
    </div>
    <div class="features-grid">
      ${featuresHtml}
    </div>
  </section>
  
</div>

<!-- 粒子背景 -->
<div id="particles-container"></div>

<script>
  // 粒子效果 - 魔法星辰版
  (function() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = 40;
    
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes particleFloat {
        0% {
          transform: translateY(100vh) translateX(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.7;
        }
        90% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(-10vh) translateX(\${Math.random() * 80 - 40}px) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes particleTwinkle {
        0%, 100% {
          opacity: 0.4;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.4);
        }
      }
    \`;
    document.head.appendChild(style);
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 2;
      const isRound = Math.random() > 0.2;
      
      const colors = [
        'rgba(139, 92, 246, 0.7)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(96, 165, 250, 0.5)',
        'rgba(167, 139, 250, 0.6)',
        'rgba(244, 114, 182, 0.5)',
        'rgba(6, 182, 212, 0.4)'
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.cssText = \`
        position: absolute;
        width: \${size}px;
        height: \${size}px;
        background: \${color};
        border-radius: \${isRound ? '50%' : '2px'};
        left: \${Math.random() * 100}%;
        top: \${Math.random() * 100}%;
        opacity: 0;
        animation: 
          particleFloat \${Math.random() * 18 + 22}s linear infinite,
          particleTwinkle \${Math.random() * 2.5 + 2}s ease-in-out infinite;
        animation-delay: \${Math.random() * 22}s, \${Math.random() * 2.5}s;
        pointer-events: none;
        box-shadow: 0 0 \${size * 3}px \${color};
      \`;
      
      container.appendChild(particle);
    }
  })();
  
  // 数字增长动画
  function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number[data-count]');
    numbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-count'));
      const duration = 2500;
      const startTime = performance.now();
      const label = num.nextElementSibling?.textContent || '';
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOut);
        
        if (label.includes('满意度')) {
          num.textContent = current + '%';
        } else {
          num.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      
      requestAnimationFrame(update);
    });
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
</script>
`;

  return generatePage({
    title: siteName,
    content,
    nav: false,
    footer: true,
    currentPage: '/',
    extraCss: homepageStyles
  });
}

module.exports = {
  generateHomepage
};
