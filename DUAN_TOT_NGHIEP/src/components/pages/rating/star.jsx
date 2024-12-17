import React from 'react';

const Stars = ({ rating, onRatingChange }) => {
  return (
    <div className="stars">
      {[5, 4, 3, 2, 1].map((value) => (
        <React.Fragment key={value}>
          <input
            type="radio"
            id={`star${value}`}
            name="rating"
            value={value}
            checked={rating === value}
            onChange={() => onRatingChange(value)}
          />
          <label htmlFor={`star${value}`}>&#9733;</label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stars;
