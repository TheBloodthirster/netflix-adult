import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../hooks/useToast';

function GiftCards() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { showToast } = useToast();

  const giftAmounts = [25, 50, 100, 200, 500];
  
  const giftCardHistory = [
    {
      id: 'gc_001',
      code: 'NFLX-ABCD-1234-EFGH',
      amount: 100,
      status: 'used',
      purchaseDate: '2024-07-15',
      usedDate: '2024-07-20',
      recipient: 'self'
    },
    {
      id: 'gc_002',
      code: 'NFLX-WXYZ-5678-IJKL',
      amount: 50,
      status: 'active',
      purchaseDate: '2024-08-01',
      usedDate: null,
      recipient: 'friend@email.com'
    }
  ];

  const handlePurchase = () => {
    const amount = customAmount || selectedAmount;
    if (amount < 10) {
      showToast('礼品卡金额不能少于¥10', 'error');
      return;
    }
    
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    setShowPurchaseModal(false);
    showToast('礼品卡购买成功！已发送到指定邮箱', 'success');
    setRecipientEmail('');
    setMessage('');
    setCustomAmount('');
  };

  const handleRedeem = () => {
    if (!redeemCode.trim()) {
      showToast('请输入兑换码', 'error');
      return;
    }
    
    if (redeemCode.length < 16) {
      showToast('兑换码格式不正确', 'error');
      return;
    }
    
    showToast('礼品卡兑换成功！¥50已添加到你的账户', 'success');
    setRedeemCode('');
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      used: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      expired: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    const labels = {
      active: '有效',
      used: '已使用',
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
            🎁 礼品卡中心
          </h1>
          <p className="text-gray-300 text-lg">
            购买Netflix礼品卡，分享精彩内容给朋友和家人
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">🛒 购买礼品卡</h2>
            
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">选择金额</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {giftAmounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedAmount === amount && !customAmount
                        ? 'border-netflix-red bg-netflix-red/20 text-white'
                        : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-xl font-bold">¥{amount}</div>
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">自定义金额</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">¥</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    placeholder="输入金额 (最低¥10)"
                    min="10"
                    max="1000"
                    className="w-full bg-gray-700 text-white rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">收件人信息</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2">收件人邮箱</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="输入收件人邮箱地址"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">祝福消息 (可选)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="写下你的祝福..."
                    rows="3"
                    maxLength="200"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
                  />
                  <div className="text-gray-400 text-sm mt-1">{message.length}/200</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">礼品卡金额</span>
                <span className="text-white font-semibold">¥{customAmount || selectedAmount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">手续费</span>
                <span className="text-white font-semibold">¥0</span>
              </div>
              <div className="border-t border-gray-600 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">总计</span>
                  <span className="text-netflix-red font-bold text-lg">¥{customAmount || selectedAmount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePurchase}
              disabled={!recipientEmail || (!customAmount && !selectedAmount)}
              className="w-full bg-netflix-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              立即购买
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">🔑 兑换礼品卡</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2">兑换码</label>
                  <input
                    type="text"
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                    placeholder="输入礼品卡兑换码"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600 font-mono"
                  />
                  <div className="text-gray-400 text-sm mt-1">
                    格式: NFLX-XXXX-XXXX-XXXX
                  </div>
                </div>
                
                <button
                  onClick={handleRedeem}
                  disabled={!redeemCode.trim()}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  兑换礼品卡
                </button>
              </div>

              <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-400 text-xl">💡</span>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">兑换说明</h4>
                    <ul className="text-blue-300 text-sm space-y-1">
                      <li>• 礼品卡余额将添加到你的Netflix账户</li>
                      <li>• 可用于支付订阅费用</li>
                      <li>• 余额永不过期</li>
                      <li>• 不可转让或退款</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">💰 账户余额</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">¥125.50</div>
                <div className="text-gray-400">可用余额</div>
                <div className="text-sm text-gray-500 mt-2">
                  足够支付 2.5 个月的高级套餐
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">📋 礼品卡记录</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-300 font-semibold py-3">兑换码</th>
                  <th className="text-left text-gray-300 font-semibold py-3">金额</th>
                  <th className="text-left text-gray-300 font-semibold py-3">购买日期</th>
                  <th className="text-left text-gray-300 font-semibold py-3">使用日期</th>
                  <th className="text-left text-gray-300 font-semibold py-3">收件人</th>
                  <th className="text-left text-gray-300 font-semibold py-3">状态</th>
                </tr>
              </thead>
              <tbody>
                {giftCardHistory.map(card => (
                  <tr key={card.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-4">
                      <div className="font-mono text-white text-sm">{card.code}</div>
                    </td>
                    <td className="py-4 text-white font-semibold">¥{card.amount}</td>
                    <td className="py-4 text-gray-300">
                      {new Date(card.purchaseDate).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="py-4 text-gray-300">
                      {card.usedDate ? new Date(card.usedDate).toLocaleDateString('zh-CN') : '-'}
                    </td>
                    <td className="py-4 text-gray-300">
                      {card.recipient === 'self' ? '自己' : card.recipient}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(card.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {giftCardHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold text-white mb-2">暂无礼品卡记录</h3>
              <p className="text-gray-400">购买或兑换礼品卡后，记录将显示在这里</p>
            </div>
          )}
        </div>

        {showPurchaseModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-4">
              <h3 className="text-xl font-semibold text-white mb-4">确认购买</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">礼品卡金额</span>
                  <span className="text-white">¥{customAmount || selectedAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">收件人</span>
                  <span className="text-white">{recipientEmail}</span>
                </div>
                {message && (
                  <div>
                    <span className="text-gray-300">祝福消息</span>
                    <div className="text-white text-sm mt-1 p-2 bg-gray-700 rounded">{message}</div>
                  </div>
                )}
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">总计</span>
                    <span className="text-netflix-red">¥{customAmount || selectedAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={confirmPurchase}
                  className="flex-1 bg-netflix-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  确认购买
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default GiftCards;
