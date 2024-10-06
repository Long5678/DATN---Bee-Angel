import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { createTour } from "../../../../../redux/action_thunk";
import "../../../../../publics/styles/style-admin/admin.scss"
import TourPlaneAdmin from "./tourPlaneAdmin";

function Add_TourManger() {
    let dispatch = useDispatch()
    let danhMucDatas = useSelector((state) => state.danhMucSL.danhMucDatas)
    let isLoadingAddTour = useSelector((state) => state.tourSL.isLoadingAddTour)
    const [isPopupVisible, setPopupVisible] = useState(false); // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(true); // State này để quản lý nút submit
    function handlePopup() {
        setPopupVisible(!isPopupVisible);
    }
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [namesImg, setNamesImg] = useState([]) // state này lưu trữ các tên ảnh để list ra li
    const [images, setImages] = useState([]) // state này để lấy các file ảnh
    const [videos, setVideos] = useState([]) // state này để lấy các file video
    const [nameVideos, setNameVideos] = useState([]) // state này để lấy các file name video hiện ra cho người ta thấy thôi
    const [status, setStatus] = useState("Còn tour") // state này để lấy status
    const [type, setType] = useState(null) // state này để lấy mã loại 
    const [description, setDescription] = useState("") // state này để lấy mô tả 
    const [checkBtn, setCheckBtn] = useState(true) //state này để ẩn hiên phần add tour với add tour plane
    const [planes, setPlanes] = useState([{ title: "", description: "", ul_lists: [""] }]);
    const [dateTour, setDateTour] = useState([]); // state này là để lấy lịch trình những ngày tour đó sẽ đi

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
        setNameVideos([
            ...nameVideos,
            e.target.files[0].name
        ])
    }

    function handleAddTour(data) {
        let { name, price, location } = data

        console.log(name, images, videos, description, price, location, type, status, planes, dateTour);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("location", location);
        formData.append("type", type);
        formData.append("status", status);
        // Chuyển đổi planes thành chuỗi JSON
        formData.append("planes", JSON.stringify(planes));
        dateTour.forEach((date) => {
            formData.append(`dateTour`, date);
        });

        // Duyệt qua mảng hình ảnh và thêm từng file vào FormData
        images.forEach((image) => {
            formData.append(`images`, image);
        });

        // Duyệt qua mảng video và thêm từng file vào FormData
        videos.forEach((video) => {
            formData.append(`videos`, video);
        });
        dispatch(createTour(formData))
        // setPopupVisible(false)
    }

    // Theo dõi thay đổi của isLoadingAddTour
    useEffect(() => {
        if (!isLoadingAddTour) { // Kiểm tra khi quá trình thêm hoàn tất và thành công
            setPopupVisible(false); // Đóng popup
        }
    }, [isLoadingAddTour]);

    // useEffect này để theo dõi dữ liệu nhập đủ chưa mới cho submit
    // Watch các trường quan trọng để kích hoạt nút submit
    const formValues = watch(["name", "price", "location"]);
    useEffect(() => {
        const [name, price, location] = formValues;
        if (name && price && location && namesImg.length == 3 && nameVideos.length == 1 && type && description && planes.length >= 1 && dateTour.length >= 3) {
            setIsSubmitEnabled(false)
        } else {
            setIsSubmitEnabled(true)
        }
    }, [formValues, namesImg, nameVideos, type, description, planes, dateTour])

    return <>
        <div className={`${isPopupVisible ? "overlay-admin" : ""}`}>
            <div className={`box-popop-addtour ${isPopupVisible ? 'showPopup-addtour' : 'nonePopup-addtour'}`}>

                {/* <div className="loaderAdd"></div> */}
                <div className="btns-change-tour">
                    <div onClick={() => setCheckBtn(true)} className={`btn-thongTin ${checkBtn && "active-color-addTour"}`} >Thông Tin</div>
                    <div onClick={() => setCheckBtn(false)} className={`btn-plane ${!checkBtn && "active-color-addTour"}`}>Tour Plane</div>
                </div>

                <div className="line-addTour"
                    style={{
                        transform: checkBtn ? 'translateX(0)' : 'translateX(100%)', marginBottom: "5px"
                    }}></div>

                <form onSubmit={handleSubmit(handleAddTour)} >
                    {checkBtn ?
                        <>
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
                                <label htmlFor="formFileMultiple" className="form-label">Chọn ảnh (Tối đa 3)</label>
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
                                <ul className="ul-image-manager">
                                    {nameVideos.map((name, index) => (
                                        <li key={index}>{name}</li>
                                    ))}
                                </ul>
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
                                            <option value="" disabled selected hidden>Chọn danh mục</option>
                                            {danhMucDatas.map((item, index) => {
                                                return <option key={index} value={item._id}>{item.name}</option>
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
                        </>

                        :
                        <TourPlaneAdmin planes={planes} setPlanes={setPlanes} dateTour={dateTour} setDateTour={setDateTour} />
                    }

                    <div className="flex-btn-add">
                        <input type="button" onClick={handlePopup} value="Đóng" className="btn btn-primary back" />
                        <input type="submit" className="btn btn-primary" disabled={isSubmitEnabled} />
                    </div>
                </form>

            </div>
        </div>

        {
            isLoadingAddTour && <div className="overlay-await-addTour">
                <div className="loaderAddTour">
                </div>
                <span className="span-addTour"> Vui lòng đợi ...</span>
            </div>
        }

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