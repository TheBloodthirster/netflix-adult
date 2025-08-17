import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentCard from '../components/ContentCard';
import { languages } from '../data/mockData';

function BrowseByLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState('korean');

  const currentLanguage = languages.find(lang => lang.id === selectedLanguage);

  return (
    <div className="bg-netflix-black min-h-screen">
      <Header />
      
      <div className="pt-24 px-4 md:px-16 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">按语言浏览</h1>
          <p className="text-gray-400 mb-6">探索来自世界各地的精彩内容</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedLanguage === language.id
                    ? 'bg-netflix-red text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>

        {currentLanguage && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                {currentLanguage.name}内容
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {currentLanguage.shows.map((show) => (
                  <ContentCard key={show.id} item={show} showDetails={true} />
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                为什么选择{currentLanguage.name}内容？
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">文化深度</h4>
                  <p className="text-gray-400 text-sm">
                    体验原汁原味的{currentLanguage.name}文化，了解不同的价值观和生活方式。
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">语言学习</h4>
                  <p className="text-gray-400 text-sm">
                    通过观看{currentLanguage.name}内容，提高您的语言理解能力和文化素养。
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">独特故事</h4>
                  <p className="text-gray-400 text-sm">
                    发现只有{currentLanguage.name}内容才能讲述的独特故事和叙事风格。
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">全球视野</h4>
                  <p className="text-gray-400 text-sm">
                    拓展您的全球视野，了解世界各地的创作才华和艺术表达。
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                想要更多{currentLanguage.name}内容？
              </h3>
              <p className="text-gray-400 mb-6">
                我们会根据您的观看偏好推荐更多精彩的{currentLanguage.name}电影和电视剧
              </p>
              <button className="bg-netflix-red text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors">
                个性化推荐
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default BrowseByLanguage;
