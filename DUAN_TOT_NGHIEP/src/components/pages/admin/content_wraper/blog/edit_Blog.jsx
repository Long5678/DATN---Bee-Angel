import  { useContext, useState, useEffect } from "react";
import { PopupContext } from "../../../../../context/popupContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updatePostBlog } from "../../../../../redux/action_thunk";
const EditBlog = () => {
  let dispatch = useDispatch();
  const [isPopupVisible, setPopupVisible] = useState(false); // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [views, setViews] = useState("");
  const { isPopupEdit, handlePopupEdit } = useContext(PopupContext);
  const blogOne = useSelector((state) => state.blogSL.blogOne);
  const [namesImg, setNamesImg] = useState([]); // state này lưu trữ các tên ảnh để list ra li
  const [imageUrl, setImageUrl] = useState([]);
  const [videoUrl, setVideoUrl] = useState([]); // state này để lấy các file video

  function changeFileImg(e) {
    // hàm này để lấy file ảnh
    setNamesImg([...namesImg, e.target.files[0].name]);
    setImageUrl([...imageUrl, e.target.files[0]]);
  }

  function changeFileVideo(e) {
    // hàm này để lấy file video
    setVideoUrl([...videoUrl, e.target.files[0]]);
  }
  useEffect(() => {
    if (blogOne) {
      setContent(blogOne.content || "");
      setTitle(blogOne.title || "");
      setAuthor(blogOne.author || "");
      setDatePosted(blogOne.datePosted || "");
      setViews(blogOne.views || "");
    }
  }, [blogOne]);

  function updateBlog() {
    console.log(title, imageUrl, videoUrl, author, content, datePosted, views);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("datePosted", datePosted);
    formData.append("views", views);

    // Duyệt qua mảng hình ảnh và thêm từng file vào FormData
    imageUrl.forEach((image) => {
      formData.append(`imageUrl`, image);
    });

    // Duyệt qua mảng video và thêm từng file vào FormData
    videoUrl.forEach((video) => {
      formData.append(`videoUrl`, video);
    });
    dispatch(updatePostBlog(blogOne._id,formData));
    setPopupVisible(false);
  }
  return (
    <>
      <div className={`${isPopupEdit ? "overlay-admin" : ""}`}>
        <div className={`box-popop ${isPopupEdit ? "showPopup" : "nonePopup"}`}>
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
            <label htmlFor="">Ngày đăng</label>
            <input
              type="date"
              className="form-control"
              placeholder="Ngày đăng"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">
              Chọn ảnh (Tối đa 5)
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
              onChange={(e) => changeFileImg(e)}
            />
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
          </div>

          <div className="mb-3">
            <label htmlFor="">Views</label>
            <input
              type="number"
              className="form-control"
              placeholder="Views"
              onChange={(e) => setViews(e.target.value)}
              value={views}
            />
          </div>

          <div className="flex-btn-add">
            <input
              type="button"
              onClick={handlePopupEdit}
              value="Đóng"
              className="btn btn-primary back"
            />
            <input
              onClick={updateBlog}
              type="button"
              className="btn btn-primary"
              value="Cập nhật"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
