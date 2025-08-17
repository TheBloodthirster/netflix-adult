import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../hooks/useDatabase';
import { useToast } from '../hooks/useToast';

function Referral() {
  const { user } = useUser();
  const { showToast } = useToast();
  const [referralCode, setReferralCode] = useState('');
  const [referralStats, setReferralStats] = useState({});
  const [referralHistory, setReferralHistory] = useState([]);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    generateReferralData();
  }, []);

  const generateReferralData = () => {
    const code = `NFLX${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setReferralCode(code);

    const stats = {
      totalReferrals: Math.floor(Math.random() * 20) + 5,
      successfulReferrals: Math.floor(Math.random() * 15) + 3,
      pendingReferrals: Math.floor(Math.random() * 5) + 1,
      totalRewards: Math.floor(Math.random() * 500) + 200,
      availableRewards: Math.floor(Math.random() * 100) + 50
    };
    setReferralStats(stats);

    const history = [];
    for (let i = 0; i < stats.totalReferrals; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 90));
      
      history.push({
        id: `ref_${i}`,
        email: `user${i}@example.com`,
        date: date.toISOString().split('T')[0],
        status: Math.random() > 0.3 ? 'completed' : Math.random() > 0.5 ? 'pending' : 'expired',
        reward: Math.random() > 0.5 ? 30 : 15
      });
    }
    setReferralHistory(history.sort((a, b) => new Date(b.date) - new Date(a.date)));

    const rewardsList = [
      {
        id: 'reward_1',
        type: 'subscription',
        title: '1个月免费订阅',
        description: '成功邀请1位朋友获得',
        requirement: 1,
        reward: '1个月免费',
        icon: '🎬',
        claimed: stats.successfulReferrals >= 1
      },
      {
        id: 'reward_2',
        type: 'subscription',
        title: '3个月免费订阅',
        description: '成功邀请3位朋友获得',
        requirement: 3,
        reward: '3个月免费',
        icon: '🏆',
        claimed: stats.successfulReferrals >= 3
      },
      {
        id: 'reward_3',
        type: 'cash',
        title: '现金奖励 ¥50',
        description: '成功邀请5位朋友获得',
        requirement: 5,
        reward: '¥50现金',
        icon: '💰',
        claimed: stats.successfulReferrals >= 5
      },
      {
        id: 'reward_4',
        type: 'subscription',
        title: '6个月免费订阅',
        description: '成功邀请10位朋友获得',
        requirement: 10,
        reward: '6个月免费',
        icon: '👑',
        claimed: stats.successfulReferrals >= 10
      }
    ];
    setRewards(rewardsList);
  };

  const copyReferralLink = () => {
    const link = `https://netflix.com/invite/${referralCode}`;
    navigator.clipboard.writeText(link);
    showToast('邀请链接已复制到剪贴板', 'success');
  };

  const shareToSocial = (platform) => {
    const link = `https://netflix.com/invite/${referralCode}`;
    const text = '我在Netflix发现了很多精彩内容，邀请你一起观看！通过我的邀请链接注册，我们都能获得免费订阅时间！';
    
    let shareUrl = '';
    switch (platform) {
      case 'wechat':
        showToast('请复制链接分享到微信', 'info');
        copyReferralLink();
        break;
      case 'weibo':
        shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(link)}&title=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
        break;
      case 'qq':
        shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(link)}&title=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
        break;
      default:
        copyReferralLink();
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      expired: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    const labels = {
      completed: '已完成',
      pending: '待确认',
      expired: '已过期'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🎯 推荐奖励系统
          </h1>
          <p className="text-gray-300 text-lg">
            邀请朋友加入Netflix，一起享受精彩内容，获得丰厚奖励
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">总邀请数</h3>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {referralStats.totalReferrals}
            </div>
            <div className="text-gray-400 text-sm">累计邀请人数</div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">成功邀请</h3>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {referralStats.successfulReferrals}
            </div>
            <div className="text-gray-400 text-sm">已成功注册</div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">待确认</h3>
              <span className="text-2xl">⏳</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">
              {referralStats.pendingReferrals}
            </div>
            <div className="text-gray-400 text-sm">等待确认</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">总奖励</h3>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              ¥{referralStats.totalRewards}
            </div>
            <div className="text-gray-400 text-sm">累计获得</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">📤 邀请朋友</h2>
            
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">你的专属邀请码</h3>
              <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                <span className="text-netflix-red font-mono text-xl font-bold">{referralCode}</span>
                <button
                  onClick={copyReferralLink}
                  className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  复制链接
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">分享到社交平台</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => shareToSocial('wechat')}
                  className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  <div className="text-2xl mb-1">💬</div>
                  <div className="text-sm">微信</div>
                </button>
                <button
                  onClick={() => shareToSocial('weibo')}
                  className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors text-center"
                >
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-sm">微博</div>
                </button>
                <button
                  onClick={() => shareToSocial('qq')}
                  className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  <div className="text-2xl mb-1">🐧</div>
                  <div className="text-sm">QQ</div>
                </button>
              </div>
            </div>

            <div className="bg-netflix-red/20 rounded-lg p-4 border border-netflix-red/30">
              <h4 className="text-netflix-red font-semibold mb-2">邀请规则</h4>
              <ul className="text-red-300 text-sm space-y-1">
                <li>• 朋友通过你的链接注册并订阅</li>
                <li>• 你和朋友都获得1个月免费订阅</li>
                <li>• 邀请越多，奖励越丰厚</li>
                <li>• 奖励将在朋友订阅后7天内发放</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">🏆 奖励进度</h2>
            
            <div className="space-y-4">
              {rewards.map(reward => (
                <div
                  key={reward.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    reward.claimed
                      ? 'border-green-500/50 bg-green-500/10'
                      : referralStats.successfulReferrals >= reward.requirement
                      ? 'border-netflix-red/50 bg-netflix-red/10'
                      : 'border-gray-600 bg-gray-700/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{reward.icon}</span>
                      <div>
                        <h4 className="text-white font-semibold">{reward.title}</h4>
                        <p className="text-gray-400 text-sm">{reward.description}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          进度: {Math.min(referralStats.successfulReferrals, reward.requirement)}/{reward.requirement}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {reward.claimed ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                          已获得
                        </span>
                      ) : referralStats.successfulReferrals >= reward.requirement ? (
                        <button className="bg-netflix-red text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition-colors">
                          领取
                        </button>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          还需 {reward.requirement - referralStats.successfulReferrals} 人
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          reward.claimed ? 'bg-green-500' : 'bg-netflix-red'
                        }`}
                        style={{
                          width: `${Math.min((referralStats.successfulReferrals / reward.requirement) * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">📋 邀请记录</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-300 font-semibold py-3">邀请对象</th>
                  <th className="text-left text-gray-300 font-semibold py-3">邀请日期</th>
                  <th className="text-left text-gray-300 font-semibold py-3">状态</th>
                  <th className="text-left text-gray-300 font-semibold py-3">奖励</th>
                </tr>
              </thead>
              <tbody>
                {referralHistory.map(referral => (
                  <tr key={referral.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-4 text-white">{referral.email}</td>
                    <td className="py-4 text-gray-300">
                      {new Date(referral.date).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(referral.status)}
                    </td>
                    <td className="py-4">
                      {referral.status === 'completed' ? (
                        <span className="text-green-400 font-semibold">¥{referral.reward}</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {referralHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">还没有邀请记录</h3>
              <p className="text-gray-400">开始邀请朋友，获得丰厚奖励吧！</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Referral;
