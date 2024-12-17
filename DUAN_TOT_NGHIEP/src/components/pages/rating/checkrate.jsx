import axios from 'axios';
import { useEffect, useState, useContext } from 'react';

const useHasRatedTour = (user,tourId) => {
  const [hasRated, setHasRated] = useState(false);
  const [ratingDatas, setRatingData] = useState(null);

  useEffect(() => {
    const checkUserRating = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Rating/check/${user._id}/${tourId}`
        );
        setHasRated(response.data.hasRated);
        setRatingData(response.data.rating);
      } catch (error) {
        console.error("Lỗi khi kiểm tra đánh giá:", error);
      }
    };
    
    if (user && tourId) {
      checkUserRating();
    }
  }, [user, tourId]);

  return { hasRated, ratingDatas };
};

export default useHasRatedTour;
