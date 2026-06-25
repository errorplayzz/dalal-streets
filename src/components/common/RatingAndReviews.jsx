import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './CommonComponents.css';

export const RatingStars = ({ rating, editable = false, onChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleMouseOver = (index) => {
    if (editable) {
      setHoveredRating(index);
    }
  };
  
  const handleMouseLeave = () => {
    if (editable) {
      setHoveredRating(0);
    }
  };
  
  const handleClick = (index) => {
    if (editable && onChange) {
      onChange(index);
    }
  };
  
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= (hoveredRating || rating) ? 'filled' : ''}
          onMouseOver={() => handleMouseOver(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
          disabled={!editable}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export const ReviewForm = ({ onSubmit, propertyId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState([]);
  
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Process each file to create preview URLs
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setPhotos(prev => [...prev, ...newPhotos]);
  };
  
  const handleRemovePhoto = (index) => {
    const newPhotos = [...photos];
    
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(newPhotos[index].preview);
    
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      alert('Please provide a review comment');
      return;
    }
    
    // Create form data for submission with photos
    const formData = new FormData();
    formData.append('propertyId', propertyId);
    formData.append('rating', rating);
    formData.append('comment', comment);
    
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo.file);
    });
    
    onSubmit(formData);
    
    // Reset form
    setRating(0);
    setComment('');
    
    // Clean up photo previews
    photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    setPhotos([]);
  };
  
  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Rating</label>
        <RatingStars rating={rating} editable={true} onChange={handleRatingChange} />
      </div>
      
      <div className="form-group">
        <label htmlFor="reviewComment">Your Review</label>
        <textarea
          id="reviewComment"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Share your experience with this property..."
          required
        />
      </div>
      
      <div className="form-group">
        <label>Add Photos (Optional)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="file-input"
        />
        
        {photos.length > 0 && (
          <div className="photo-previews">
            {photos.map((photo, index) => (
              <div key={index} className="photo-preview">
                <img src={photo.preview} alt={`Review preview ${index}`} />
                <button
                  type="button"
                  className="remove-photo"
                  onClick={() => handleRemovePhoto(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button type="submit" className="submit-review-button">
        Submit Review
      </button>
    </form>
  );
};

export const ReviewsList = ({ reviews, showPropertyName = false }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="reviews-list">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <img
                  src={review.user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                  alt={review.user.name}
                  className="reviewer-avatar"
                />
                <div>
                  <div className="reviewer-name">{review.user.name}</div>
                  <div className="review-date">{formatDate(review.date)}</div>
                </div>
              </div>
              <div className="review-rating">
                <RatingStars rating={review.rating} />
              </div>
            </div>
            
            {showPropertyName && (
              <div className="property-name">{review.property.name}</div>
            )}
            
            <div className="review-comment">{review.comment}</div>
            
            {review.photos && review.photos.length > 0 && (
              <div className="review-photos">
                {review.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.url}
                    alt={`Review ${index + 1}`}
                    className="review-photo"
                  />
                ))}
              </div>
            )}
            
            <div className="review-actions">
              <button type="button" className="helpful-button">
                👍 <span>Helpful ({review.helpfulCount || 0})</span>
              </button>
              <button type="button" className="report-button">
                🚩 <span>Report</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-reviews">
          <p>No reviews yet. Be the first to leave a review!</p>
        </div>
      )}
    </div>
  );
};

export const RatingsSummary = ({ ratings }) => {
  // Calculate average rating
  const totalRatings = ratings.reduce((acc, curr) => acc + curr, 0);
  const ratingCount = ratings.filter(r => r > 0).length;
  const averageRating = ratingCount > 0 ? totalRatings / ratingCount : 0;
  
  // Calculate percentage for each star level
  const calculatePercentage = (starLevel) => {
    if (ratingCount === 0) return 0;
    const count = ratings.filter(r => Math.round(r) === starLevel).length;
    return (count / ratingCount) * 100;
  };
  
  return (
    <div className="ratings-summary">
      <div className="average-rating">
        <span className="rating-value">{averageRating.toFixed(1)}</span>
        <RatingStars rating={averageRating} />
        <span className="rating-count">({ratingCount} reviews)</span>
      </div>
      
      <div className="rating-bars">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="rating-bar-item">
            <span className="star-level">{star} stars</span>
            <div className="progress-bar">
              <div
                className="progress-value"
                style={{ width: `${calculatePercentage(star)}%` }}
              ></div>
            </div>
            <span className="percentage">{Math.round(calculatePercentage(star))}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
