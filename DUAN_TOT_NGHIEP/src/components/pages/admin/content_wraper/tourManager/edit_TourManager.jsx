import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import TourPlaneAdmin from "./tourPlaneAdmin";
import { PopupContext } from "../../../../../context/popupContext";
import { updateTour } from "../../../../../redux/action_thunk";

function Edit_TourManager() {
    let dispatch = useDispatch()
    let danhMucDatas = useSelector((state) => state.danhMucSL.danhMucDatas);
    let tourOne = useSelector((state) => state.tourSL.tourOne)
    let isLoadingAddTour = useSelector((state) => state.tourSL.isLoadingAddTour)
    const { isPopupEditTour, setPopupEditTour } = useContext(PopupContext) // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(true); // State này để quản lý nút submit
    function handlePopup() {
        setPopupEditTour(!isPopupEditTour);
    }
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [namesImg, setNamesImg] = useState([]) // state này lưu trữ các tên ảnh để list ra li
    const [images, setImages] = useState([]) // state này để lấy các file ảnh
    const [videos, setVideos] = useState([]) // state này để lấy các file video
    const [nameVideos, setNameVideos] = useState([]) // state này để lấy các file name video hiện ra cho người ta thấy thôi
    const [status, setStatus] = useState("Còn tour") // state này để lấy status
    const [type, setType] = useState(null) // state này để lấy mã loại 
    const [description, setDescription] = useState("") // state này để lấy mô tả 
    const [checkBtn, setCheckBtn] = useState(true)
    const [planes, setPlanes] = useState([{ title: "", description: "", ul_lists: [""] }]);
    const [existingImages, setExistingImages] = useState([]); // Danh sách ảnh cũ
    const [dateTour, setDateTour] = useState([]); // state này là để lấy lịch trình những ngày tour đó sẽ đi

    // kiểu khi nhấn edit thì hiện dữ liệu lên
    useEffect(() => {
        if (tourOne) {
            setName(tourOne.name || "")
            setPrice(tourOne.price || "")
            setLocation(tourOne.location || "")
            setImages(tourOne.images || [])
            setVideos(tourOne.videos || [])
            setStatus(tourOne.status || "Còn tour")
            setType(tourOne.type || null)
            setDescription(tourOne.description || "")
            setPlanes(tourOne.planes || [{ title: "", description: "", ul_lists: [""] }])
            setNamesImg(tourOne.images || [])
            setNameVideos(tourOne.videos || [])
            setExistingImages(tourOne.images || [])
            setDateTour(tourOne.dateTour || [])
        }
    }, [tourOne])

    console.log("existingImages", existingImages);
    

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

    // Hàm xóa phần tử theo index
    function removeStateImg(index ,name) {
        const updatedNameimg = namesImg.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
        const updatedImages = images.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
        setImages(updatedImages); // Cập nhật lại state
        setNamesImg(updatedNameimg); // Cập nhật lại state

        setExistingImages(existingImages.filter(img => img !== name)); // Xóa ảnh mà người dùng muốn xóa
    }

    function removeStateVideo(index) {
        const updatedNameVideo = nameVideos.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
        const updatedVideos = videos.filter((_, i) => i !== index); // Lọc bỏ phần tử tại index
        setVideos(updatedVideos); // Cập nhật lại state
        setNameVideos(updatedNameVideo); // Cập nhật lại state
    }

    function handleUpdateTour() {
        console.log(name, images, videos, description, price, location, type, status, planes, existingImages);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("location", location);
        formData.append("type", type);
        formData.append("status", status);
        // Chuyển đổi planes thành chuỗi JSON
        formData.append("planes", JSON.stringify(planes));
        // Gửi danh sách ảnh cũ còn lại (sau khi xóa) qua req.body
        formData.append('existingImages', JSON.stringify(existingImages));
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
        dispatch(updateTour(tourOne._id,formData))
    }

    // Theo dõi thay đổi của isLoadingAddTour
    useEffect(() => {
        if (!isLoadingAddTour) { // Kiểm tra khi quá trình thêm hoàn tất và thành công
            setPopupEditTour(false); // Đóng popup
        }
    }, [isLoadingAddTour]);

    // useEffect này để theo dõi dữ liệu nhập đủ chưa mới cho submit
    useEffect(() => {
        if (name && price && location && namesImg.length == 3 && nameVideos.length == 1 && type && description && planes.length >= 1 && dateTour.length >= 3) {
            setIsSubmitEnabled(false)
        } else {
            setIsSubmitEnabled(true)
        }
    }, [name, price, location, namesImg, nameVideos, type, description, planes, dateTour])

    return <>
        <div className={`${isPopupEditTour ? "overlay-admin" : ""}`}>
            <div className={`box-popop-addtour ${isPopupEditTour ? 'showPopup-addtour' : 'nonePopup-addtour'}`}>

                {/* <div className="loaderAdd"></div> */}
                <div className="btns-change-tour">
                    <div onClick={() => setCheckBtn(true)} className={`btn-thongTin ${checkBtn && "active-color-addTour"}`} >Thông Tin</div>
                    <div onClick={() => setCheckBtn(false)} className={`btn-plane ${!checkBtn && "active-color-addTour"}`} >Tour Plane</div>
                </div>

                <div className="line-addTour"
                    style={{
                        transform: checkBtn ? 'translateX(0)' : 'translateX(100%)', marginBottom: "5px"
                    }}></div>

                <form  >
                    {checkBtn ?
                        <>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Tên Tour</label>
                                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Tên Tour" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Giá Tour</label>
                                        <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" className="form-control" placeholder="Giá" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFileMultiple" className="form-label">Chọn ảnh (Tối đa 3)</label>
                                <input onChange={(e) => changeFileImg(e)} className="form-control" type="file" id="formFileMultiple" multiple />
                                <ul className="ul-image-manager">
                                    {namesImg.map((name, index) => (
                                        <li key={index}>{name}
                                            <span className="span-close" onClick={() => removeStateImg(index ,name)}>
                                                <i className="fa-regular fa-circle-xmark"></i>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFileMultiple" className="form-label">Video Tour</label>
                                <input onChange={(e) => changeFileVideo(e)} className="form-control" type="file" id="formFileMultiple" multiple />
                                <ul className="ul-image-manager">
                                    {nameVideos.map((name, index) => (
                                        <li key={index}>{name}
                                            <span className="span-close" onClick={() => removeStateVideo(index)}>
                                                <i className="fa-regular fa-circle-xmark"></i>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Location</label>
                                        <input onChange={(e) => setLocation(e.target.value)} value={location} type="text" className="form-control" placeholder="Dia điểm Tour" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Loại Tour</label>
                                        <select onChange={(e) => setType(e.target.value)} value={type} className="form-select" aria-label="Default select example">
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
                                <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-select" aria-label="Default select example">
                                    <option value="Còn tour">Còn tour</option>
                                    <option value="Sắp hết">Sắp hết</option>
                                    <option value="Hết tour">Hết tour</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFileMultiple" className="form-label">Mô tả</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" name="" id="" placeholder="Mô tả thông tin của tour.." />
                            </div>
                        </>

                        :
                        <TourPlaneAdmin planes={planes} setPlanes={setPlanes} dateTour={dateTour} setDateTour={setDateTour} />
                    }

                    <div className="flex-btn-add">
                        <input type="button" onClick={handlePopup} value="Đóng" className="btn btn-primary back" />
                        <input type="button" onClick={handleUpdateTour} disabled={isSubmitEnabled} className="btn btn-primary" value="Cập nhật" />
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
    </>
}

export default Edit_TourManager