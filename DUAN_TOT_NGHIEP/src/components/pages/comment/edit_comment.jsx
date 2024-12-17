import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment, getCommentByID } from "../../../redux/thunk/comment_thunk";
import { AuthContext } from "../../../context/authContext";

const UpdateCommentForm = ({ commentId, initialText, imagesUrl, onCancel, tourId }) => {
    const dispatch = useDispatch();
    const commentsOne = useSelector((state) => state.CommentSL?.commentOne);
    const { user } = useContext(AuthContext)
    const [updateText, setUpdateText] = useState(initialText);
    const [namesImg, setNamesImg] = useState([]); // tên ảnh mới để list ra trong UI

    const [images, setImages] = useState([]); // file ảnh mới
    const [imagePreviews, setImagePreviews] = useState([]); // URL xem trước ảnh mới
    const [existingImages, setExistingImages] = useState(imagesUrl); // URL hình ảnh đã tồn tại
    const [errors, setErrors] = useState({
        commentText: "",
        images: "",
    });

    // Lấy bình luận theo ID và thiết lập dữ liệu khi mở form cập nhật
    useEffect(() => {
        const fetchCommentData = async () => {
            const data = await dispatch(getCommentByID(commentId));
            console.log(data);

            if (data && data.image) {
                setExistingImages(data.image); // Lấy URL của ảnh hiện có từ API
            }
        };
        fetchCommentData();
    }, [commentId, dispatch]);

    // Hàm xử lý chọn ảnh mới và tạo URL xem trước
    function changeFileImg(e) {
        const file = e.target.files[0];
        let fileErrors = {};
    
        if (file) {
            const validFormats = ["image/jpeg", "image/png", "image/jpg"];
            if (!validFormats.includes(file.type)) {
                fileErrors.images = "Chỉ được tải lên các file ảnh định dạng JPEG, PNG hoặc JPG!";
            } else if (file.size > 2 * 1024 * 1024) {
                fileErrors.images = "Kích thước file không được vượt quá 2MB!";
            } else if (images.length + existingImages.length >= 4) {
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
    
            // Nếu không có lỗi, thêm ảnh mới
            setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
            setNamesImg([...namesImg, file.name]);
            setImages([...images, file]);
            setImagePreviews([...imagePreviews, URL.createObjectURL(file)]);
        }
    }
    

    // Hàm xóa phần tử theo index
    function removeStateImg(index, name) {
        setNamesImg(namesImg.filter((_, i) => i !== index));
        setImages(images.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
        setExistingImages(existingImages.filter((img) => img !== name));
    }

    // Hàm cập nhật bình luận
    const handleUpdate = () => {
        let formErrors = {};

        // Kiểm tra nội dung bình luận
        if (!updateText.trim()) {
            formErrors.updateText = "Nội dung bình luận không được để trống!";
        }

        // Kiểm tra số lượng ảnh
        if (images.length + existingImages.length > 4) {
            formErrors.images = "Chỉ được tải lên tối đa 4 hình ảnh!";
        }

        // Nếu có lỗi, cập nhật state và dừng gửi dữ liệu
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Nếu không có lỗi, xóa lỗi và gửi dữ liệu
        setErrors({});
        const formData = new FormData();
        formData.append("commentId", commentId); // Thêm ID của comment vào formData
        formData.append('content', updateText);
        formData.append('userID', user._id);
        formData.append('tourId', tourId);
        formData.append('existingImages', JSON.stringify(existingImages));

        // Duyệt qua mảng hình ảnh và thêm từng file vào FormData
        images.forEach((image) => {
            formData.append('image', image);
        });

        dispatch(editComment(commentId, formData));
        console.log(formData);

        onCancel(); // Đóng form sau khi cập nhật
    };


    return (
        <div className="reply-form">
            <textarea
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                placeholder="Viết phản hồi của bạn tại đây..."
                rows="2"
            ></textarea>
            {errors.updateText && (
                <p style={{ color: "red", marginBottom: "10px" }}>{errors.updateText}</p>
            )}

            <label className="custom-file-upload">
                Chọn ảnh (tối đa 4 ảnh)
                <input type="file" onChange={(e) => changeFileImg(e)} />
            </label>
            {errors.images && (
                <p style={{ color: "red", marginBottom: "10px" }}>{errors.images}</p>
            )}

            {imagesUrl &&
                <ul>
                    {/* Hiển thị ảnh đã tồn tại */}
                    {existingImages.map((image, index) => (
                        <li key={index}>
                            <img
                                src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/comments%2F${image}?alt=media`}
                                width="50"
                            />
                            <button
                                className="reply-btn"
                                onClick={() => removeStateImg(index, image)}
                            >
                                Xóa
                            </button>
                        </li>
                    ))}
                    {/* Hiển thị ảnh mới xem trước */}
                    {imagePreviews.map((preview, index) => (
                        <li key={index}>
                            <img src={preview} width="50" />
                            <button
                                className="reply-btn"
                                onClick={() => removeStateImg(index, namesImg[index])}
                            >
                                Xóa
                            </button>
                        </li>
                    ))}
                </ul> }
         

            <button className="submit-btn repli" onClick={handleUpdate}>
                Cập nhật
            </button>
        </div>
    );
};

export default UpdateCommentForm;
