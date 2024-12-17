import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/authContext"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOneTour, getOneUser, updateUser } from "../../../redux/action_thunk";
import { useSearchParams } from "react-router-dom";
import { PopupContext } from "../../../context/popupContext";

function Form_bookTour({ _id }) {
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id"); // lấy id tour từ url

    let dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    const { ok, setok } = useContext(PopupContext)
    const { priceHotel, setPriceHotel } = useContext(PopupContext)
    const { namehotel, setNamehotel } = useContext(PopupContext)
    const { locationhotel, setLocationhotel } = useContext(PopupContext)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [address_don, setAddress_don] = useState("");
    const [gender, setGender] = useState("");
    const [birth_day, setBirth_day] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [depositPrice, setDepositPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [sale, setsale] = useState(0);
    const [returnDate, setReturnDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [activeIndex, setActiveIndex] = useState(null);
    const [frontIDCard, setFrontIDCard] = useState(null); // State cho ảnh mặt trước
    const [backIDCard, setBackIDCard] = useState(null); // State cho ảnh mặt sau
    const [frontIDCardURL, setFrontIDCardURL] = useState(null); // State cho URL tạm thời mặt trước
    const [backIDCardURL, setBackIDCardURL] = useState(null); // State cho URL tạm thời mặt sau
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(true); // State này để quản lý nút submit
    const [inpCheckBox, setInpCheckBox] = useState(false) // state này là cái nút check box tôi đồng ý
    const [loadingBookTour, setLoadingBookTour] = useState(false)
    const [numDay, setNumDay] = useState(false)
    const [phoneErr, setPhoneErr] = useState("");
    const [isDepartureDateSelected, setIsDepartureDateSelected] = useState(false); // bắt lỗi chọn ngày khỏi hành trướt

    const userOne = useSelector((state) => state.userSL.userOne)

    const changeDate = (i, departureDate, returnDate) => {
        setIsDepartureDateSelected(true);
        setActiveIndex(i);

        // Convert "DD/MM/YYYY" to "YYYY-MM-DD" format for correct parsing
        const [departureDay, departureMonth, departureYear] = departureDate.split("/");
        const formattedDepartureDate = new Date(`${departureYear}-${departureMonth}-${departureDay}`);

        const [returnDay, returnMonth, returnYear] = returnDate.split("/");
        const formattedReturnDate = new Date(`${returnYear}-${returnMonth}-${returnDay}`);

        setDepartureDate(departureDate);
        setReturnDate(returnDate);

        const numDay = (formattedReturnDate - formattedDepartureDate) / (1000 * 60 * 60 * 24); // Calculate the number of days
        console.log("numDay", numDay);

        setNumDay(numDay); // Update the state with the calculated number of days
    }


    useEffect(() => {
        console.log(returnDate, departureDate);

    }, [returnDate, departureDate])

    useEffect(() => {
        if (user && user._id) {
            dispatch(getOneUser(user._id));
        } else {
            console.warn("User is not logged in or user ID is undefined.");
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (userOne) {
            setName(userOne.name || "");
            setPhone(userOne.phone || "");
            setEmail(userOne.email || "");
            setAddress(userOne.address || "");
            setAddress_don(userOne.address_don || "");
            setGender(userOne.gender || "");
            setBirth_day(userOne.birth_day || "");
        } else {
            console.warn("User one data is not available.");
        }
    }, [userOne]);

    useEffect(() => {
        dispatch(getOneTour(idTour))
    }, idTour)

    const tourOne = useSelector((state) => state.tourSL.tourOne)
    console.log("dateTour", tourOne.dateTour);


    const handleCalculatePrice = async (people, children, numDay) => {
        try {
            const response = await axios.post(`http://localhost:3000/price/calculate-price/${idTour}`, {
                numberOfPeople: people,
                numberOfChildren: children,
                numDay
            });

            setTotalPrice(response.data.totalPrice);
            setsale(response.data.sale);
            setDepositPrice(response.data.depositPrice);
            setErrorMessage("");
        } catch (error) {
            console.error("Error details:", error);
            setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
            setTotalPrice(0);
            setDepositPrice(0);
            setsale(0);
        }
    };
    // 
    const handelPlusPeople = () => {
        if (!isDepartureDateSelected) {
            alert("Vui lòng chọn ngày khởi hành trước!");
            return;
        }
        setNumberOfPeople(prev => prev + 1);
    };

    const handelMinusPeople = () => {
        if (!isDepartureDateSelected) {
            alert("Vui lòng chọn ngày khởi hành trước!");
            return;
        }
        if (numberOfPeople > 1) {
            setNumberOfPeople(prev => prev - 1);
        }
    };


    const handelPlusChildren = () => {
        if (!isDepartureDateSelected) {
            alert("Vui lòng chọn ngày khởi hành trước!");
            return;
        }
        setNumberOfChildren(prev => prev + 1);
    };

    const handelMinusChildren = () => {
        if (!isDepartureDateSelected) {
            alert("Vui lòng chọn ngày khởi hành trước!");
            return;
        }
        if (numberOfChildren > 0) {
            setNumberOfChildren(prev => prev - 1);
        }
    };

    useEffect(() => {
        handleCalculatePrice(numberOfPeople, numberOfChildren, numDay);
    }, [numberOfPeople, numberOfChildren, numDay]); // Gọi lại mỗi khi numberOfPeople hoặc numberOfChildren thay đổi


    const handleIDCardChange = (e, type) => {
        const file = e.target.files[0]; // Lấy file đầu tiên từ mảng files
        if (file) {
            const fileURL = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
            if (type === 'front') {
                setFrontIDCard(file); // Cập nhật state với file
                setFrontIDCardURL(fileURL); // Cập nhật state với URL
            } else if (type === 'back') {
                setBackIDCard(file); // Cập nhật state với file
                setBackIDCardURL(fileURL); // Cập nhật state với URL
            }
        }
    };

    useEffect(() => {
        console.log("Front ID Card:", frontIDCard);
        console.log("Back ID Card:", backIDCard);
        console.log("Front ID Card URL:", frontIDCardURL);
        console.log("Back ID Card URL:", backIDCardURL);
    }, [frontIDCard, backIDCard]);

    useEffect(() => {
        if (name && birth_day && gender && address && address_don && email && phone && frontIDCard && backIDCard && departureDate && returnDate && inpCheckBox) {
            console.log("ok");

            setIsSubmitEnabled(false)
        } else {
            console.log("no");

            setIsSubmitEnabled(true)
        }
    }, [name, birth_day, gender, address, address_don, email, phone, frontIDCard, backIDCard, departureDate, returnDate, inpCheckBox])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            phone.length !== 10 ||
            phone[0] !== "0" ||
            !["3", "5", "7", "8", "9"].includes(phone[1])
        ) {
            setPhoneErr("Số điện thoại không hợp lệ");
            return;
        }
        const paymentType = localStorage.getItem("paymentType");
        const effectiveTotalPrice = paymentType === "full" ? sale : totalPrice;
        localStorage.setItem("totalPrice", effectiveTotalPrice);
        localStorage.setItem("priceHotel", priceHotel);
        localStorage.setItem("namehotel", namehotel)
        localStorage.setItem("locationhotel", locationhotel)
        localStorage.setItem("sale", sale);
        localStorage.setItem("ok", ok);
        localStorage.setItem("depositPrice", depositPrice);
        localStorage.setItem("numberOfPeople", numberOfPeople);
        localStorage.setItem("numberOfChildren", numberOfChildren);
        localStorage.setItem("numDay", numDay);

        const formData = new FormData();

        if (frontIDCard) {
            formData.append('frontCard', frontIDCard); // Thêm ảnh mặt trước
        }
        if (backIDCard) {
            formData.append('backCard', backIDCard); // Thêm ảnh mặt sau
        }

        // Chỉ gửi idUser để API biết được ai đang cập nhật
        formData.append('userId', user._id); // Giả sử user có trường id

        try {
            setLoadingBookTour(true)
            // Gọi API updateCCCD
            const response = await axios.post(`http://localhost:3000/auth/updatedCCCD`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoadingBookTour(false)
            // Xử lý phản hồi từ server nếu cần
            console.log(response.data);

        } catch (error) {
            console.error("Error updating CCCD:", error);
            setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
        }
        window.location.href = `/thanhtoan?id=${idTour}&people=${numberOfPeople}&children=${numberOfChildren}&departureDate=${departureDate}&returnDate=${returnDate}`;
    };

    const handlePayFull = (e) => {
        localStorage.setItem("paymentType", "full");
        handleSubmit(e);
    };

    const handlePayDeposit = (e) => {
        localStorage.setItem("paymentType", "deposit");
        handleSubmit(e);
    };

    function formatCurrency(value) {
        return Number(value).toLocaleString('vi-VN') + '₫';
    }

    useEffect(() => {
        if (loadingBookTour) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("address_don", address_don);
            formData.append("gender", gender);
            formData.append("birth_day", birth_day);
            dispatch(updateUser(userOne?._id, formData))
        }
    }, [loadingBookTour])

    useEffect(() => {
        // setok((totalPrice + priceHotel) * numDay)
        setok(totalPrice + priceHotel)
        console.log("hàng 295", totalPrice);
        
    }, [ok, departureDate, priceHotel, numberOfChildren, numberOfPeople, totalPrice])

    return <>
        {loadingBookTour &&
            <div className="overlay-await-bookTour">
                <div className="loaderBookTour">
                </div>
                <span className="span-bookTour"> Vui lòng đợi ...</span>
            </div>
        }
        {!tourOne?.isDeleted ?
            <section className="both-main-form-bookTour">
                <form onSubmit={handleSubmit}>
                    <section className="main_form-bookTour">
                        <h2>Điền thông tin</h2>
                        <div className="mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="email" className="form-control" placeholder="Vui lòng nhập" />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Ngày sinh</label>
                                <input
                                    value={birth_day}
                                    onChange={(e) => setBirth_day(e.target.value)}
                                    type="date"
                                    className="form-control"
                                    placeholder="birth day"
                                    max={new Date().toISOString().split("T")[0]} // Giới hạn ngày không vượt quá ngày hiện tại
                                />
                            </div>
                            <div className="col">
                                <label className="form-label">Giới tính</label>
                                <select
                                    style={{
                                        border: "1px solid #ccc"
                                    }}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="form-control"
                                >
                                    <option value="" disabled>Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </div>
                        </div>




                        <div className="mb-3">
                            <label className="form-label">Địa chỉ</label>
                            <input value={address} onChange={(e) => setAddress(e.target.value)} type="email" className="form-control" placeholder="Vui lòng nhập" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Địa chỉ Đón</label>
                            <input value={address_don} onChange={(e) => setAddress_don(e.target.value)} type="email" className="form-control" placeholder="Vui lòng nhập" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Vui lòng nhập" readOnly />
                        </div>

                        <div className="mb-3 row">
                            <div className="col">
                                <label className="form-label">Số điện thoại</label>
                                <div style={{ marginBottom: "4px !important"}} className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">+84</span>
                                    <input value={phone} onChange={(e) => { setPhone(e.target.value); setPhoneErr() }} type="number" className="form-control custom-number" placeholder="Vui lòng nhập" aria-describedby="basic-addon1" />
                                </div>
                                {phoneErr && <span style={{color: "red"}}>{phoneErr}</span>}
                            </div>
                        </div>

                        <div className="row">
                            {/*  */}
                            <div className="col">
                                <div className="form-group">
                                    <label>Ảnh căn cước công dân (Mặt trước)</label> <br />
                                    <input type="file" id="frontCardBook" accept="image/*" onChange={(e) => handleIDCardChange(e, 'front')} />
                                    {/* {frontIDCard && <img src={frontIDCardURL} alt="Mặt trước căn cước" width="100" />} */}
                                    <label className="lable-forCCCD" htmlFor="frontCardBook">
                                        {frontIDCard
                                            ?
                                            <div className="box-img-cccd">
                                                <img src={frontIDCardURL} alt="" />
                                            </div>
                                            :
                                            <div className="box-cccd">
                                                <div className="d-flex-cccd">
                                                    <i className="fa-solid fa-cloud-arrow-up fa-xl"></i>
                                                    <span>Đưa ảnh vào đây</span>
                                                </div>
                                            </div>
                                        }
                                    </label>
                                </div>
                            </div>

                            <div className="col">
                                {/* Trường ảnh căn cước công dân mặt sau */}
                                <div className="form-group">
                                    <label>Ảnh căn cước công dân (Mặt sau)</label>   <br />
                                    <input type="file" id="backCardBook" accept="image/*" onChange={(e) => handleIDCardChange(e, 'back')} />
                                    {/* {backIDCard && <img src={backIDCardURL} alt="Mặt sau căn cước" width="100" />} */}
                                    <label className="lable-forCCCD" htmlFor="backCardBook">
                                        {backIDCard
                                            ?
                                            <div className="box-img-cccd">
                                                <img src={backIDCardURL} alt="" />
                                            </div>
                                            :
                                            <div className="box-cccd">
                                                <div className="d-flex-cccd">
                                                    <i className="fa-solid fa-cloud-arrow-up fa-xl"></i>
                                                    <span>Đưa ảnh vào đây</span>
                                                </div>
                                            </div>
                                        }
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ngày khởi hành</label>
                            <div
                                style={{ flexDirection: "column" }}
                                className="value d-flex-khoiHanh"
                            >
                                {tourOne?.dateTour?.length > 0 ? (
                                    (() => {
                                        const validDates = tourOne?.dateTour?.filter((item) => {
                                            // Tách chuỗi ngày "DD/MM/YYYY"
                                            const [day, month, year] = item.departureDate.split("/");

                                            // Tạo đối tượng Date từ ngày tháng năm
                                            const departureDate = new Date(`${year}-${month}-${day}`);
                                            const today = new Date();

                                            // Thêm 10 ngày vào ngày hiện tại
                                            const tenDaysLater = new Date();
                                            tenDaysLater.setDate(today.getDate() + 10);

                                            // Chỉ hiển thị ngày nếu hợp lệ
                                            return departureDate >= tenDaysLater;
                                        });

                                        if (validDates.length === 0) {
                                            // Không có ngày nào hợp lệ
                                            return (
                                                <span style={{ color: "red" }}>
                                                    Lịch tour này yêu cầu đặt trước ít nhất 10 ngày!
                                                </span>
                                            );
                                        }

                                        // Hiển thị danh sách các ngày hợp lệ
                                        return validDates.map((item, index) => (
                                            <div
                                                onClick={() =>
                                                    changeDate(index, item.departureDate, item.returnDate)
                                                }
                                                className={`box-khoiHanh ${activeIndex === index ? "active-date" : ""
                                                    }`}
                                                key={index}
                                            >
                                                Ngày đi {item.departureDate} - Ngày về {item.returnDate}
                                            </div>
                                        ));
                                    })()
                                ) : (
                                    <span style={{ color: "red" }}>
                                        Tạm thời chưa có lịch khởi hành
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="form-label">Người lớn</label>
                                <div className=" box-group-form">
                                    <div className="d-flex-price-count">
                                        <span>{formatCurrency(tourOne.price_Adult)}</span>
                                        <section className="d-flex-congTru">
                                            <div onClick={handelMinusPeople} className="btn-tru">-</div>
                                            <span className="span-number">{numberOfPeople}</span>
                                            <div onClick={handelPlusPeople} className="btn-cong">+</div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <label className="form-label">Trẻ nhỏ (dưới 1m)</label>
                                <div className=" box-group-form">
                                    <div className="d-flex-price-count">
                                        <span>{formatCurrency(tourOne.price_Children)}</span>
                                        <section className="d-flex-congTru">
                                            <div onClick={handelMinusChildren} className="btn-tru">-</div>
                                            <span className="span-number">{numberOfChildren}</span>
                                            <div onClick={handelPlusChildren} className="btn-cong">+</div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex-total">
                            <div className="total-price-tour">
                                <span className="text-total">Tổng tiền: </span>
                                <span className="price-tour">{totalPrice > 0 ? formatCurrency(ok) : 0}</span>
                                <span className="sale-price">giảm 10%</span>
                                <br />
                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                            </div>

                            <button type="button" onClick={handlePayDeposit} disabled={isSubmitEnabled} className={`btn-datCoc ${isSubmitEnabled && "btn-notSubmit"}`}>Đặt cọc 50%</button>
                        </div>
                    </section>

                    <div className="checkbox-group-form">
                        <input onChange={() => setInpCheckBox(!inpCheckBox)} type="checkbox" id="terms" required />

                        <label htmlFor="terms">Tôi đồng ý điều khoản mà website đưa ra</label>
                    </div>
                    <button type="button" onClick={handlePayFull} disabled={isSubmitEnabled} className={`btn-thanhtoan ${isSubmitEnabled && " btn-notSubmit"}`}>Thanh toán</button>
                </form>
            </section >
            :
            <div>Tour này đã dừng hoạt động</div>
        }

    </>
}

export default Form_bookTour