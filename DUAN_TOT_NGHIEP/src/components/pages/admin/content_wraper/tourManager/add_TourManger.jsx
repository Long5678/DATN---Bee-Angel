import { useState } from "react";
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { createTour } from "../../../../../redux/action_thunk";

function Add_TourManger() {
    let dispatch = useDispatch()
    let danhMucDatas = useSelector((state) => state.danhMucSL.danhMucDatas)
    const [isPopupVisible, setPopupVisible] = useState(false); // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
    function handlePopup() {
        setPopupVisible(!isPopupVisible);
    }
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [namesImg, setNamesImg] = useState([]) // state này lưu trữ các tên ảnh để list ra li
    const [images, setImages] = useState([]) // state này để lấy các file ảnh
    const [videos, setVideos] = useState([]) // state này để lấy các file video
    const [status, setStatus] = useState("Còn tour") // state này để lấy status
    const [type, setType] = useState(null) // state này để lấy mã loại 
    const [description, setDescription] = useState("") // state này để lấy mô tả 

    function changeFileImg(e) { // hàm này để lấy file ảnh
        setNamesImg([
            ...namesImg,
            e.target.files[0].name
        ]);
        setImages([
            ...images,
            e.target.files[0]
        ])
    }

    function changeFileVideo(e) {// hàm này để lấy file video
        setVideos([
            ...videos,
            e.target.files[0]
        ])
    }

    function handleAddTour(data) {
        let { name, price, location } = data
        console.log(name, images, videos, description, price,location, type, status);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("location", location);
        formData.append("type", type);
        formData.append("status", status);

        // Duyệt qua mảng hình ảnh và thêm từng file vào FormData
        images.forEach((image) => {
            formData.append(`images`, image);
        });

        // Duyệt qua mảng video và thêm từng file vào FormData
        videos.forEach((video) => {
            formData.append(`videos`, video);
        });
        dispatch(createTour(formData))
        setPopupVisible(false)
    }

    
    return <>
        <div className={`${isPopupVisible ? "overlay-admin" : ""}`}>
            <div className={`box-popop-addtour ${isPopupVisible ? 'showPopup-addtour' : 'nonePopup-addtour'}`}>
                <form onSubmit={handleSubmit(handleAddTour)} >
                    <div className="mb-3">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Tên Tour</label>
                                <input {...register("name", { required: true })} type="text" className="form-control" placeholder="Tên Tour" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Giá Tour</label>
                                <input {...register("price", { required: true })} type="text" className="form-control" placeholder="Giá" />
                            </div>
                        </div>
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
                        <label htmlFor="formFileMultiple" className="form-label">Video Tour</label>
                        <input onChange={(e) => changeFileVideo(e)} className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>

                    <div className="mb-3">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="">Location</label>
                                <input {...register("location", { required: true })} type="text" className="form-control" placeholder="Dia điểm Tour" />
                            </div>
                            <div className="col">
                                <label htmlFor="">Loại Tour</label>
                                <select onChange={(e) => setType(e.target.value)} className="form-select" aria-label="Default select example">
                                    {danhMucDatas.map((item, index) => {
                                        return <option key={index} value={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Trạng thái Tour</label>
                        <select onChange={(e) => setStatus(e.target.value)} className="form-select" aria-label="Default select example">
                            <option value="Còn tour">Còn tour</option>
                            <option value="Sắp hết">Sắp hết</option>
                            <option value="Hết tour">Hết tour</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Mô tả</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" name="" id="" placeholder="Mô tả thông tin của tour.."></textarea>
                    </div>

                    <div className="flex-btn-add">
                        <input type="button" onClick={handlePopup} value="Đóng" className="btn btn-primary back" />
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>

        <Button onClick={handlePopup} className="btn-add-manager" variant="contained">Thêm Mới</Button>

        {/* <div className="box-tour-manager">
            <form action=""> */}
        {/* <input onChange={(e) => changeFile(e)} type="file" id="fileInput" accept="image/*" multiple />
                <ul id="fileList">
                    {namesImg.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul> */}
        {/* </form>
        </div> */}
    </>
}

export default Add_TourManger