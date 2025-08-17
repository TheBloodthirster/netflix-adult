import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { useContent, useUser } from '../hooks/useDatabase';

function Analytics() {
  const { user } = useUser();
  const { content: allContent, loading } = useContent();
  const [analyticsData, setAnalyticsData] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('views');

  useEffect(() => {
    if (allContent.length > 0) {
      generateAnalyticsData();
    }
  }, [allContent, selectedPeriod]);

  const generateAnalyticsData = () => {
    const baseViews = Math.floor(Math.random() * 500000) + 100000;
    const baseSubscribers = Math.floor(Math.random() * 10000) + 2000;
    
    const data = {
      overview: {
        totalViews: baseViews,
        totalSubscribers: baseSubscribers,
        totalWatchTime: Math.floor(baseViews * 0.6),
        avgViewDuration: Math.floor(Math.random() * 300) + 180,
        engagement: (Math.random() * 15 + 5).toFixed(1),
        revenue: Math.floor(baseViews * 0.001 * Math.random() * 5)
      },
      trends: {
        views: generateTrendData(baseViews),
        subscribers: generateTrendData(baseSubscribers, 0.1),
        watchTime: generateTrendData(Math.floor(baseViews * 0.6)),
        engagement: generateTrendData(8, 0.2, true)
      },
      topContent: allContent
        .map(item => ({
          ...item,
          views: Math.floor(Math.random() * 50000) + 5000,
          likes: Math.floor(Math.random() * 2000) + 100,
          comments: Math.floor(Math.random() * 500) + 20,
          shares: Math.floor(Math.random() * 200) + 10
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10),
      demographics: {
        ageGroups: [
          { range: '18-24', percentage: 25 },
          { range: '25-34', percentage: 35 },
          { range: '35-44', percentage: 20 },
          { range: '45-54', percentage: 15 },
          { range: '55+', percentage: 5 }
        ],
        countries: [
          { name: '中国', percentage: 45 },
          { name: '美国', percentage: 20 },
          { name: '日本', percentage: 15 },
          { name: '韩国', percentage: 10 },
          { name: '其他', percentage: 10 }
        ],
        devices: [
          { type: '移动设备', percentage: 60 },
          { type: '桌面端', percentage: 25 },
          { type: '平板', percentage: 10 },
          { type: '智能电视', percentage: 5 }
        ]
      }
    };

    setAnalyticsData(data);
  };

  const generateTrendData = (base, variance = 0.3, isPercentage = false) => {
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      let value = base * (1 + (Math.random() - 0.5) * variance);
      if (isPercentage) {
        value = Math.max(0, Math.min(100, value));
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.floor(value)
      });
    }
    
    return data;
  };

  const periods = [
    { id: '7d', name: '7天' },
    { id: '30d', name: '30天' },
    { id: '90d', name: '90天' }
  ];

  const metrics = [
    { id: 'views', name: '观看量', icon: '👁️', color: 'text-blue-400' },
    { id: 'subscribers', name: '订阅者', icon: '👥', color: 'text-green-400' },
    { id: 'watchTime', name: '观看时长', icon: '⏱️', color: 'text-purple-400' },
    { id: 'engagement', name: '互动率', icon: '❤️', color: 'text-red-400' }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="large" text="正在加载分析数据..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📊 数据分析
          </h1>
          <p className="text-gray-300 text-lg">
            深入了解你的内容表现和观众行为
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {periods.map(period => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedPeriod === period.id
                  ? 'bg-netflix-red text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {analyticsData.overview && Object.entries({
            totalViews: { label: '总观看量', icon: '👁️', color: 'blue' },
            totalSubscribers: { label: '总订阅者', icon: '👥', color: 'green' },
            totalWatchTime: { label: '总观看时长', icon: '⏱️', color: 'purple', format: 'duration' },
            revenue: { label: '总收益', icon: '💰', color: 'yellow', format: 'currency' }
          }).map(([key, config]) => (
            <div key={key} className={`bg-gradient-to-r from-${config.color}-500/20 to-${config.color}-600/20 rounded-lg p-6`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold text-sm">{config.label}</h3>
                <span className="text-2xl">{config.icon}</span>
              </div>
              <div className={`text-2xl font-bold text-${config.color}-400`}>
                {config.format === 'duration' 
                  ? formatDuration(analyticsData.overview[key])
                  : config.format === 'currency'
                  ? `¥${analyticsData.overview[key]?.toLocaleString()}`
                  : formatNumber(analyticsData.overview[key])
                }
              </div>
              <div className="text-gray-400 text-xs">
                +{Math.floor(Math.random() * 20 + 5)}% 较上期
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">趋势图表</h3>
              <div className="flex space-x-2">
                {metrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all ${
                      selectedMetric === metric.id
                        ? 'bg-netflix-red text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <span>{metric.icon}</span>
                    <span>{metric.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-64 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <div className="text-gray-400">
                  {metrics.find(m => m.id === selectedMetric)?.name} 趋势图
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {selectedPeriod === '7d' ? '过去7天' : selectedPeriod === '30d' ? '过去30天' : '过去90天'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">热门内容</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analyticsData.topContent?.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-3">
                  <div className="text-netflix-red font-bold text-lg w-6">
                    #{index + 1}
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold truncate">{item.title}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>👁️ {formatNumber(item.views)}</span>
                      <span>❤️ {formatNumber(item.likes)}</span>
                      <span>💬 {item.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">年龄分布</h3>
            <div className="space-y-3">
              {analyticsData.demographics?.ageGroups.map(group => (
                <div key={group.range} className="flex items-center justify-between">
                  <span className="text-gray-300">{group.range}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-netflix-red h-2 rounded-full"
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8">{group.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">地区分布</h3>
            <div className="space-y-3">
              {analyticsData.demographics?.countries.map(country => (
                <div key={country.name} className="flex items-center justify-between">
                  <span className="text-gray-300">{country.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">设备分布</h3>
            <div className="space-y-3">
              {analyticsData.demographics?.devices.map(device => (
                <div key={device.type} className="flex items-center justify-between">
                  <span className="text-gray-300">{device.type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">详细内容表现</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-gray-300 font-semibold py-3">内容</th>
                  <th className="text-gray-300 font-semibold py-3">观看量</th>
                  <th className="text-gray-300 font-semibold py-3">点赞</th>
                  <th className="text-gray-300 font-semibold py-3">评论</th>
                  <th className="text-gray-300 font-semibold py-3">分享</th>
                  <th className="text-gray-300 font-semibold py-3">评分</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topContent?.slice(0, 8).map(item => (
                  <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div>
                          <div className="text-white font-semibold">{item.title}</div>
                          <div className="text-gray-400 text-sm">{item.type} • {item.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-white py-3">{formatNumber(item.views)}</td>
                    <td className="text-white py-3">{formatNumber(item.likes)}</td>
                    <td className="text-white py-3">{item.comments}</td>
                    <td className="text-white py-3">{item.shares}</td>
                    <td className="text-white py-3">⭐ {item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Analytics;
