/**
 * Frieren 构建配置
 * 统一管理路径、全局配置和工具函数
 */

const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = process.env.SITE_URL || 'https://vivirainbow.github.io/frieren';

// 路径配置
const PATHS = {
  root: ROOT,
  shared: path.join(ROOT, 'shared'),
  assets: path.join(ROOT, 'assets'),
  newsRender: path.join(ROOT, 'news-render'),
  folianAccounting: path.join(ROOT, 'frieren-accounting'),
  lifeWarehouse: path.join(ROOT, 'life-warehouse'),
  lifeCloset: path.join(ROOT, 'life-closet'),
  dinnerPicker: path.join(ROOT, 'dinner-picker'),
  publishPages: path.join(ROOT, 'publish-pages'),
  // 输出路径
  cateSrc: path.join(ROOT, 'news-render/out/cate'),
  cateDest: path.join(ROOT, 'publish-pages/cate'),
  accountingSrc: path.join(ROOT, 'frieren-accounting/accounting.html'),
  accountingDest: path.join(ROOT, 'publish-pages/accounting.html'),
  warehouseSrc: path.join(ROOT, 'life-warehouse/life-warehouse.html'),
  warehouseDest: path.join(ROOT, 'publish-pages/life-warehouse.html'),
  closetSrc: path.join(ROOT, 'life-closet/closet.html'),
  closetDest: path.join(ROOT, 'publish-pages/closet.html'),
  dinnerPickerSrc: path.join(ROOT, 'dinner-picker/dinner-picker.html'),
  dinnerPickerDest: path.join(ROOT, 'publish-pages/dinner-picker.html'),
};

// 全局配置
const CONFIG = {
  siteName: 'Frieren',
  siteUrl: SITE_URL,
  version: new Date().toISOString().slice(0, 10),
  theme: {
    primary: '#9B7EBD',
    primaryLight: '#B794F6',
    primaryDark: '#7c5ce0',
    accent: '#e056fd',
    accentCyan: '#00d9ff'
  }
};

/**
 * 递归复制目录
 */
function copyDir(src, dest) {
  const fs = require('fs');
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * 复制共享资源到目标目录
 */
function copySharedResources(destDir = PATHS.publishPages) {
  const fs = require('fs');
  
  // 复制共享样式
  if (fs.existsSync(PATHS.shared)) {
    const sharedDest = path.join(destDir, 'shared');
    copyDir(PATHS.shared, sharedDest);
  }
  
  // 复制资源文件夹
  if (fs.existsSync(PATHS.assets)) {
    const assetsDest = path.join(destDir, 'assets');
    copyDir(PATHS.assets, assetsDest);
  }
}

module.exports = {
  ROOT,
  SITE_URL,
  PATHS,
  CONFIG,
  copyDir,
  copySharedResources
};
