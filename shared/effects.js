/**
 * Frieren 共享动态效果系统
 * 粒子背景、滚动进度条等效果
 */

// 粒子效果配置
const particleConfig = {
  count: 50,           // 粒子数量（比首页少，优化性能）
  connectionDistance: 120,
  color: '155, 126, 189'  // 紫色
};

/**
 * 生成粒子画布 HTML
 */
function generateParticlesCanvas() {
  return `<canvas id="frieren-particles" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;"></canvas>`;
}

/**
 * 生成滚动进度条
 */
function generateScrollProgress() {
  return `<div id="frieren-scroll-progress" style="position:fixed;top:0;left:0;width:0%;height:3px;background:linear-gradient(90deg,#9B7EBD,#00d9ff);z-index:9999;transition:width 0.1s ease;"></div>`;
}

/**
 * 生成粒子效果和滚动进度条的 JavaScript
 */
function generateDynamicScript(config = {}) {
  const cfg = { ...particleConfig, ...config };
  
  return `<script>
(function() {
  // ========== 滚动进度条 ==========
  const progressBar = document.getElementById('frieren-scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
  
  // ========== 粒子效果 ==========
  var canvas = document.getElementById('frieren-particles');
  if (!canvas) return;
  
  var ctx = canvas.getContext('2d');
  var particles = [];
  var animationId;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createParticles() {
    particles = [];
    for (var i = 0; i < ${cfg.count}; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2
      });
    }
  }
  
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(function(p, i) {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(${cfg.color}, ' + p.opacity + ')';
      ctx.fill();
      
      // 连线
      particles.slice(i + 1).forEach(function(p2) {
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < ${cfg.connectionDistance}) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(${cfg.color}, ' + (1 - distance / ${cfg.connectionDistance}) * 0.15 + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });
    
    animationId = requestAnimationFrame(drawParticles);
  }
  
  // 初始化
  resize();
  createParticles();
  drawParticles();
  
  window.addEventListener('resize', function() {
    resize();
    createParticles();
  });
  
  // 减少动画
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    if (animationId) cancelAnimationFrame(animationId);
  }
})();
</script>`;
}

/**
 * 生成完整的动态效果 HTML（粒子 + 进度条）
 */
function generateDynamicEffects(config = {}) {
  return generateScrollProgress() + generateParticlesCanvas() + generateDynamicScript(config);
}

module.exports = {
  particleConfig,
  generateParticlesCanvas,
  generateScrollProgress,
  generateDynamicScript,
  generateDynamicEffects
};
