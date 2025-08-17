import React from 'react';

function Footer() {
  const footerLinks = [
    ['常见问题', '投资者关系', '隐私', '速度测试'],
    ['帮助中心', '招聘信息', 'Cookie 偏好设置', '法律声明'],
    ['账户', '兑换礼品卡', '企业信息', '仅限 Netflix 内容'],
    ['媒体中心', '使用条款', '联系我们', '']
  ];

  return (
    <footer className="bg-netflix-black text-gray-400 py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-lg mb-6">有疑问？请致电 400-000-0000</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3">
              {column.map((link, linkIndex) => (
                link && (
                  <a 
                    key={linkIndex}
                    href="#" 
                    className="block text-sm hover:underline transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                )
              ))}
            </div>
          ))}
        </div>

        <div className="mb-8">
          <button className="border border-gray-600 px-4 py-2 text-sm hover:border-white transition-colors">
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            中文
          </button>
        </div>

        <div className="text-sm">
          <p>Netflix 中国</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
