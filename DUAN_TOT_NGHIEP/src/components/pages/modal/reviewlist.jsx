import ReviewItem from "./reviewitem";
import { errorStatus } from '../../../redux/rating_slice';
import { useSelector } from 'react-redux';

const ReviewList = ({ sortedRatings }) => {
  const isError = useSelector((state) => state.RatingSL.isErrorStatus);
  console.log("is:", isError);

  return (
    <div>
      {isError ? (
        <div className="no-reviews">
          <img width="45px" src="src/publics/image/images/image.png" alt="" />
          <p>Tour này hiện tại chưa có đánh giá</p>
        </div>
      ) : (
        sortedRatings.map((rating) => (
          <ReviewItem key={rating._id} rating={rating} />
        ))
      )}
    </div>
  );
};

export default ReviewList;
