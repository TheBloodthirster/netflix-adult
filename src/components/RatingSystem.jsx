import React, { useState, useEffect } from 'react';

function RatingSystem({ contentId, initialRating = 0, onRatingChange }) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const savedRatings = localStorage.getItem('netflix_user_ratings');
    if (savedRatings) {
      try {
        const ratings = JSON.parse(savedRatings);
        if (ratings[contentId]) {
          setUserRating(ratings[contentId]);
        }
      } catch (e) {
        console.error('Failed to parse user ratings:', e);
      }
    }
  }, [contentId]);

  const handleRating = (newRating) => {
    setUserRating(newRating);
    
    const savedRatings = localStorage.getItem('netflix_user_ratings');
    let ratings = {};
    
    if (savedRatings) {
      try {
        ratings = JSON.parse(savedRatings);
      } catch (e) {
        console.error('Failed to parse existing ratings:', e);
      }
    }
    
    ratings[contentId] = newRating;
    localStorage.setItem('netflix_user_ratings', JSON.stringify(ratings));
    
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    const displayRating = hoverRating || userRating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          onClick={() => handleRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <svg 
            className={`w-5 h-5 transition-colors ${
              i <= displayRating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-400 hover:text-yellow-300'
            }`}
            fill={i <= displayRating ? 'currentColor' : 'none'}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
            />
          </svg>
        </button>
      );
    }
    
    return stars;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {renderStars()}
      </div>
      {userRating > 0 && (
        <span className="text-sm text-gray-400">
          你的评分: {userRating}/5
        </span>
      )}
      {!userRating && hoverRating > 0 && (
        <span className="text-sm text-gray-400">
          点击评分: {hoverRating}/5
        </span>
      )}
    </div>
  );
}

function ReviewSystem({ contentId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedReviews = localStorage.getItem(`netflix_reviews_${contentId}`);
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        console.error('Failed to parse reviews:', e);
      }
    }
  }, [contentId]);

  const submitReview = () => {
    if (!newReview.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    const review = {
      id: Date.now(),
      text: newReview.trim(),
      author: '用户',
      date: new Date().toISOString(),
      likes: 0
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`netflix_reviews_${contentId}`, JSON.stringify(updatedReviews));
    setNewReview('');
    setIsSubmitting(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="分享你的观看感受..."
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-netflix-red focus:outline-none resize-none"
          rows={3}
          maxLength={500}
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {newReview.length}/500
          </span>
          <button
            onClick={submitReview}
            disabled={!newReview.trim() || isSubmitting}
            className="px-4 py-2 bg-netflix-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '发布中...' : '发布评论'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">用</span>
                </div>
                <span className="text-white font-medium">{review.author}</span>
              </div>
              <span className="text-gray-400 text-sm">{formatDate(review.date)}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{review.text}</p>
            <div className="flex items-center space-x-4 mt-3">
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span className="text-sm">{review.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { RatingSystem, ReviewSystem };
export default RatingSystem;
