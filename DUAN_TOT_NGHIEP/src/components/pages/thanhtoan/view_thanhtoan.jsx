import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/authContext";
import "../../../publics/styles/thanhtoan.scss";
import { getOneUser } from "../../../redux/action_thunk";
import { PopupContext } from "../../../context/popupContext";

function ViewThanhtoan() {
    let dispatch = useDispatch()
    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState(null);
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id");

    const peopleParam = searchParams.get("people");
    const childrenParam = searchParams.get("children");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");
    const tong = localStorage.getItem("ok")
    const songay = localStorage.getItem("numDay");
    console.log("hàng 23", songay);
    

    const [numberOfPeople, setNumberOfPeople] = useState(peopleParam ? parseInt(peopleParam) : 1);
    const [numberOfChildren, setNumberOfChildren] = useState(childrenParam ? parseInt(childrenParam) : 0);

    const [tourDetails, setTourDetails] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [sale, setSale] = useState(0);
    const [depositPrice, setDepositPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    // const { priceHotel, setPriceHotel} = useContext(PopupContext)
    const priceHotel = parseFloat(localStorage.getItem("priceHotel"));

    useEffect(() => {
        dispatch(getOneUser(user?._id))
    }, [user])

    const userOne = useSelector((state) => state.userSL.userOne)

    const handleCalculatePrice = async (people, children, songay) => {
        try {
            const response = await axios.post(`http://localhost:3000/price/calculate-price/${idTour}`, {
                numberOfPeople: people,
                numberOfChildren: children,
                numDay: songay
            });
            
            const { totalPrice, sale, depositPrice } = response.data;

            setTotalPrice(totalPrice);
            setSale(sale);
            setDepositPrice(depositPrice);
            setErrorMessage("");
        } catch (error) {
            console.error("Error details:", error);
            setErrorMessage(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
            setTotalPrice(0);
            setSale(0);
            setDepositPrice(0);
        }
    };

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Admin/tours/detail/${idTour}`);
                setTourDetails(response.data);
                console.log("Tourdetail", response.data);


                handleCalculatePrice(numberOfPeople, numberOfChildren,songay);
            } catch (error) {
                console.error("Error fetching tour details:", error);
            }
        };

        if (idTour) {
            fetchTourDetails();
        }
    }, [idTour, numberOfPeople, numberOfChildren]);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        const paymentType = localStorage.getItem("paymentType");

        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }

        // Adjust prices for full payment if necessary
        if (paymentType === "full") {
            setDepositPrice(0);
        }
    }, [totalPrice]);

    function formatCurrency(value) {
        return Number(value).toLocaleString('vi-VN') + '₫';
    }

    return (
        <div className="tour-form-container1">
            <div className="tour-form">
                <h2>Xác nhận thông tin</h2>
                {user && (
                    <form>
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input type="text" value={userOne.name} readOnly />
                        </div>
                        <div className="form-group-wrapper">
                            <div className="form-group">
                                <label>Ngày sinh</label>
                                <input type="text" value={userOne.birth_day} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Giới tính</label>
                                <input type="text" value={userOne.gender} readOnly />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={userOne.email} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input type="tel" value={userOne.phone} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input type="text" value={userOne.address} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ đón</label>
                            <input type="text" value={userOne.address_don} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Ảnh căn cước công dân</label>
                            {userOne.cardImages && userOne.cardImages.length > 0 && (
                                <div className="img-thanhToan-cccd">
                                    <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/cards%2F${userOne?.cardImages[0]}?alt=media`} alt="Mặt trước căn cước" width="100" />
                                </div>
                            )}
                            {userOne.cardImages && userOne.cardImages.length > 1 && (
                                <div className="img-thanhToan-cccd">
                                    <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/cards%2F${userOne?.cardImages[1]}?alt=media`} alt="Mặt sau căn cước" width="100" />
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </div>
            {tourDetails && (
                <div className="price-forms">
                    <div className="price-form">
                        <h4>{tourDetails.name}</h4>
                        <span>{tourDetails.description}</span>

                        <hr />
                        <div className="form-title">
                            <p>Ngày khởi hành: </p>
                            <span className="px-2">{departureDate}</span>
                        </div>
                        <div className="form-title">
                            <p>Ngày về: </p>
                            <span className="px-2">{returnDate}</span>
                        </div>
                        <div className="form-title">
                            <p>Số lượng: </p>
                            <span className="px-2">{numberOfPeople} Người lớn + {numberOfChildren} Trẻ em</span>
                        </div>
                        <hr />
                        <div className="form-title">
                            <p className="title-bold">Giá gốc: </p>
                            <span className="px-2">{formatCurrency(tong)}</span>
                            {priceHotel !== 0 ?(<sub className="title-red">Đã cộng khách sạn</sub>) :""}
                        </div>
                    </div>
                    <div className="price-form mt-4">
                        <div className="form-title">
                            <p>Giảm giá ưu đãi:</p>
                            <span className="title-blue px-2">giảm 10%</span>
                        </div>
                        <div className="form-title">
                            <p>Giá tour đã giảm:</p>
                            <span className="px-2">{formatCurrency(sale)}</span>
                        </div>
                        {priceHotel !== 0 && (
                            <>
                                <div className="form-title">
                                    <p>Tiền Khách sạn:</p>
                                    <span className="px-2">{formatCurrency(priceHotel)}</span>
                                </div>
                            </>
                        )}
                        
                        {localStorage.getItem("paymentType") !== "full" && (
                            <div className="form-title">
                                <p>Tiền đặt cọc:</p>
                                <span className="px-2">{formatCurrency(depositPrice)}</span>
                            </div>
                        )}

                        <div className="form-title">
                            <p className="title-bold">Số tiền thanh toán:</p>
                            <span className="title-red px-2">
                                {localStorage.getItem("paymentType") === "full" ? formatCurrency(sale + priceHotel) : formatCurrency((sale - depositPrice) + priceHotel)}
                            </span>
                        </div>
                        {localStorage.getItem("paymentType") !== "full" && (
                            <div className="form-title">
                                <p className="title-bold">Còn lại phải thanh toán:</p>
                                <span className="title-red px-2">
                                    {formatCurrency(sale - depositPrice)}
                                </span>
                            </div>
                        )}

                    </div>
                </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default ViewThanhtoan;
