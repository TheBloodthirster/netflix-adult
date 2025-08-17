import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../hooks/useDatabase';

function Billing() {
  const { user } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [billingHistory, setBillingHistory] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddPayment, setShowAddPayment] = useState(false);

  useEffect(() => {
    generateBillingHistory();
    generatePaymentMethods();
  }, []);

  const generateBillingHistory = () => {
    const history = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      
      const amount = Math.floor(Math.random() * 20) + 35;
      const status = i === 0 ? 'pending' : Math.random() > 0.1 ? 'paid' : 'failed';
      
      history.push({
        id: `bill_${i}`,
        date: date.toISOString().split('T')[0],
        amount: amount,
        tax: Math.floor(amount * 0.1),
        total: Math.floor(amount * 1.1),
        status: status,
        description: '高级套餐 - 月度订阅',
        paymentMethod: 'visa_1234',
        invoiceUrl: '#'
      });
    }
    
    setBillingHistory(history);
  };

  const generatePaymentMethods = () => {
    const methods = [
      {
        id: 'visa_1234',
        type: 'credit_card',
        brand: 'Visa',
        last4: '1234',
        expiry: '12/25',
        isDefault: true,
        name: '张三'
      },
      {
        id: 'master_5678',
        type: 'credit_card',
        brand: 'Mastercard',
        last4: '5678',
        expiry: '08/26',
        isDefault: false,
        name: '张三'
      },
      {
        id: 'alipay_001',
        type: 'alipay',
        brand: 'Alipay',
        account: 'zhang***@email.com',
        isDefault: false,
        name: '张三'
      }
    ];
    
    setPaymentMethods(methods);
  };

  const periods = [
    { id: 'all', name: '全部' },
    { id: '3m', name: '近3个月' },
    { id: '6m', name: '近6个月' },
    { id: '1y', name: '近1年' }
  ];

  const getFilteredHistory = () => {
    if (selectedPeriod === 'all') return billingHistory;
    
    const months = selectedPeriod === '3m' ? 3 : selectedPeriod === '6m' ? 6 : 12;
    return billingHistory.slice(0, months);
  };

  const getStatusBadge = (status) => {
    const styles = {
      paid: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    
    const labels = {
      paid: '已支付',
      pending: '待支付',
      failed: '支付失败'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      Visa: '💳',
      Mastercard: '💳',
      Alipay: '💰',
      WeChat: '💚'
    };
    
    return icons[method.brand] || '💳';
  };

  const totalSpent = billingHistory
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.total, 0);

  const avgMonthly = Math.floor(totalSpent / billingHistory.filter(bill => bill.status === 'paid').length);

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📄 账单历史
          </h1>
          <p className="text-gray-300 text-lg">
            查看你的付费记录和管理支付方式
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">总消费</h3>
              <span className="text-2xl">💰</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              ¥{totalSpent.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">累计消费金额</div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">月均消费</h3>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">
              ¥{avgMonthly}
            </div>
            <div className="text-gray-400 text-sm">平均每月</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">支付方式</h3>
              <span className="text-2xl">💳</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {paymentMethods.length}
            </div>
            <div className="text-gray-400 text-sm">已绑定</div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold">下次扣费</h3>
              <span className="text-2xl">📅</span>
            </div>
            <div className="text-lg font-bold text-orange-400">
              9月15日
            </div>
            <div className="text-gray-400 text-sm">¥49.5</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">账单记录</h2>
                <div className="flex space-x-2">
                  {periods.map(period => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        selectedPeriod === period.id
                          ? 'bg-netflix-red text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {period.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-300 font-semibold py-3">日期</th>
                      <th className="text-left text-gray-300 font-semibold py-3">描述</th>
                      <th className="text-left text-gray-300 font-semibold py-3">金额</th>
                      <th className="text-left text-gray-300 font-semibold py-3">状态</th>
                      <th className="text-left text-gray-300 font-semibold py-3">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredHistory().map(bill => (
                      <tr key={bill.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="py-4 text-white">
                          {new Date(bill.date).toLocaleDateString('zh-CN')}
                        </td>
                        <td className="py-4">
                          <div className="text-white font-medium">{bill.description}</div>
                          <div className="text-gray-400 text-sm">
                            {paymentMethods.find(pm => pm.id === bill.paymentMethod)?.brand} 
                            ****{paymentMethods.find(pm => pm.id === bill.paymentMethod)?.last4}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-white font-semibold">¥{bill.total}</div>
                          <div className="text-gray-400 text-sm">含税 ¥{bill.tax}</div>
                        </td>
                        <td className="py-4">
                          {getStatusBadge(bill.status)}
                        </td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                              下载
                            </button>
                            {bill.status === 'failed' && (
                              <button className="text-netflix-red hover:text-red-400 text-sm">
                                重试
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">支付方式</h3>
                <button 
                  onClick={() => setShowAddPayment(true)}
                  className="text-netflix-red hover:text-red-400 text-sm"
                >
                  + 添加
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div key={method.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getPaymentMethodIcon(method)}</span>
                        <div>
                          <div className="text-white font-semibold">
                            {method.brand}
                            {method.last4 && ` ****${method.last4}`}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {method.expiry && `到期 ${method.expiry}`}
                            {method.account && method.account}
                          </div>
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                          默认
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 text-sm">
                      {!method.isDefault && (
                        <button className="text-blue-400 hover:text-blue-300">
                          设为默认
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-300">
                        编辑
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">消费统计</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">本月消费</span>
                  <span className="text-white font-semibold">¥49.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">上月消费</span>
                  <span className="text-white font-semibold">¥45.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">年度消费</span>
                  <span className="text-white font-semibold">¥{totalSpent.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">预计下月</span>
                    <span className="text-netflix-red font-semibold">¥49.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showAddPayment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-4 w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">添加支付方式</h3>
                <button 
                  onClick={() => setShowAddPayment(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center transition-colors">
                    <div className="text-2xl mb-1">💳</div>
                    <div className="text-white text-sm">信用卡</div>
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center transition-colors">
                    <div className="text-2xl mb-1">💰</div>
                    <div className="text-white text-sm">支付宝</div>
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center transition-colors">
                    <div className="text-2xl mb-1">💚</div>
                    <div className="text-white text-sm">微信支付</div>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">卡号</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">有效期</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">持卡人姓名</label>
                    <input
                      type="text"
                      placeholder="张三"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setShowAddPayment(false)}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => setShowAddPayment(false)}
                    className="flex-1 bg-netflix-red text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Billing;
