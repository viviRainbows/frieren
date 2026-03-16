/**
 * Frieren 共享模板系统
 * 提供统一的 HTML 布局模板，供各子项目使用
 */

const fs = require('fs');
const path = require('path');
const { SITE_URL } = require('./build-config');

const BASE_URL = SITE_URL;

// 读取共享样式文件
const SHARED_STYLES_PATH = path.join(__dirname, 'styles.css');
let sharedStyles = '';
try {
  sharedStyles = fs.readFileSync(SHARED_STYLES_PATH, 'utf-8');
} catch (e) {
  console.warn('⚠️ 无法读取 shared/styles.css');
}

// 引入动态效果
const { generateDynamicEffects, particleConfig } = require('./effects');

// 导航链接配置
const navLinks = [
  { name: '首页', url: '/', icon: '🏠' },
  { name: '书房', url: '/cate', icon: '📚' },
  { name: '账簿', url: '/accounting.html', icon: '💰' },
  { name: '仓库', url: '/life-warehouse.html', icon: '📦' },
  { name: '衣橱', url: '/closet.html', icon: '👔' },
  { name: '今晚吃啥', url: '/dinner-picker.html', icon: '🎲' },
  { name: '美食', url: '/food.html', icon: '🍽️' },
  { name: '修行', url: '/training.html', icon: '🧘' },
];

/**
 * 生成统一的 HTML 头部
 */
function generateHead(title, extraCss = '') {
  // 合并共享样式和额外样式
  const allStyles = sharedStyles + (extraCss ? '\n' + extraCss : '');
  
  // 粒子画布样式
  const particleStyles = `
    #frieren-particles { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
    #frieren-scroll-progress { position: fixed; top: 0; left: 0; width: 0%; height: 3px; background: linear-gradient(90deg, #9B7EBD, #00d9ff); z-index: 9999; transition: width 0.1s ease; }
    .frieren-container { position: relative; z-index: 1; }
  `;
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Frieren</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
  <style>${allStyles}${particleStyles}</style>
</head>
<body>`;
}

/**
 * 生成导航栏
 */
function generateNav(currentPage = '') {
  const links = navLinks.map(link => {
    const isActive = currentPage === link.url || 
      (currentPage === '/' && link.url === '/') ||
      (currentPage.startsWith(link.url) && link.url !== '/');
    return `<a href="${BASE_URL}${link.url}" class="nav-link ${isActive ? 'active' : ''}">${link.icon} ${link.name}</a>`;
  }).join('');

  return `<nav class="frieren-nav">
    <div class="brand">
      <div class="brand-icon">
        <img src="${BASE_URL}/assets/nav.webp" alt="nav" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
      </div>
      <span class="brand-name">Frieren</span>
    </div>
    <div class="nav-links">
      ${links}
    </div>
  </nav>`;
}

/**
 * 生成页面头部
 */
function generateHeader(title, subtitle = '') {
  return `<header class="frieren-header">
    <h1>${title}</h1>
    ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
  </header>`;
}

/**
 * 生成底部
 */
function generateFooter() {
  return `<footer class="frieren-footer">
    <p>魔法是关于想象的艺术</p>
    <p class="made-with">Made with 🪄 🦞 & 🍙</p>
  </footer>`;
}

/**
 * 生成统一的 HTML 尾部
 */
function generateTail() {
  return generateDynamicEffects(particleConfig) + `</body>
</html>`;
}

/**
 * 生成完整页面（简化版）
 */
function generatePage({ title, content, nav = true, header = '', footer = true, currentPage = '', extraCss = '' }) {
  let html = generateHead(title, extraCss);
  
  html += '<div class="frieren-container">';
  
  // 导航
  if (nav) {
    html += generateNav(currentPage);
  }
  
  // 页面头部
  if (header) {
    html += header;
  }
  
  // 内容
  html += content;
  
  // 底部
  if (footer) {
    html += generateFooter();
  }
  
  html += '</div>';
  html += generateTail();
  
  return html;
}

/**
 * URL 工具函数
 */
function makeUrl(relativePath) {
  return BASE_URL + '/' + relativePath.replace(/^\//, '');
}

module.exports = {
  BASE_URL,
  navLinks,
  generateHead,
  generateNav,
  generateHeader,
  generateFooter,
  generateTail,
  generatePage,
  makeUrl
};
