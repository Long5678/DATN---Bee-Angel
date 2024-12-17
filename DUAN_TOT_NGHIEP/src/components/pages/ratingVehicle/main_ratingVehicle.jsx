import { useState, useContext, useEffect } from 'react';
import Stars from './star.jsx';
import ThankYouMessage from './thankmessage.jsx';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/authContext.jsx';
import { addRatingVehicle } from '../../../redux/thunk/action_ratingVeh.js';
import useHasRatedVehicle from './checkrate.jsx';
import '../../../publics/styles/rating.scss';

const MainRating_Vehicle = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate(); // Khởi tạo navigate
  const [rating, setRating] = useState(0);
  const [reviewText, setComment] = useState(''); // State để lưu comment của người dùng
  const [submitted, setSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // Thêm state cho hiệu ứng
  const [namesImg, setNamesImg] = useState([]); // state lưu tên hình ảnh
  const [images, setImages] = useState([]); // state lưu hình ảnh
  const [previewUrls, setPreviewUrls] = useState([]); // state lưu URL xem trước ảnh
  const [searchParams] = useSearchParams(); // lấy id từ url
  const idCar = searchParams.get("id");
  const { user } = useContext(AuthContext);
  const { hasRated, ratingDatas } = useHasRatedVehicle(user, idCar);
  const [errors, setErrors] = useState({
    reviewText: "",
    images: "",
  });


  useEffect(() => {
    if (hasRated) {
      setShowMessage(true); // Khi đã đánh giá, hiển thị thông báo với hiệu ứng
    }
  }, [hasRated]);

  useEffect(() => {
    if (submitted) {
      // Điều hướng về trang chủ sau khi gửi đánh giá
      navigate('/');
    }
  }, [submitted, navigate]); // Thêm navigate vào dependencies

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  function changeFileImg(e) {
    const file = e.target.files[0];
    let fileErrors = {};

    if (file) {
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      if (!validFormats.includes(file.type)) {
        fileErrors.images = "Chỉ được tải lên các file ảnh định dạng JPEG, PNG hoặc JPG!";
      } else if (file.size > 2 * 1024 * 1024) {
        fileErrors.images = "Kích thước file không được vượt quá 2MB!";
      } else if (images.length >= 4) {
        fileErrors.images = "Chỉ được tải lên tối đa 4 hình ảnh!";
      }

      if (Object.keys(fileErrors).length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...fileErrors,
        }));
        return;
      }

      // Nếu không có lỗi, thêm ảnh
      setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
      setNamesImg([...namesImg, file.name]);
      setImages([...images, file]);
      setPreviewUrls([...previewUrls, URL.createObjectURL(file)]);
    }
  }

  function handleRemoveImage(index) {
    // Xóa ảnh khỏi các mảng theo chỉ mục
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
    setNamesImg(namesImg.filter((_, i) => i !== index));
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn behavior mặc định của submit form

    let formErrors = {};

    // Kiểm tra số sao đánh giá
    if (rating === 0) {
      formErrors.rating = "Vui lòng chọn số sao để đánh giá!";
    }

    // Kiểm tra nội dung đánh giá
    if (!reviewText.trim()) {
      formErrors.reviewText = "Nội dung đánh giá không được để trống!";
    }

    // Kiểm tra số lượng ảnh
    if (images.length > 4) {
      formErrors.images = "Chỉ được tải lên tối đa 4 hình ảnh!";
    }

    // Nếu có lỗi, cập nhật state và dừng việc gửi dữ liệu
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Nếu không có lỗi, xóa lỗi và gửi dữ liệu
    setErrors({});
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("review", reviewText);
    formData.append("idCar", idCar);
    formData.append("userId", user._id);

    images.forEach((image) => {
      formData.append("imageUrls", image);
    });

    dispatch(addRatingVehicle(formData));

    setSubmitted(true); // Đặt trạng thái đã gửi đánh giá
    alert("Cảm ơn bạn đã gửi đánh giá!");
  };


  return (
    <div className='box-rating-board'>
      <div className="rating-board">
        <h1>BeeAngel</h1>
        <p>ĐÁNH GIÁ</p>

        {hasRated ? (
          // Hiển thị thông báo với hiệu ứng slide down
          <div className={`rating-message ${showMessage ? 'slide-down' : ''}`}>
            <p>Bạn đã đánh giá xe này</p>
          </div>
        ) : (
          // Hiển thị form đánh giá khi người dùng chưa đánh giá
          <div>
            <p className="subtitle">Trải nghiệm của khách hàng</p>

            {/* Component Stars */}
            <Stars rating={rating} onRatingChange={handleRatingChange} />
            <p className="slogan">Đánh giá của bạn là động lực cải tiến của chúng tôi!</p>
            <div className='image-upload-container'>
              <label className="custom-file-upload">
                Chọn ảnh (tối đa 4 ảnh)
                <input type="file" value={setNamesImg} onChange={changeFileImg} />
              </label>
              {errors.images && (
                <p style={{ color: "red", marginBottom: "10px" }}>{errors.images}</p>
              )}

              {/* Hiển thị hình ảnh xem trước với khả năng xóa */}
              <div className="image-preview-container">
                {previewUrls.map((url, index) => (
                  <div key={index} style={{ display: 'inline-block', position: 'relative', marginRight: '10px' }}>
                    <img
                      src={url}
                      alt={`preview ${index}`}
                      className="image-preview"
                      style={{ width: '100px', cursor: 'pointer' }}
                      onClick={() => handleRemoveImage(index)} // Xóa ảnh khi nhấn vào
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        backgroundColor: 'red',
                        width: '20px',
                        height: '20px',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        padding: '1.5px 4px'
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Phần Text Box */}
            <form onSubmit={handleSubmit}>
              <textarea
                value={reviewText}
                onChange={handleCommentChange}
                placeholder="Viết đánh giá của bạn tại đây..."
                rows="4"
                className="comment-box"
              />
              <br />
              <button type="submit" className="submit-btn">Gửi đánh giá</button>
            </form>
            {errors.reviewText && (
              <p style={{ color: "red", marginBottom: "10px" }}>{errors.reviewText}</p>
            )}

            {/* Component ThankYouMessage (sau khi đánh giá xong sẽ hiện) */}
            {submitted && <ThankYouMessage />}
          </div>
        )}

        <p className="footer">
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, vui lòng đánh giá sau chuyến đi
        </p>
      </div>
    </div>
  );
};



export default MainRating_Vehicle;
