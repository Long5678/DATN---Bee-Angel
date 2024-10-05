import { useState } from "react";
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { createBlog } from "../../../../../redux/action_thunk";
const AddBlog = () => {
    let dispatch = useDispatch()
    const [isPopupVisible, setPopupVisible] = useState(false); // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
    function handlePopup() {
        setPopupVisible(!isPopupVisible);
    }
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [namesImg, setNamesImg] = useState([]) // state này lưu trữ các tên ảnh để list ra li
    const [imageUrl, setImageUrl] = useState([]) // state này để lấy các file ảnh
    const [videoUrl, setVideoUrl] = useState([]) // state này để lấy các file video
    const [content, setContent] = useState("") // state này để lấy nội dung
    function changeFileImg(e) { // hàm này để lấy file ảnh
        setNamesImg([
            ...namesImg,
            e.target.files[0].name
        ]);
        setImageUrl([
            ...imageUrl,
            e.target.files[0]
        ])
    }

    function changeFileVideo(e) {// hàm này để lấy file video
        setVideoUrl([
            ...videoUrl,
            e.target.files[0]
        ])
    }
    function handleAddTour(data) {
        let { title, author, datePosted, views } = data
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
        dispatch(createBlog(formData))
        setPopupVisible(false)
    }
  return <>
   <div className={`${isPopupVisible ? "overlay-admin" : ""}`}>
            <div className={`box-popop-addtour ${isPopupVisible ? 'showPopup-addtour' : 'nonePopup-addtour'}`}>
                <form onSubmit={handleSubmit(handleAddTour)}>
                    <div className="mb-3">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Tên Blog</label>
                                <input {...register("title", { required: true })} type="text" className="form-control" placeholder="Tên Blog" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Tác giả</label>
                                <input {...register("author", { required: true })} type="text" className="form-control" placeholder="Tác giả" />
                    </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Nội dung</label>
                        <textarea onChange={(e) => setContent(e.target.value)}  className="form-control" name="" id="" placeholder="Nội dung thông tin của blog.."></textarea>
                          </div>

                    <div className="mb-3">
                        <label htmlFor="">Ngày đăng</label>
                        <input {...register("datePosted", { required: true })} type="date" className="form-control" placeholder="Ngày đăng" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Chọn ảnh (Tối đa 5)</label>
                        <input onChange={(e) => changeFileImg(e)} className="form-control" type="file" id="formFileMultiple" multiple />
                        <ul className="ul-image-manager">
                            {namesImg.map((name, index) => (
                                <li key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Video Blog</label>
                        <input onChange={(e) => changeFileVideo(e)} className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="">Views</label>
                        <input {...register("views", { required: true })} type="number" className="form-control" placeholder="Views" />
                    </div>


                    <div className="flex-btn-add">
                        <input type="button" onClick={handlePopup} value="Đóng" className="btn btn-primary back" />
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>

        <Button onClick={handlePopup} className="btn-add-manager" variant="contained">Thêm Mới</Button>

  </>
}

export default AddBlog