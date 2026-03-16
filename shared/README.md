# Frieren 共享设计系统

viviClaw 的统一设计语言与组件库。所有模块通过 `shared/template.js` 的 `generatePage()` 自动引入本系统的 CSS。

---

## 目录

- [设计 Token](#设计-token)
- [模块主题色接入](#模块主题色接入)
- [CSS 组件](#css-组件)
  - [统计卡片网格 `.stats-grid`](#统计卡片网格)
  - [筛选标签栏 `.filter-tabs`](#筛选标签栏)
  - [紧凑筛选按钮组 `.filter-group`](#紧凑筛选按钮组)
  - [搜索框 `.search-box`](#搜索框)
  - [图表网格 `.charts-grid`](#图表网格)
  - [模块页头 `.module-header`](#模块页头)
  - [内容面板 `.module-section`](#内容面板)
  - [通用列表项 `.list-item`](#通用列表项)
  - [空状态 `.empty-state`](#空状态)
  - [基础卡片 `.frieren-card`](#基础卡片)
  - [按钮 `.frieren-btn`](#按钮)
  - [标签 `.frieren-tag`](#标签)
- [动效系统](#动效系统)
- [ECharts 图表主题](#echarts-图表主题)
- [新模块接入完整步骤](#新模块接入完整步骤)

---

## 设计 Token

所有 CSS 变量定义在 `shared/styles.css` 的 `:root` 中：

```css
/* 主题色 */
--primary: #9B7EBD        /* 紫色主色 */
--primary-light: #B794F6
--primary-dark: #7c5ce0
--accent: #e056fd          /* 品红强调色 */
--accent-cyan: #00d9ff     /* 青色强调色 */

/* 背景 */
--bg-dark: #0a0a0f
--bg-card: #1a1a24
--bg-card-hover: #2a2a3a

/* 文字 */
--text-primary: #fff
--text-secondary: #aaa
--text-muted: #666

/* 边框 */
--border-color: #2a2a3a
--border-glow: rgba(155, 126, 189, 0.3)

/* 圆角 */
--radius-sm: 8px   --radius-md: 12px
--radius-lg: 16px  --radius-xl: 20px

/* 字体 */
--font-family: 'Outfit', -apple-system, 'Noto Sans SC', sans-serif
```

---

## 模块主题色接入

每个模块通过在 `build.js` 的 `extraCss` 开头设置 CSS 变量来定制主题色。所有共享组件（stat-card、filter-tab、chart-card 等）会自动应用模块主题色。

```js
// life-xxx/build.js
const moduleCss = `
:root {
  --module-accent: #00d9ff;        /* 主色（十六进制） */
  --module-accent-rgb: 0, 217, 255; /* 主色 RGB 分量，用于 rgba() */
  --module-accent-2: #8b5cf6;      /* 副色（渐变终点） */
  --module-accent-2-rgb: 139, 92, 246;
}
/* ... 模块专属样式 ... */
`;
```

**已有模块的主题色：**

| 模块       | 主色           | 副色      |
|-----------|---------------|-----------|
| 仓库 📦    | `#00d9ff` 青色 | `#8b5cf6` |
| 衣橱 👔    | `#FF6B9D` 粉色 | `#8b5cf6` |
| 账簿 💰    | `#8b5cf6` 紫色 | `#ec4899` |
| 默认（未设置）| `#00d9ff` 青色 | `#7c5ce0` |

---

## CSS 组件

### 统计卡片网格

用于展示关键数字指标。

```html
<div class="stats-grid">
  <!-- 跨 2 列的主统计 -->
  <div class="stat-card total">
    <span class="stat-icon">💰</span>
    <div class="stat-label">总计</div>
    <div class="stat-value">¥12,345</div>
    <div class="stat-change up">↑ 12.3% 环比</div>
    <div class="stat-meta">共 88 笔</div>
  </div>
  <!-- 普通统计卡 -->
  <div class="stat-card">
    <span class="stat-icon">📅</span>
    <div class="stat-label">日均</div>
    <div class="stat-value">¥68</div>
  </div>
</div>
```

- `.stat-card.total` — 宽度跨 2 列，主统计突出展示
- `.stat-change.up` / `.stat-change.down` — 红/绿涨跌标记

---

### 筛选标签栏

水平排列的单选标签，适合切换"全部/类别A/类别B"等场景。

```html
<div class="filter-bar">
  <div class="filter-tabs" id="my-tabs">
    <button class="filter-tab active" data-cat="all">全部</button>
    <button class="filter-tab" data-cat="food">食品</button>
    <button class="filter-tab" data-cat="tech">数码</button>
  </div>
  <!-- 右侧可放搜索框 -->
  <div class="search-box">...</div>
</div>
```

JS 激活逻辑（模板）：
```js
document.querySelectorAll('.filter-tab').forEach(function(btn) {
  btn.onclick = function() {
    document.querySelectorAll('.filter-tab').forEach(function(b) {
      b.classList.remove('active');
    });
    this.classList.add('active');
    // 执行筛选逻辑...
  };
});
```

---

### 紧凑筛选按钮组

多维度筛选场景（如按季节 + 场合同时筛选），按钮尺寸更小。

```html
<div class="filter-bar">
  <div class="filter-section">
    <span class="filter-label">季节:</span>
    <div class="filter-group" id="season-filter">
      <button class="filter-btn active" data-val="all">全部</button>
      <button class="filter-btn" data-val="spring">春</button>
    </div>
  </div>
</div>
```

> `.filter-section` 和 `.filter-label` 是布局辅助类，需在模块 `extraCss` 中定义（参考 life-closet/build.js）。

---

### 搜索框

```html
<div class="search-box">
  <span>🔍</span>
  <input type="text" id="search" placeholder="搜索...">
</div>
```

---

### 图表网格

包含 ECharts 容器的两列网格布局。

```html
<div class="charts-grid">
  <div class="chart-card">
    <h3>📈 数据趋势</h3>
    <div id="trend-chart" class="chart-container"></div>
  </div>
  <div class="chart-card">
    <h3>🥧 分类占比</h3>
    <div id="pie-chart" class="chart-container"></div>
  </div>
</div>
```

- `.chart-container` 默认高度 `280px`，如需调整在模块 `extraCss` 中 override。
- `h3::before` 自动插入 `✦` 装饰，颜色跟随 `--module-accent`。

---

### 模块页头

带渐变顶线的页面标题区，推荐新模块直接使用此类名。

```html
<div class="module-header">
  <div class="module-title">
    <span class="sparkle">🌟</span>
    <h1>我的模块</h1>
  </div>
  <!-- 可选：右侧放操作按钮或统计徽章 -->
  <div class="module-header-actions">...</div>
</div>
```

> 已有模块（仓库/衣橱/账簿）使用各自的 `.warehouse-header` 等专属类名，这些类在模块 `extraCss` 中实现了相同视觉效果。**新模块推荐直接使用 `.module-header`。**

---

### 内容面板

带顶部渐变线的卡片容器，适合包裹列表或详情区。

```html
<div class="module-section">
  <h3>📋 内容列表</h3>
  <div class="section-scroll">
    <!-- 可滚动内容，最大高度 400px -->
    <div class="list-item">...</div>
  </div>
</div>
```

---

### 通用列表项

水平排列的列表条目，含 hover 位移效果。

```html
<div class="list-item">
  <span class="list-item-icon">📦</span>
  <div class="list-item-body">
    <div class="list-item-title">物品名称</div>
    <div class="list-item-meta">
      <span>📍 位置</span>
      <span>🏷️ 分类</span>
    </div>
  </div>
  <div class="list-item-value">¥299</div>
</div>
```

`.list-item-value` 使用模块主题色渐变文字。

---

### 空状态

列表为空时的占位提示。

```html
<div class="empty-state">
  <div class="empty-icon">📭</div>
  <div>暂无记录</div>
</div>
```

---

### 基础卡片

通用卡片，含 hover 上浮效果，适合展示内容块。

```html
<div class="frieren-card" style="padding: 20px;">
  <!-- 卡片内容 -->
</div>
```

---

### 按钮

```html
<!-- 主要按钮（紫色渐变） -->
<button class="frieren-btn frieren-btn-primary">
  ✨ 操作
</button>

<!-- 次要按钮（透明边框） -->
<button class="frieren-btn frieren-btn-secondary">
  取消
</button>
```

---

### 标签

```html
<!-- 默认紫色标签 -->
<span class="frieren-tag">分类名</span>

<!-- 绿色新增标签 -->
<span class="frieren-tag frieren-tag-new">新增</span>
```

---

## 动效系统

由 `shared/effects.js` 提供，通过 `generateTail()` 自动注入，无需手动引用。

| 效果 | 实现 | 说明 |
|------|------|------|
| 粒子背景 | `<canvas id="frieren-particles">` | 50 个紫色粒子，自动连线 |
| 滚动进度条 | `<div id="frieren-scroll-progress">` | 顶部青紫渐变进度条 |
| `twinkle` 动画 | `@keyframes twinkle` | 闪烁缩放，用于装饰图标 |

使用 `twinkle` 动画：
```html
<span class="sparkle" style="animation: twinkle 2s ease-in-out infinite;">✨</span>
```
或直接用 `.module-title .sparkle`（已自带动画）。

---

## ECharts 图表主题

`shared/echarts-config.js` 提供图表配置工厂函数，在 `build.js` 中引入后，可生成注入到 HTML 中的 JS 代码，确保图表风格与模块主题色一致。

### 在 build.js 中使用

```js
const { getEChartsScriptTags } = require('../shared/echarts-config');

// 在 generatePage() 之后，将脚本插入 </body> 前
const echartsScript = getEChartsScriptTags('#00d9ff', '#8b5cf6');
const finalHtml = html.replace('</body>', echartsScript + '</body>');
```

### 在注入的 HTML 脚本中使用 FRIEREN_CHART

```html
<script>
// FRIEREN_CHART 已由 getEChartsScriptTags 注入，包含：
// .accent / .accent2 / .tooltip() / .axis() /
// .lineOption(labels, values) / .pieOption(data) / .barOption(labels, values)

var chart = echarts.init(document.getElementById('my-chart'));

// 折线图
chart.setOption(FRIEREN_CHART.lineOption(
  ['一月', '二月', '三月'],
  [120, 340, 210]
));

// 环形饼图
chart.setOption(FRIEREN_CHART.pieOption([
  { name: '食品', value: 300, itemStyle: { color: '#FF6B6B' } },
  { name: '数码', value: 1200, itemStyle: { color: '#00d9ff' } }
]));

// 柱状图
chart.setOption(FRIEREN_CHART.barOption(
  ['周一', '周二', '周三'],
  [45, 82, 63]
));
</script>
```

### API 参考

| 方法 | 参数 | 说明 |
|------|------|------|
| `getEChartsThemeScript(accent, accent2)` | 两个十六进制颜色 | 返回 JS 代码字符串（含 `FRIEREN_CHART` 对象定义） |
| `getEChartsScriptTags(accent, accent2, version?)` | 颜色 + 可选版本 | 返回完整 `<script>` 标签字符串（含 CDN 引入 + 主题） |

---

## 新模块接入完整步骤

以新建「待办事项 📝」模块为例：

### 1. 创建目录结构

```
life-todo/
├── todo.fragment.html   # 业务 HTML 片段
└── build.js             # 构建脚本
```

### 2. 编写 `build.js`

```js
'use strict';
const fs = require('fs');
const path = require('path');
const { generatePage } = require('../shared/template');
// 如需图表，引入：
// const { getEChartsScriptTags } = require('../shared/echarts-config');

// 模块专属 CSS：只写 shared/styles.css 没有覆盖的部分
const todoCss = `
:root {
  --module-accent: #34d399;          /* 绿色主题 */
  --module-accent-rgb: 52, 211, 153;
  --module-accent-2: #06b6d4;
  --module-accent-2-rgb: 6, 182, 212;
}

/* 模块独有布局，复用 .module-header / .module-section / .list-item 等共享类 */
.todo-priority-high { color: #f87171; }
.todo-priority-low  { color: #4ade80; }
`;

const fragment = fs.readFileSync(path.join(__dirname, 'todo.fragment.html'), 'utf-8');

const html = generatePage({
  title: '待办事项',
  content: fragment,
  nav: true,
  header: '',
  footer: true,
  currentPage: '/todo.html',
  extraCss: todoCss
});

fs.writeFileSync(path.join(__dirname, 'todo.html'), html);
console.log('Generated: life-todo/todo.html');
```

### 3. 编写 `todo.fragment.html`

使用共享类名，无需重写样式：

```html
<!-- 使用共享 .module-header -->
<div class="module-header">
  <div class="module-title">
    <span class="sparkle">📝</span>
    <h1>待办事项</h1>
  </div>
</div>

<!-- 使用共享 .stats-grid -->
<div class="stats-grid">
  <div class="stat-card total">
    <span class="stat-icon">📋</span>
    <div class="stat-label">总任务</div>
    <div class="stat-value" id="total-count">0</div>
  </div>
  <div class="stat-card">
    <span class="stat-icon">✅</span>
    <div class="stat-label">已完成</div>
    <div class="stat-value" id="done-count">0</div>
  </div>
</div>

<!-- 使用共享 .filter-bar + .filter-tabs -->
<div class="filter-bar">
  <div class="filter-tabs">
    <button class="filter-tab active" data-status="all">全部</button>
    <button class="filter-tab" data-status="todo">待办</button>
    <button class="filter-tab" data-status="done">已完成</button>
  </div>
  <div class="search-box">
    <span>🔍</span>
    <input type="text" placeholder="搜索任务...">
  </div>
</div>

<!-- 使用共享 .module-section + .list-item -->
<div class="module-section">
  <h3>📋 任务列表</h3>
  <div class="section-scroll" id="todo-list">
    <div class="list-item">
      <span class="list-item-icon">⬜</span>
      <div class="list-item-body">
        <div class="list-item-title">完成项目文档</div>
        <div class="list-item-meta">
          <span>📅 2026-03-15</span>
          <span class="todo-priority-high">🔴 高优先级</span>
        </div>
      </div>
    </div>
    <!-- 空状态（使用共享 .empty-state） -->
    <div class="empty-state" id="empty-msg" style="display:none;">
      <div class="empty-icon">📭</div>
      <div>暂无任务</div>
    </div>
  </div>
</div>

<script>
// 业务逻辑...
</script>
```

### 4. 注册到构建系统

**`shared/build-config.js`** — 添加路径常量：
```js
const PATHS = {
  // ...
  lifeTodo:     path.join(ROOT, 'life-todo'),
  lifeTodoSrc:  path.join(ROOT, 'life-todo/todo.html'),
  lifeTodoDest: path.join(ROOT, 'publish-pages/todo.html'),
};
```

**`shared/template.js`** — 添加导航链接：
```js
const navLinks = [
  // ...
  { name: '待办', url: '/todo.html', icon: '📝' },
];
```

**`scripts/build.js`** — 添加构建步骤：
```js
execSync('node build.js', { cwd: PATHS.lifeTodo, stdio: 'inherit' });
fs.copyFileSync(PATHS.lifeTodoSrc, PATHS.lifeTodoDest);
```

**`scripts/build.js`** — 添加首页卡片：
```js
features: [
  // ...
  {
    icon: '📝',
    title: '待办事项',
    desc: '任务追踪，专注当下',
    link: `${BASE_URL}/todo.html`,
    color: '#34d399'
  }
]
```

---

## 文件概览

```
shared/
├── styles.css        # 全局样式 + 共享组件（本文档的 CSS 部分）
├── effects.js        # 粒子系统 + 滚动进度条
├── echarts-config.js # ECharts 图表主题工具（本文档的图表部分）
├── template.js       # HTML 模板引擎（generatePage API）
├── build-config.js   # 路径常量 + SITE_URL
├── homepage.js       # 首页生成器
└── README.md         # 本文档
```
