import React from 'react';

function LoadingSpinner({ size = 'medium', text = '加载中...' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} border-4 border-gray-600 border-t-netflix-red rounded-full animate-spin`}></div>
      {text && <div className="text-gray-400 text-sm">{text}</div>}
    </div>
  );
}

export default LoadingSpinner;
