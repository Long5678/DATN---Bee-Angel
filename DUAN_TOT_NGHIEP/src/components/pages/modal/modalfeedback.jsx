import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getRating, getAllRatingTours } from '../../../redux/thunk/rating_thunk';
import ModalHeader from './modalheader';
import ReviewHeader from './reviewheader';
import ReviewList from './reviewlist';

const ModalFeedback = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("id");
  const ratingsData = useSelector((state) => state.RatingSL?.ratingDatas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [sortedRatings, setSortedRatings] = useState([]);

  useEffect(() => {
    dispatch(getRating(tourId));
  }, [tourId]);



  useEffect(() => {
    const sorted = [...ratingsData].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
    setSortedRatings(sorted);
  }, [ratingsData, sortOrder]);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalVisible(true);
    }, 100);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 800);
  };

  return (
    <div>
      <button className="open-modal-link" onClick={openModal}>
        Hiển Thị Phản Hồi
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className={`modal ${isModalVisible ? 'open' : 'closed'}`} onClick={(e) => e.stopPropagation()}>
            <ModalHeader closeModal={closeModal} />
            <ReviewHeader sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <ReviewList sortedRatings={sortedRatings} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalFeedback;
