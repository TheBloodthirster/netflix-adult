import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../hooks/useToast';

function Upload() {
  const [uploadStep, setUploadStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    type: '电影',
    year: new Date().getFullYear(),
    language: '中文',
    thumbnail: null,
    video: null,
    tags: '',
    visibility: 'public'
  });
  const { showToast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStep(4);
          showToast('视频上传成功！', 'success');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uploadStep === 3) {
      simulateUpload();
    } else {
      setUploadStep(prev => prev + 1);
    }
  };

  const genres = [
    '动作', '冒险', '喜剧', '剧情', '恐怖', '科幻', '惊悚', '爱情', 
    '动画', '纪录片', '音乐', '战争', '历史', '传记', '犯罪', '悬疑'
  ];

  const renderStepContent = () => {
    switch (uploadStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">📝 基本信息</h2>
            
            <div>
              <label className="block text-white font-semibold mb-2">标题 *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="输入视频标题"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">描述</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="描述你的视频内容..."
                rows="4"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">类型 *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
                >
                  <option value="电影">电影</option>
                  <option value="电视剧">电视剧</option>
                  <option value="纪录片">纪录片</option>
                  <option value="动画">动画</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">年份</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">类型标签</label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => {
                      const currentGenres = formData.genre.split('/').filter(g => g.trim());
                      if (currentGenres.includes(genre)) {
                        setFormData(prev => ({
                          ...prev,
                          genre: currentGenres.filter(g => g !== genre).join('/')
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          genre: [...currentGenres, genre].join('/')
                        }));
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      formData.genre.includes(genre)
                        ? 'bg-netflix-red text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">🖼️ 媒体文件</h2>
            
            <div>
              <label className="block text-white font-semibold mb-2">视频文件 *</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-netflix-red transition-colors">
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">🎬</div>
                  <div className="text-white font-semibold mb-2">
                    {formData.video ? formData.video.name : '点击上传视频文件'}
                  </div>
                  <div className="text-gray-400 text-sm">
                    支持 MP4, MOV, AVI 格式，最大 2GB
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">缩略图</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-netflix-red transition-colors">
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">🖼️</div>
                  <div className="text-white font-semibold mb-2">
                    {formData.thumbnail ? formData.thumbnail.name : '点击上传缩略图'}
                  </div>
                  <div className="text-gray-400 text-sm">
                    推荐尺寸 1920x1080，支持 JPG, PNG 格式
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">语言</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
                >
                  <option value="中文">中文</option>
                  <option value="英语">英语</option>
                  <option value="日语">日语</option>
                  <option value="韩语">韩语</option>
                  <option value="法语">法语</option>
                  <option value="德语">德语</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">可见性</label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-netflix-red border border-gray-600"
                >
                  <option value="public">公开</option>
                  <option value="unlisted">不公开列出</option>
                  <option value="private">私人</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">✅ 确认信息</h2>
            
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">上传预览</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-700 rounded-lg p-4 h-48 flex items-center justify-center mb-4">
                    {formData.thumbnail ? (
                      <img 
                        src={URL.createObjectURL(formData.thumbnail)} 
                        alt="缩略图预览"
                        className="max-w-full max-h-full object-contain rounded"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <div className="text-4xl mb-2">🖼️</div>
                        <div>缩略图预览</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400">标题：</span>
                    <span className="text-white font-semibold">{formData.title || '未设置'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">类型：</span>
                    <span className="text-white">{formData.type}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">年份：</span>
                    <span className="text-white">{formData.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">类型：</span>
                    <span className="text-white">{formData.genre || '未设置'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">语言：</span>
                    <span className="text-white">{formData.language}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">可见性：</span>
                    <span className="text-white">
                      {formData.visibility === 'public' ? '公开' : 
                       formData.visibility === 'unlisted' ? '不公开列出' : '私人'}
                    </span>
                  </div>
                </div>
              </div>
              
              {formData.description && (
                <div className="mt-4">
                  <span className="text-gray-400">描述：</span>
                  <p className="text-white mt-1">{formData.description}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-semibold text-white">上传成功！</h2>
            <p className="text-gray-300">
              你的视频已成功上传，正在处理中。处理完成后将自动发布。
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">下一步</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/creator-studio"
                  className="bg-netflix-red text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  返回工作台
                </Link>
                <Link 
                  to="/analytics"
                  className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  查看分析
                </Link>
                <button 
                  onClick={() => {
                    setUploadStep(1);
                    setFormData({
                      title: '',
                      description: '',
                      genre: '',
                      type: '电影',
                      year: new Date().getFullYear(),
                      language: '中文',
                      thumbnail: null,
                      video: null,
                      tags: '',
                      visibility: 'public'
                    });
                  }}
                  className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  上传更多
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              📤 上传内容
            </h1>
            <p className="text-gray-300 text-lg">
              分享你的创作，让更多人看到你的作品
            </p>
          </div>

          {uploadStep < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">上传进度</span>
                <span className="text-gray-400">{uploadStep}/3</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-netflix-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(uploadStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {isUploading && (
            <div className="mb-8 bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">正在上传...</span>
                <span className="text-netflix-red">{Math.floor(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-netflix-red h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="bg-gray-800/30 rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              
              {uploadStep < 4 && !isUploading && (
                <div className="flex justify-between mt-8">
                  {uploadStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setUploadStep(prev => prev - 1)}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      上一步
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={!formData.title || (uploadStep === 2 && !formData.video)}
                    className="bg-netflix-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                  >
                    {uploadStep === 3 ? '开始上传' : '下一步'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Upload;
