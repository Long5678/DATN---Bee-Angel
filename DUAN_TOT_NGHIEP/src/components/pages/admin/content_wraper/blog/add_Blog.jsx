import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../../../../redux/action_thunk";
const AddBlog = () => {
  let dispatch = useDispatch();
  const [isPopupVisible, setPopupVisible] = useState(false); // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
  const [seoScore, setSeoScore] = useState(0); // Điểm SEO
  const [seoSuggestions, setSeoSuggestions] = useState([]); // Danh sách gợi ý SEO
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true); // State này để quản lý nút submit
  function handlePopup() {
    setPopupVisible(!isPopupVisible);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [namesImg, setNamesImg] = useState([]); // state này lưu trữ các tên ảnh để list ra
  const [nameVideos, setNameVideos] = useState([]); // state này để lấy các file name video hiện ra cho người ta thấy thôi
  const [imageUrl, setImageUrl] = useState([]); // state này để lấy các file ảnh
  const [videoUrl, setVideoUrl] = useState([]); // state này để lấy các file video
  const [content, setContent] = useState(""); // state này để lấy nội dung
  const [error, setError] = useState({
    videos: "",
    images: "",
  });
  let isLoadingAddBlog = useSelector((state) => state.blogSL.isLoadingAddBlog);

  function changeFileImg(e) {
    const file = e.target.files[0];
    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    const maxFileSize = 4 * 1024 * 1024; // 4MB
    let fileErrors = {};

    // Kiểm tra file tồn tại
    if (!file) return;

    // Kiểm tra định dạng file
    if (!validFormats.includes(file.type)) {
      fileErrors.images =
        "Chỉ được tải lên các file ảnh định dạng JPEG, PNG hoặc JPG!";
    }

    // Kiểm tra kích thước file
    if (file.size > maxFileSize) {
      fileErrors.images = "Kích thước file không được vượt quá 4MB!";
    }

    // Kiểm tra số lượng file
    if (imageUrl.length >= 3) {
      fileErrors.images = "Chỉ được tải lên tối đa 3 hình ảnh!";
    }

    // Nếu có lỗi
    if (Object.keys(fileErrors).length > 0) {
      setError((prev) => ({ ...prev, ...fileErrors }));
      return;
    }

    // Nếu không có lỗi
    setError((prev) => ({ ...prev, images: "" }));
    setNamesImg([...namesImg, file.name]);
    setImageUrl([...imageUrl, file]);
  }

  function changeFileVideo(e) {
    const file = e.target.files[0];
    const validFormats = ["video/mp4", "video/mkv"];
    const maxFileSize = 50 * 1024 * 1024; // 50MB
    let fileErrors = {};

    // Kiểm tra file tồn tại
    if (!file) return;

    if (videoUrl.length >= 1) {
      fileErrors.videos = "Chỉ được chọn tối đa 1 video!";
    }

    // Kiểm tra định dạng file
    if (!validFormats.includes(file.type)) {
      fileErrors.videos =
        "Chỉ được tải lên các file video định dạng MP4 hoặc MKV!";
    }

    // Kiểm tra kích thước file
    if (file.size > maxFileSize) {
      fileErrors.videos = "Kích thước file không được vượt quá 50MB!";
    }

    // Nếu có lỗi
    if (Object.keys(fileErrors).length > 0) {
      setError((prev) => ({ ...prev, ...fileErrors }));
      return;
    }

    // Nếu không có lỗi
    setError((prev) => ({ ...prev, videos: "" }));
    setNameVideos([...nameVideos, file.name]);
    setVideoUrl([...videoUrl, file]);
  }

  // Hàm kiểm tra điểm SEO cơ bản
  function checkSeo(title, content) {
    if (!title || !content) {
      setSeoScore(0);
      setSeoSuggestions(["Vui lòng nhập tiêu đề và nội dung trước khi kiểm tra SEO."]);
      return;
    }

    let score = 0;
    let suggestions = [];

    // Kiểm tra độ dài tiêu đề
    if (title.length < 50 || title.length > 60) {
      suggestions.push("Tiêu đề nên có độ dài từ 50 đến 60 ký tự.");
    } else {
      score += 20;
    }

    // Kiểm tra từ khóa trong tiêu đề
    if (!title.toLowerCase().includes("blog")) {
      suggestions.push("Tiêu đề nên chứa từ khóa chính (ví dụ: 'blog').");
    } else {
      score += 20;
    }

    // Kiểm tra độ dài nội dung
    if (content.length < 300) {
      suggestions.push("Nội dung nên có ít nhất 300 từ.");
    } else {
      score += 40;
    }

    // Kiểm tra hình ảnh
    if (imageUrl.length === 0) {
      suggestions.push(
        "Nên thêm ít nhất một hình ảnh để tăng chất lượng bài viết."
      );
    } else {
      score += 20;
    }

    setSeoScore(score);
    setSeoSuggestions(suggestions);
  }



  function handleAddBlog(data) {
    let { title, author } = data;
    checkSeo(title, content); // Gọi kiểm tra SEO trước khi gửi dữ liệu
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);

    // Duyệt qua mảng hình ảnh và thêm từng file vào FormData
    imageUrl.forEach((image) => {
      formData.append(`imageUrl`, image);
    });

    // Duyệt qua mảng video và thêm từng file vào FormData
    videoUrl.forEach((video) => {
      formData.append(`videoUrl`, video);
    });

    // dispatch(createBlog(formData));
    // setPopupVisible(false);

    if (seoScore >= 80) {
      // Chỉ cho phép gửi dữ liệu nếu điểm SEO >= 80
      dispatch(createBlog(formData));
      setPopupVisible(false);
    } else {
      alert("Điểm SEO không đủ. Vui lòng cải thiện nội dung trước khi gửi.");
    }
  }

  // useEffect này để theo dõi dữ liệu nhập đủ chưa mới cho submit
  // Watch các trường quan trọng để kích hoạt nút submit
  useEffect(() => {
    const [title, author] = watch(["title", "author"]);

    if (title && content && author && namesImg.length === 3 && nameVideos.length === 1) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(true);
    }

    // Chỉ gọi hàm checkSeo nếu có tiêu đề và nội dung
    if (title || content) {
      checkSeo(title, content);
    }
  }, [watch(["title", "author"]), content, namesImg, nameVideos]);



  return (
    <>
      <div className={`${isPopupVisible ? "overlay-admin" : ""}`}>
        <div
          className={`box-popop-addtour ${isPopupVisible ? "showPopup-addtour" : "nonePopup-addtour"
            }`}
        >
          <form onSubmit={handleSubmit(handleAddBlog)}>
            <div className="mb-3">
              <div className="row">
                <div className="col">
                  <label htmlFor="">Tên Blog</label>
                  <input
                    {...register("title", { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="Tên Blog"
                  />
                </div>
                <div className="col">
                  <label htmlFor="">Tác giả</label>
                  <input
                    {...register("author", { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="Tác giả"
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Nội dung
              </label>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
                name=""
                id=""
                placeholder="Nội dung thông tin của blog.."
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Chọn ảnh (Tối đa 3)
              </label>
              <input
                onChange={(e) => changeFileImg(e)}
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              />
              {error.images && <p className="text-danger">{error.images}</p>}
              <ul className="ul-image-manager">
                {namesImg.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <label htmlFor="formFileMultiple" className="form-label">
                Video Blog
              </label>
              <input
                onChange={(e) => changeFileVideo(e)}
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
              />
              {error.videos && <p className="text-danger">{error.videos}</p>}
              <ul className="ul-image-manager">
                {nameVideos.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="seo-score">
              <p>Điểm SEO: {seoScore}</p>
              <ul>
                {seoSuggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>

            <div className="flex-btn-add">
              <input
                type="button"
                onClick={handlePopup}
                value="Đóng"
                className="btn btn-primary back"
              />
              <input
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitEnabled}
              />
            </div>
          </form>
        </div>
      </div>

      {isLoadingAddBlog && (
        <div className="overlay-await-addTour">
          <div className="loaderAddTour"></div>
          <span className="span-addTour"> Vui lòng đợi ...</span>
        </div>
      )}

      <Button
        onClick={handlePopup}
        className="btn-add-manager"
        variant="contained"
      >
        Thêm Mới
      </Button>
    </>
  );
};

export default AddBlog;
