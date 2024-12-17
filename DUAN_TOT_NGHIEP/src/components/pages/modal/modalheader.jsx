import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';

const ModalHeader = ({ closeModal }) => {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("id");
  const [tourInfo, setTourInfo] = useState({
    name: "",
    averageRating: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Rating/allTourWithRatings");
        if (response.data && response.data.length > 0) {
          // Tìm tour theo tourId trong dữ liệu trả về
          const tour = response.data.find(item => item.tour._id === tourId); // Giả sử tour có thuộc tính id
          if (tour) {
            const { tour: tourDetails, averageRating, totalRatings } = tour; // Gán lại tên tour cho dễ đọc
            setTourInfo({
              name: tourDetails.name,
              averageRating: parseFloat(averageRating.toFixed(1)), // Làm tròn về 1 chữ số thập phân
              totalRatings,
            });
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tour:", error);
      }
    };

    fetchTourData();
  }, [tourId]); // Cập nhật khi tourId thay đổi

  return (
    <div className="modal-header">
      <div>
        <div className="title">Đánh giá của khách về {tourInfo.name}</div>
        <div className="rating-info">
          <div className="rating-box">{tourInfo.averageRating}/5</div>
          <div className="rating-text">
            <div className="reviews">{tourInfo.totalRatings} đánh giá</div>
          </div>
          <div className="info-text">Chúng tôi cố gắng mang đến 100% đánh giá thật ℹ️</div>
        </div>
      </div>
      <div>
        <span className="close-modal-icon" onClick={closeModal}>
          ✖
        </span>
      </div>
    </div>
  );
};

export default ModalHeader;
