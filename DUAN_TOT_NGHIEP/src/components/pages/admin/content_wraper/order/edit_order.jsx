import { useContext, useEffect, useState } from "react";
// import TourPlaneAdmin from "./tourPlaneAdmin";
import { useDispatch, useSelector } from "react-redux";
import { PopupContext } from "../../../../../context/popupContext";
import { getTourByNameAnDateTour, updateOrder } from "../../../../../redux/action_thunk";
import { errFilter } from "../../../../../redux/tour_slice";

function Edit_order({ status_task, setStatus_task, activeTab, setActiveTab }) {
    let dispatch = useDispatch()
    const oneOder = useSelector((state) => state.oderSL.oneOder)
    const userOne = useSelector((state) => state.userSL.userOne)
    const tourOne = useSelector((state) => state.tourSL.tourOne)
    const { isPopupEdit, setPopupEdit } = useContext(PopupContext)
    const [checkBtn, setCheckBtn] = useState(true)
    const [task_status, setTask_status] = useState("")
    const [departureDate, setDepartureDate] = useState(""); // set lại ngày đi nếu người dùng muosn đổi
    const [returnDate, setReturnDate] = useState(""); // set lại ngày đi nếu người dùng muosn đổi
    // const arrStatus = ["Chờ xác nhận", "Sẵn sàng khởi hành", "Đang diễn ra", "Hoàn tất"];
    const [indexActive, setIndexActive] = useState(null)
    const [idTour, setIdTour] = useState(null)

    const [namesImgFront, setNamesImgFront] = useState("")
    const [namesImgBack, setNamesImgBack] = useState("")
    const [imgBack, setImgBack] = useState("")
    const [imgFront, setImgFront] = useState("")
    const [existingImagesFront, setExistingImagesFront] = useState("")
    const [existingImagesBack, setExistingImagesBack] = useState("")
    const [numDay, setNumDay] = useState("")

    const [error, setError] = useState({
        images: "",
    });

    useEffect(() => {
        setDepartureDate(oneOder.departureDate || "")
        setReturnDate(oneOder.returnDate || "")
    }, [oneOder])
    

    useEffect(() => {
        setNumDay(tourOne?.numDay || "")
    }, [tourOne])

    useEffect(() => {
        if (userOne && Array.isArray(userOne.cardImages) && userOne.cardImages.length > 0) {
            setNamesImgFront(userOne.cardImages[0] || "")
            setNamesImgBack(userOne.cardImages[1] || "")
            setImgBack(userOne.cardImages[1] || "")
            setImgFront(userOne.cardImages[0] || "")
            setExistingImagesFront(userOne.cardImages[0] || "")
            setExistingImagesBack(userOne.cardImages[1] || "")
        }
    }, [userOne])

    const removeStateImg = (key) => {
        if (key === "front") {
            setNamesImgFront("")
            setImgFront("")
        } else {
            setNamesImgBack("")
            setImgBack("")
        }
    }

    const changeFileImg = (e, key) => {
        const file = e.target.files[0];
        const validFormats = ["image/jpeg", "image/png", "image/jpg"];
        let fileErrors = {};

        // Kiểm tra xem file có tồn tại không
        if (!file) {
            return;
        }

        // Kiểm tra định dạng file
        if (!validFormats.includes(file.type)) {
            fileErrors.images = "Chỉ được tải lên các file ảnh định dạng JPEG, PNG hoặc JPG!";
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
        if (key === "front") {
            setNamesImgFront(e.target.files[0].name)
            setImgFront(e.target.files[0])
        } else {
            setNamesImgBack(e.target.files[0].name)
            setImgBack(e.target.files[0])
        }
    }
    // hàm này click vào cái tour tìm kiếm nào thì lấy id đó và setLuoon cái border chọn
    const changeItemTour = (id, i) => {
        setIndexActive(i)
        setIdTour(id)
    }

    useEffect(() => {
        console.log(idTour, task_status);

    }, [idTour, task_status])

    // useEffect này nó sẽ load ra các tour có ngày đi mình chọn
    useEffect(() => {
        
        if (departureDate || numDay) {
            console.log("có thay đổi");

            const valueName = ""; // cho nó mặc định mà rổng thì api đó cần truyền 2 tham số
            dispatch(getTourByNameAnDateTour(valueName, departureDate,numDay))
        }
    }, [departureDate, numDay])

    const tourDatas = useSelector((state) => state.tourSL.tourDatas)
    const errFilter2 = useSelector((state) => state.tourSL.isErrFilter)


    useEffect(() => {
        if (oneOder) {
            setTask_status(oneOder.task_status || "")
        }
    }, [oneOder])

    // Hàm xử lý khi thay đổi ngày đi
    const handleDepartureDateChange = (data) => {
        const departure = new Date(data);
        const numberOfDays = parseInt(tourOne.numDay, 10) || 0;

        // Tính ngày về bằng cách cộng thêm số ngày vào ngày khởi hành
        const returnDate = new Date(departure);
        returnDate.setDate(departure.getDate() + numberOfDays);

        // Định dạng ngày thành dd/mm/yyyy
        const formattedDepartureDate = `${departure.getDate().toString().padStart(2, '0')}/${(departure.getMonth() + 1).toString().padStart(2, '0')}/${departure.getFullYear()}`;
        const formattedReturnDate = `${returnDate.getDate().toString().padStart(2, '0')}/${(returnDate.getMonth() + 1).toString().padStart(2, '0')}/${returnDate.getFullYear()}`;

        setDepartureDate(formattedDepartureDate);
        setReturnDate(formattedReturnDate)
        dispatch(errFilter(false))
    };

    // const handleUpdateOrder = async () => {
    //     await dispatch(updateOrder(oneOder._id, idTour, departureDate, returnDate, task_status))
    //     setPopupEdit(false) // khi cập nhật xong thì tắt popup edit
    //     setCheckBtn(true) // này để chuyển tab thông tin và thay đổi trong edit
    //     setDepartureDate("")
    //     setReturnDate("")
    //     setStatus_task(task_status)


    //     // Tìm chỉ mục của trạng thái hiện tại trong mảng arrStatus
    //     const tabIndex = arrStatus.indexOf(task_status);
    //     // Nếu tìm thấy chỉ mục hợp lệ, đặt activeTab theo chỉ mục
    //     if (tabIndex !== -1) {
    //         setActiveTab(tabIndex);
    //     } else {
    //         console.warn("Trạng thái không hợp lệ, không thể xác định tab.");
    //     }

    // }

    const handleUpdateOrder = async () => {
        try {
            const formData = new FormData();
            formData.append("idTour", idTour || tourOne?._id);
            formData.append("idUser", userOne?._id);
            formData.append("departureDate", departureDate);
            formData.append("returnDate", returnDate);
            formData.append("task_status", task_status);

            formData.append('existingImagesFront', JSON.stringify(existingImagesFront));
            formData.append('existingImagesBack', JSON.stringify(existingImagesBack));

            formData.append(`imagesFront`, imgFront);
            formData.append(`imagesBack`, imgBack);

            // // Cập nhật thông tin đơn hàng
            await dispatch(updateOrder(oneOder._id, formData));
            resetState();
            // setStatus_task(task_status)
            // setActiveTab(1)
        } catch (error) {
            console.error("Lỗi khi cập nhật đơn hàng:", error);
        }
    };


    const resetState = () => {
        setPopupEdit(false);
        setCheckBtn(true);
        setDepartureDate("");
        setReturnDate("");
    };
    return <>
        <div className={`${isPopupEdit ? "overlay-admin" : ""}`}>
            <div className={`box-popop-addtour ${isPopupEdit ? 'showPopup-addtour' : 'nonePopup-addtour'}`}>

                {/* <div className="loaderAdd"></div> */}
                <div className="btns-change-tour">
                    <div onClick={() => setCheckBtn(true)} className={`btn-thongTin ${checkBtn && "active-color-addTour"}`} >Thông Tin</div>
                    <div onClick={() => setCheckBtn(false)} className={`btn-plane ${!checkBtn && "active-color-addTour"}`} >Thay đổi</div>
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
                                        <label htmlFor="">Mã đơn hàng</label>
                                        <input value={"BAG-" + oneOder._id?.slice(-5).toUpperCase() || ""} readOnly type="text" className="form-control" placeholder="Mã đơn" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Tên khách hàng</label>
                                        <input value={userOne.name || ""} readOnly type="text" className="form-control" placeholder="Tên khách hàng" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Tên Tour</label>
                                        <input value={tourOne.name || ""} readOnly type="text" className="form-control" placeholder="Tên Tour" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Tổng tiền</label>
                                        <input value={oneOder.totalPrice || ""} readOnly type="text" className="form-control" placeholder="Tổng Tiền" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Phương thức trả</label>
                                        <input value={oneOder.status || ""} readOnly type="text" className="form-control" placeholder="Trạng thái" />
                                    </div>
                                    {/* <div className="col">
                                        <label htmlFor="">Trạng thái đơn</label>
                                        <select value={task_status || ""} onChange={(e) => setTask_status(e.target.value)} className="form-select" aria-label="Default select example">
                                            <option value="" disabled selected hidden>Chọn danh mục</option>
                                            {arrStatus.map((item, index) => {
                                                return <option key={index}>{item}</option>
                                            })}
                                        </select>
                                    </div> */}
                                </div>
                            </div>
                        </>

                        :
                        <>
                            <div className="mb-3">
                                <label htmlFor="frontCCCD" className="form-label">Mặt trước CCCD</label>
                                <input
                                    onChange={(e) => changeFileImg(e, "front")}
                                    className="form-control"
                                    type="file"
                                    id="frontCCCD"
                                />
                                <ul className="ul-image-manager">
                                    {/* Chỉ hiển thị mặt trước (index 0) */}
                                    {namesImgFront &&
                                        <li>
                                            {namesImgFront}
                                            <span className="span-close" onClick={() => removeStateImg("front")}>
                                                <i className="fa-regular fa-circle-xmark"></i>
                                            </span>
                                        </li>
                                    }
                                </ul>
                                {error.images && (
                                    <p className="text-danger">{error.images}</p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="backCCCD" className="form-label">Mặt sau CCCD</label>
                                <input
                                    onChange={(e) => changeFileImg(e, "back")}
                                    className="form-control"
                                    type="file"
                                    id="backCCCD"
                                />
                                <ul className="ul-image-manager">
                                    {/* Chỉ hiển thị mặt sau (index 1) */}
                                    {namesImgBack &&
                                        <li>
                                            {namesImgBack}
                                            <span className="span-close" onClick={() => removeStateImg("back")}>
                                                <i className="fa-regular fa-circle-xmark"></i>
                                            </span>
                                        </li>
                                    }
                                </ul>
                                {error.images && (
                                    <p className="text-danger">{error.images}</p>
                                )}
                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="">Ngày đi</label>
                                        <input onChange={(e) => handleDepartureDateChange(e.target.value)} type="date" className="form-control" placeholder="Ngày đi" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="">Số ngày</label>
                                        <input onChange={(e) => { setNumDay(e.target.value); dispatch(errFilter(false)) }} value={numDay || ""} type="number" className="form-control" placeholder="Thời gian" />
                                    </div>
                                </div>
                            </div>

                            {departureDate && returnDate && <div>Ngày đi {departureDate || ""} - ngày về {returnDate || ""}</div>}


                            {departureDate
                                &&
                                <div className="box-order-tour-name">
                                    <label htmlFor="">Tour cùng ngày đi</label>
                                    {errFilter2 ?
                                        <div>{errFilter2}</div>
                                        :
                                        tourDatas.map((item, index) => {
                                            return <div
                                                key={index}
                                                onClick={() => changeItemTour(item._id, index)}
                                                className={`order-tour-name ${indexActive == index ? "active-ortder" : ""}`}
                                            >{item.name}
                                            </div>
                                        })
                                    }
                                </div>
                            }


                        </>
                    }


                    <div className="flex-btn-add">
                        <input type="button" onClick={() => setPopupEdit(false)} value="Đóng" className="btn btn-primary back" />
                        <input type="button" onClick={handleUpdateOrder} className="btn btn-primary" value="Cập nhật" />
                    </div>
                </form>

            </div>
        </div>
    </>
}

export default Edit_order