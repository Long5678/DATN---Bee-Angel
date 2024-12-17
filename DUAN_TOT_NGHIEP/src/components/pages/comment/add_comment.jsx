import { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../redux/thunk/comment_thunk";

const CommentForm = ({ tourId }) => {
  let dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [namesImg, setNamesImg] = useState([]); // state lưu tên hình ảnh
  const [images, setImages] = useState([]); // state lưu hình ảnh
  const [previewUrls, setPreviewUrls] = useState([]); // state lưu URL xem trước ảnh
  const [errors, setErrors] = useState({
    commentText: "",
    images: "",
  });

  const isLoadingCM = useSelector((state) => state.CommentSL.isLoadingCM)

  const { user } = useContext(AuthContext);

  // Nếu chưa đăng nhập, hiển thị thông báo yêu cầu đăng nhập
  if (!user) {
    return (
      <div className="comment-form">
        <textarea
          placeholder="Vui lòng đăng nhập để thực hiên bình luận"
          rows="2"
          disabled={true}
        ></textarea>
      </div>
    );
  }

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

      // Nếu có lỗi, cập nhật state lỗi
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

  const replies = [
    {
      userId: {
        name: "Long nhân viên",
        _id: "66fa5d974c173b4285a5dc2d",
      },
      comment: user?._id,
      content: "Cảm ơn bạn đã bình luận."
    }
  ];

  function handleRemoveImage(index) {
    // Xóa ảnh khỏi các mảng theo chỉ mục
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
    setNamesImg(namesImg.filter((_, i) => i !== index));
  }

  const handleSubmit = () => {
    let formErrors = {};

    // Kiểm tra nội dung bình luận
    if (!commentText.trim()) {
      formErrors.commentText = "Nội dung bình luận không được để trống!";
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
    formData.append('content', commentText);
    formData.append('tourId', tourId);
    formData.append('userId', user._id);
    formData.append('replies', replies);

    images.forEach((image) => {
      formData.append('image', image);
    });

    dispatch(addComment(formData));

    // Reset form sau khi gửi
    setCommentText("");
    setNamesImg([]);
    setPreviewUrls([]);
    setImages([]);
  };


  return (
    <div className="comment-form">
      {/* Lỗi cho nội dung bình luận */}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Viết bình luận của bạn tại đây..."
        rows="2"
      ></textarea>
      {errors.commentText && (
        <p style={{ color: "red", marginBottom: "10px" }}>{errors.commentText}</p>
      )}

      {/* Chọn ảnh */}
      <label className="custom-file-upload">
        Chọn ảnh (tối đa 4 ảnh)
        <input type="file" onChange={changeFileImg} />
      </label>
      {errors.images && (
        <p style={{ color: "red", marginBottom: "10px" }}>{errors.images}</p>
      )}

      {/* Hiển thị hình ảnh xem trước */}
      <div className="image-preview-container">
        {previewUrls.map((url, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              position: "relative",
              marginRight: "10px",
            }}
          >
            <img
              src={url}
              alt={`preview ${index}`}
              className="image-preview"
              style={{ width: "100px", cursor: "pointer" }}
              onClick={() => handleRemoveImage(index)}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                width: "20px",
                height: "20px",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                padding: "1.5px 4px",
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Gửi bình luận */}
      <button className="submit-btn" onClick={handleSubmit}>
        Gửi bình luận
      </button>
      {isLoadingCM &&
        <>
          <span className="loader-addComment"></span>
          <span style={{ color: "tomato", fontSize: "0.8rem" }}>Đang gửi bình luận</span>
        </>
      }

    </div>
  );
};

export default CommentForm;