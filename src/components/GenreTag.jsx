import React from 'react';
import { getGenreObject, parseGenres } from '../data/categories';

function GenreTag({ genre, size = 'sm', clickable = false, onClick }) {
  const genreObj = getGenreObject(genre);
  
  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <span
      className={`inline-block rounded-full font-medium transition-all duration-200 ${sizeClasses[size]} ${
        clickable ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''
      }`}
      style={{
        backgroundColor: genreObj.color,
        color: 'white'
      }}
      onClick={clickable ? () => onClick(genre) : undefined}
      title={clickable ? `点击筛选 ${genre} 类型` : undefined}
    >
      {genre}
    </span>
  );
}

function GenreTagList({ genres, size = 'sm', maxTags = 3, clickable = false, onTagClick }) {
  if (!genres) return null;
  
  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };
  
  const genreArray = typeof genres === 'string' ? parseGenres(genres) : genres;
  const displayGenres = genreArray.slice(0, maxTags);
  const remainingCount = genreArray.length - maxTags;

  return (
    <div className="flex flex-wrap gap-1">
      {displayGenres.map((genre, index) => (
        <GenreTag
          key={index}
          genre={genre}
          size={size}
          clickable={clickable}
          onClick={onTagClick}
        />
      ))}
      {remainingCount > 0 && (
        <span className={`inline-block rounded-full bg-gray-600 text-white font-medium ${sizeClasses[size]}`}>
          +{remainingCount}
        </span>
      )}
    </div>
  );
}

export { GenreTag, GenreTagList };
