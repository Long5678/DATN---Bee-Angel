import { useContext, useState, useEffect } from "react";
import { PopupContext } from "../../../../../context/popupContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePostBlog } from "../../../../../redux/action_thunk";
const EditBlog = () => {
  let dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { isPopupEditBlog, setPopupEditBlog } = useContext(PopupContext);
  function handlePopup() {
    setPopupEditBlog(!isPopupEditBlog);
  }
  const blogOne = useSelector((state) => state.blogSL.blogOne);
  const [namesImg, setNamesImg] = useState([]); // state này lưu trữ các tên ảnh để list ra li
  const [imageUrl, setImageUrl] = useState([]);
  const [videoUrl, setVideoUrl] = useState([]); // state này để lấy các file video
  const [nameVideos, setNameVideos] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true); // State này để quản lý nút submit
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState({
    videos: "",
    images: "",
  });

  let isLoadingAddBlog = useSelector((state) => state.blogSL.isLoadingAddBlog);
  const [seoScore, setSeoScore] = useState(0);
  const [seoSuggestions, setSeoSuggestions] = useState([]);

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

  // useEffect(() => {
  //   if (title && content) {
  //     let score = 0;
  //     let suggestions = [];

  //     // Check Title chứa từ khóa chính
  //     if (title.length > 5) {
  //       score += 40;
  //     } else {
  //       suggestions.push("Title nên chứa từ khóa chính và dài hơn 5 ký tự.");
  //     }

  //     // Check Content dài (>300 từ)
  //     const contentWordCount = content.split(" ").length;
  //     if (contentWordCount >= 300) {
  //       score += 30;
  //     } else {
  //       suggestions.push("Nội dung nên có ít nhất 300 từ.");
  //     }

  //     // Check mật độ từ khóa trong Content (10 từ khóa chính)
  //     const keyword = title.toLowerCase().trim();
  //     const keywordCount = content
  //       .toLowerCase()
  //       .split(" ")
  //       .filter((word) => word === keyword).length;
  //     if (keywordCount >= 5) {
  //       score += 20;
  //     } else {
  //       suggestions.push("Mật độ từ khóa chính nên xuất hiện nhiều hơn 5 lần.");
  //     }

  //     // Hình ảnh >=2 ảnh
  //     if (namesImg.length >= 2) {
  //       score += 5;
  //     } else {
  //       suggestions.push("Nên tải ít nhất 2 hình ảnh hợp lệ.");
  //     }

  //     if (nameVideos.length >= 1) {
  //       score += 5;
  //     } else {
  //       suggestions.push("Cần ít nhất một video hợp lệ.");
  //     }

  //     setSeoScore(score);
  //     setSeoSuggestions(suggestions);
  //   }
  // }, [title, content, namesImg, nameVideos]);

  function changeFileImg(e) {
    const file = e.target.files[0];
    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    const maxFileSize = 4 * 1024 * 1024; // 4MB
    let fileErrors = {};

    if (!file) return;

    if (!validFormats.includes(file.type)) {
      fileErrors.images =
        "Chỉ được tải lên các file ảnh định dạng JPEG, PNG hoặc JPG!";
    }

    if (file.size > maxFileSize) {
      fileErrors.images = "Kích thước file không được vượt quá 4MB!";
    }

    if (imageUrl.length >= 3) {
      fileErrors.images = "Chỉ được tải lên tối đa 3 hình ảnh!";
    }

    if (Object.keys(fileErrors).length > 0) {
      setError((prev) => ({ ...prev, ...fileErrors }));
      return;
    }

    setError((prev) => ({ ...prev, images: "" }));
    setNamesImg([...namesImg, file.name]);
    setImageUrl([...imageUrl, file]);
  }
  function changeFileVideo(e) {
    const file = e.target.files[0];
    const validFormats = ["video/mp4", "video/mkv"];
    const maxFileSize = 50 * 1024 * 1024; // 50MB
    let fileErrors = {};

    if (!file) return;
    // Kiểm tra nếu đã có video được chọn
    if (videoUrl.length >= 1) {
      fileErrors.videos = "Chỉ được chọn tối đa 1 video!";
    }

    if (!validFormats.includes(file.type)) {
      fileErrors.videos =
        "Chỉ được tải lên các file video định dạng MP4 hoặc MKV!";
    }

    if (file.size > maxFileSize) {
      fileErrors.videos = "Kích thước file không được vượt quá 50MB!";
    }

    if (Object.keys(fileErrors).length > 0) {
      setError((prev) => ({ ...prev, ...fileErrors }));
      return;
    }

    setError((prev) => ({ ...prev, videos: "" }));
    setNameVideos([...nameVideos, file.name]);
    setVideoUrl([...videoUrl, file]);
  }

  useEffect(() => {
    if (blogOne) {
      setContent(blogOne.content || "");
      setTitle(blogOne.title || "");
      setAuthor(blogOne.author || "");
      setNamesImg(blogOne.imageUrl || []);
      setNameVideos(blogOne.videoUrl || []);
      setExistingImages(blogOne.imageUrl || []);
      setImageUrl(blogOne.imageUrl || []);
      setVideoUrl(blogOne.videoUrl || []);
    }
  }, [blogOne]);

  function updateBlog() {
    console.log(title, imageUrl, videoUrl, author, content);
    checkSeo(title, content);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("existingImages", JSON.stringify(existingImages));
    // Duyệt qua mảng hình ảnh và thêm từng file vào FormData
    imageUrl.forEach((image) => {
      formData.append(`imageUrl`, image);
    });

    // Duyệt qua mảng video và thêm từng file vào FormData
    videoUrl.forEach((video) => {
      formData.append(`videoUrl`, video);
    });
    // dispatch(updatePostBlog(blogOne._id, formData));

    if (seoScore >= 80) {
          // Chỉ cho phép gửi dữ liệu nếu điểm SEO >= 80
         dispatch(updatePostBlog(blogOne._id, formData));
          setPopupEditBlog(false);
        } else {
          alert("Điểm SEO không đủ. Vui lòng cải thiện nội dung trước khi gửi.");
        }
  }

  // Hàm xóa phần tử theo index
  function removeStateImg(index, name) {
    const updatedNameimg = namesImg.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
    const updatedImages = imageUrl.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
    setImageUrl(updatedImages); // Cập nhật lại state
    setNamesImg(updatedNameimg); // Cập nhật lại state

    setExistingImages(existingImages.filter((img) => img !== name)); // Xóa ảnh mà người dùng muốn xóa
  }

  function removeStateVideo(index) {
    const updatedNameVideo = nameVideos.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
    const updatedVideos = videoUrl.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
    setVideoUrl(updatedVideos); // Cập nhật lại state
    setNameVideos(updatedNameVideo); // Cập nhật lại state
  }

  useEffect(() => {
    if (
      title &&
      content &&
      author &&
      namesImg.length === 3 &&
      nameVideos.length === 1
    ) {
      setIsSubmitEnabled(false); // Cho phép submit khi đủ điều kiện
    } else {
      setIsSubmitEnabled(true); // Không cho phép submit nếu thiếu điều kiện
    }

    // Chỉ gọi hàm checkSeo nếu có tiêu đề và nội dung
    if (title || content) {
      checkSeo(title, content);
    }
  }, [title, content, author, namesImg, nameVideos]);

  // Theo dõi thay đổi của isLoadingAddBlog
  useEffect(() => {
    if (!isLoadingAddBlog) {
      // Kiểm tra khi quá trình thêm hoàn tất và thành công
      setPopupEditBlog(false); // Đóng popup
    }
  }, [isLoadingAddBlog]);

  return (
    <>
      <div className={`${isPopupEditBlog ? "overlay-admin" : ""}`}>
        <div
          className={`box-popop ${isPopupEditBlog ? "showPopup" : "nonePopup"}`}
        >
          <div className="mb-3">
            <div className="row">
              <div className="col">
                <label htmlFor="">Tên Blog</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên Blog"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col">
                <label htmlFor="">Tác giả</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tác giả"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
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
              value={content}
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
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
              onChange={(e) => changeFileImg(e)}
            />
            {error.images && <p className="text-danger">{error.images}</p>}
            <ul className="ul-image-manager">
              {namesImg.map((name, index) => (
                <li key={index}>
                  {name}
                  <span
                    className="span-close"
                    onClick={() => removeStateImg(index, name)}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </span>
                </li>
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
                <li key={index}>
                  {name}
                  <span
                    className="span-close"
                    onClick={() => removeStateVideo(index)}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="seo-score">
            <p>
              <strong>Điểm SEO: {seoScore}</strong>
            </p>
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
              onClick={updateBlog}
              type="button"
              className="btn btn-primary"
              value="Cập nhật"
              disabled={isSubmitEnabled} // Nếu isSubmitEnabled là true, nút sẽ bị vô hiệu hóa
            />
          </div>
        </div>
      </div>
      {isLoadingAddBlog && (
        <div className="overlay-await-addTour">
          <div className="loaderAddTour"></div>
          <span className="span-addTour"> Vui lòng đợi ...</span>
        </div>
      )}
    </>
  );
};

export default EditBlog;
