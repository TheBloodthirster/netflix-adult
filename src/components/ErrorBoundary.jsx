import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-netflix-black flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-6">
              <svg className="w-16 h-16 text-netflix-red mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-white text-2xl font-bold mb-4">出现了一些问题</h2>
            <p className="text-gray-400 mb-6">
              很抱歉，页面加载时遇到了错误。请刷新页面重试。
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-netflix-red text-white py-3 px-6 rounded font-semibold hover:bg-red-700 transition-colors"
              >
                刷新页面
              </button>
              
              <button 
                onClick={() => window.location.href = '#/'}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded font-semibold hover:bg-gray-700 transition-colors"
              >
                返回首页
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-gray-400 cursor-pointer hover:text-white">
                  查看错误详情
                </summary>
                <pre className="mt-2 p-4 bg-gray-800 rounded text-xs text-gray-300 overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
