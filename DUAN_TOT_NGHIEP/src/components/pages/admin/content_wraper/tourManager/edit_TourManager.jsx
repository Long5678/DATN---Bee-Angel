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
    const [price_Adult, setPrice_Adult] = useState(""); // State for Adult Price
    const [price_Children, setPrice_Children] = useState(""); // State for Children Price
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
    const [numDay, setNumDay] = useState(0) // state này chứa số lượng ngày 
    const [error, setError] = useState({
        videos: "",
        images: "",
    });

    // kiểu khi nhấn edit thì hiện dữ liệu lên
    useEffect(() => {
        if (tourOne) {
            setName(tourOne.name || "")
            setPrice(tourOne.price || "")
            setPrice_Adult(tourOne.price_Adult || ""); // Set Adult Price
            setPrice_Children(tourOne.price_Children || ""); // Set Children Price
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
            setNumDay(tourOne.numDay || 0)
        }
    }, [tourOne])

    console.log("existingImages", existingImages);


    function changeFileImg(e) {
        const file = e.target.files[0];
        const validFormats = ["image/jpeg", "image/png", "image/jpg"];
        const maxFileSize = 4 * 1024 * 1024; // 4MB
        let fileErrors = {};

        // Kiểm tra xem file có tồn tại không
        if (!file) {
            return;
        }

        // Kiểm tra định dạng file
        if (!validFormats.includes(file.type)) {
            fileErrors.images = "Chỉ được tải lên các file ảnh định dạng JPEG, PNG hoặc JPG!";
        }

        // Kiểm tra kích thước file
        if (file.size > maxFileSize) {
            fileErrors.images = "Kích thước file không được vượt quá 4MB!";
        }

        // Kiểm tra số lượng file đã tải lên
        if (images.length >= 3) {
            fileErrors.images = "Chỉ được tải lên tối đa 3 hình ảnh!";
        }

        // Nếu có lỗi, cập nhật state lỗi và dừng xử lý
        if (Object.keys(fileErrors).length > 0) {
            setError((prevErrors) => ({
                ...prevErrors,
                ...fileErrors,
            }));
            return;
        }

        // Nếu không có lỗi, thêm file vào danh sách
        setError((prevErrors) => ({ ...prevErrors, images: "" })); // Xóa lỗi nếu có
        setNamesImg([...namesImg, file.name]); // Lưu tên file
        setImages([...images, file]); // Lưu file vào danh sách
    }


    function changeFileVideo(e) {
        const file = e.target.files[0];
        const validFormats = ["video/mp4", "video/avi", "video/mkv"];
        const maxFileSize = 80 * 1024 * 1024; // 10MB
        let fileErrors = {};

        // Kiểm tra xem file có tồn tại không
        if (!file) {
            return;
        }

        // Kiểm tra định dạng file
        if (!validFormats.includes(file.type)) {
            fileErrors.videos = "Chỉ được tải lên các file video định dạng MP4, AVI hoặc MKV!";
        }

        // Kiểm tra kích thước file
        if (file.size > maxFileSize) {
            fileErrors.videos = "Kích thước file không được vượt quá 80MB!";
        }

        // Kiểm tra số lượng file đã tải lên
        if (videos.length >= 1) {
            fileErrors.videos = "Chỉ được tải lên tối đa 1 video!";
        }

        // Nếu có lỗi, cập nhật state lỗi và dừng xử lý
        if (Object.keys(fileErrors).length > 0) {
            setError((prevErrors) => ({
                ...prevErrors,
                ...fileErrors,
            }));
            return;
        }

        // Nếu không có lỗi, thêm file vào danh sách
        setError((prevErrors) => ({ ...prevErrors, videos: "" })); // Xóa lỗi nếu có
        setVideos([...videos, file]); // Lưu video vào danh sách
        setNameVideos([...nameVideos, file.name]); // Lưu tên file video
    }

    // Hàm xóa phần tử theo index
    function removeStateImg(index, name) {
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
        formData.append("price_Adult", price_Adult); // Add Adult Price
        formData.append("price_Children", price_Children); // Add Children Price
        // formData.append("location", location);
        formData.append("type", type);
        formData.append("status", status);
        // Chuyển đổi planes thành chuỗi JSON
        formData.append("planes", JSON.stringify(planes));
        formData.append("dateTour", JSON.stringify(dateTour));
        formData.append("numDay", numDay);
        // Gửi danh sách ảnh cũ còn lại (sau khi xóa) qua req.body
        formData.append('existingImages', JSON.stringify(existingImages));
        // dateTour.forEach((date) => {
        //     formData.append(`dateTour`, date);
        // });

        // Duyệt qua mảng hình ảnh và thêm từng file vào FormData
        images.forEach((image) => {
            formData.append(`images`, image);
        });

        // Duyệt qua mảng video và thêm từng file vào FormData
        videos.forEach((video) => {
            formData.append(`videos`, video);
        });
        dispatch(updateTour(tourOne._id, formData))
    }

    // Theo dõi thay đổi của isLoadingAddTour
    useEffect(() => {
        if (!isLoadingAddTour) { // Kiểm tra khi quá trình thêm hoàn tất và thành công
            setPopupEditTour(false); // Đóng popup
        }
    }, [isLoadingAddTour]);

    // useEffect này để theo dõi dữ liệu nhập đủ chưa mới cho submit
    useEffect(() => {
        if (name && price && namesImg.length == 3 && nameVideos.length == 1 && type && description && planes.length >= 1 && dateTour.length >= 3) {
            setIsSubmitEnabled(false)
        } else {
            setIsSubmitEnabled(true)
        }
    }, [name, price, price_Adult, price_Children, namesImg, nameVideos, type, description, planes, dateTour])

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
                                {/* Hiển thị lỗi hình ảnh */}
                                {error.images && (
                                    <p className="text-danger">{error.images}</p>
                                )}
                                <ul className="ul-image-manager">
                                    {namesImg.map((name, index) => (
                                        <li key={index}>{name}
                                            <span className="span-close" onClick={() => removeStateImg(index, name)}>
                                                <i className="fa-regular fa-circle-xmark"></i>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFileMultiple" className="form-label">Video Tour</label>
                                <input onChange={(e) => changeFileVideo(e)} className="form-control" type="file" id="formFileMultiple" multiple />
                                {/* Hiển thị lỗi video */}
                                {error.videos && (
                                    <p className="text-danger">{error.videos}</p>
                                )}
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
                                    {/* <div className="col">
                                        <label htmlFor="">Location</label>
                                        <input onChange={(e) => setLocation(e.target.value)} value={location} type="text" className="form-control" placeholder="Dia điểm Tour" />
                                    </div> */}
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
                                <div className="row">
                                <div className="col">
                                    <label htmlFor="">Giá người lớn</label>
                                    <input onChange={(e) => setPrice_Adult(e.target.value)} value={price_Adult} type="text" className="form-control" placeholder="Vui lòng nhập" />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Giá trẻ em</label>
                                    <input onChange={(e) => setPrice_Children(e.target.value)} value={price_Children} type="text" className="form-control" placeholder="Vui lòng nhập" />
                                </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="formFileMultiple" className="form-label">Trạng thái Tour</label>
                                        <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-select" aria-label="Default select example">
                                            <option value="Còn tour">Còn tour</option>
                                            <option value="Sắp hết">Sắp hết</option>
                                            <option value="Hết tour">Hết tour</option>
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label htmlFor="formFileMultiple" className="form-label">Mô tả</label>
                                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" name="" id="" placeholder="Mô tả thông tin của tour.." />
                                    </div>
                                </div>
                            </div>
                        </>

                        :
                        <TourPlaneAdmin
                            planes={planes}
                            setPlanes={setPlanes}
                            dateTour={dateTour}
                            setDateTour={setDateTour}
                            numDay={numDay}
                            setNumDay={setNumDay}
                        />
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