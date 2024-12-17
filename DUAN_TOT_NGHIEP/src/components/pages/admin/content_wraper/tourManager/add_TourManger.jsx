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
    const [numDay, setNumDay] = useState(0) // state này chứa số lượng ngày 
    const [error, setError] = useState({
        videos: "",
        images: "",
    });

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

    function handleAddTour(data) {
        let { name, price, price_Adult, price_Children } = data

        console.log(name, images, videos, description, price, type, status, planes, dateTour);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("price_Adult", price_Adult);
        formData.append("price_Children", price_Children);
        formData.append("type", type);
        formData.append("status", status);
        // Chuyển đổi planes thành chuỗi JSON
        formData.append("planes", JSON.stringify(planes));
        formData.append("dateTour", JSON.stringify(dateTour));
        formData.append("numDay", numDay);

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
    const formValues = watch(["name", "price", "price_Adult", "price_Children"]);
    useEffect(() => {
        const [name, price, price_Adult, price_Children] = formValues;
        if (name && price && price_Adult && price_Children && namesImg.length == 3 && nameVideos.length == 1 && type && description && planes.length >= 1 && dateTour.length >= 3) {
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
                                <input
                                    onChange={(e) => changeFileImg(e)}
                                    className="form-control"
                                    type="file"
                                    id="formFileMultiple"
                                    multiple
                                />
                                {/* Hiển thị lỗi hình ảnh */}
                                {error.images && (
                                    <p className="text-danger">{error.images}</p>
                                )}
                                <ul className="ul-image-manager">
                                    {namesImg.map((name, index) => (
                                        <li key={index}>{name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFileMultiple" className="form-label">Video Tour</label>
                                <input
                                    onChange={(e) => changeFileVideo(e)}
                                    className="form-control"
                                    type="file"
                                    id="formFileMultiple"
                                    multiple
                                />
                                {/* Hiển thị lỗi video */}
                                {error.videos && (
                                    <p className="text-danger">{error.videos}</p>
                                )}
                                <ul className="ul-image-manager">
                                    {nameVideos.map((name, index) => (
                                        <li key={index}>{name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    {/* <div className="col">
                                        <label htmlFor="">Location</label>
                                        <input {...register("location", { required: true })} type="text" className="form-control" placeholder="Dia điểm Tour" />
                                    </div> */}
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
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Giá người lớn</label>
                                        <input {...register("price_Adult", { required: true })} type="text" className="form-control" placeholder="Giá người lớn" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Giá trẻ em</label>
                                        <input {...register("price_Children", { required: true })} type="text" className="form-control" placeholder="Giá trẻ em" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="formFileMultiple" className="form-label">Trạng thái Tour</label>
                                        <select onChange={(e) => setStatus(e.target.value)} className="form-select" aria-label="Default select example">
                                            <option value="Còn tour">Còn tour</option>
                                            <option value="Sắp hết">Sắp hết</option>
                                            <option value="Hết tour">Hết tour</option>
                                        </select>
                                    </div>

                                    <div className="col">
                                        <label htmlFor="formFileMultiple" className="form-label">Mô tả</label>
                                        <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" name="" id="" placeholder="Mô tả thông tin của tour.."></textarea>
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
    </>
}

export default Add_TourManger