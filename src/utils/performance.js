// 防抖函数
export function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// 节流函数
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 预加载图片
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// 批量预加载图片
export async function preloadImages(srcs, maxConcurrent = 3) {
  const results = [];
  for (let i = 0; i < srcs.length; i += maxConcurrent) {
    const batch = srcs.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(src => 
      preloadImage(src).catch(() => null) // 忽略失败的图片
    );
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }
  return results.filter(Boolean);
}

// 虚拟滚动辅助函数
export function calculateVisibleItems(containerHeight, itemHeight, scrollTop, buffer = 5) {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + buffer * 2;
  const endIndex = startIndex + visibleCount;
  
  return { startIndex, endIndex, visibleCount };
}

// 内存清理
export function cleanupResources() {
  // 清理过期的localStorage数据
  const keys = Object.keys(localStorage);
  const expiredKeys = keys.filter(key => {
    if (key.startsWith('netflix_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data.timestamp && Date.now() - data.timestamp > 7 * 24 * 60 * 60 * 1000) {
          return true; // 7天过期
        }
      } catch (e) {
        return true; // 无效数据
      }
    }
    return false;
  });
  
  expiredKeys.forEach(key => localStorage.removeItem(key));
}

// 性能监控
export function measurePerformance(name, fn) {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  };
}
