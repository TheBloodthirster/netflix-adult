import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieRow from '../components/MovieRow';
import { movies } from '../data/mockData';

const movieCategories = [
  {
    title: '漫威电影宇宙',
    movies: movies.filter(movie => [7, 8, 9, 10, 11, 12].includes(movie.id))
  },
  {
    title: '动作电影',
    movies: movies.filter(movie => [7, 8, 9, 12].includes(movie.id))
  },
  {
    title: '科幻电影',
    movies: movies.filter(movie => [7, 9, 10].includes(movie.id))
  },
  {
    title: '超级英雄电影',
    movies: movies.filter(movie => [8, 9, 11, 12].includes(movie.id))
  }
];

function Movies() {
  const heroMovie = movies[0];

  return (
    <div className="bg-netflix-black min-h-screen">
      <Header />
      
      <div className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroMovie.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 px-4 md:px-16 max-w-2xl">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {heroMovie.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-netflix-red text-white px-2 py-1 rounded text-sm font-semibold">
              {heroMovie.rating}
            </span>
            <span className="text-white">{heroMovie.year}</span>
            <span className="text-white">{heroMovie.duration}</span>
            <span className="text-gray-300">{heroMovie.genre}</span>
          </div>
          
          <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-200">
            {heroMovie.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`/watch/${heroMovie.id}`} className="btn flex items-center justify-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-all duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>播放</span>
            </Link>
            
            <button className="btn flex items-center justify-center space-x-2 bg-gray-600/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600/90 transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>加入我的片单</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {movieCategories.map((category, index) => (
          <MovieRow 
            key={index}
            title={category.title}
            movies={category.movies}
          />
        ))}
      </div>
      
      <Footer />
    </div>
  );
}

export default Movies;
