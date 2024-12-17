import axios from 'axios';
import { useEffect, useState, useContext } from 'react';

const useHasRatedVehicle = (user,idCar) => {
  const [hasRated, setHasRated] = useState(false);
  const [ratingDatas, setRatingData] = useState(null);

  useEffect(() => {
    const checkUserRating = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/ratingVehicle/check/${user._id}/${idCar}`
        );
        setHasRated(response.data.hasRated);
        setRatingData(response.data.rating);
      } catch (error) {
        console.error("Lỗi khi kiểm tra đánh giá:", error);
      }
    };
    
    if (user && idCar) {
      checkUserRating();
    }
  }, [user, idCar]);

  return { hasRated, ratingDatas };
};

export default useHasRatedVehicle;
