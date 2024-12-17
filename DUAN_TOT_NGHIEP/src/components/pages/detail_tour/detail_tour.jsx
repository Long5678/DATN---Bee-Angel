import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../../../publics/styles/reponsive/rp-detailTour.scss"
import { useSelector } from "react-redux";
import ModalFeedback from "../modal/modalfeedback";
import { AuthContext } from "../../../context/authContext";

function Detail_tour({ _id, name, price, description, videos, dateTour, isDeleted, numDay }) {
    let navigation = useNavigate()
    const { user, setOpen } = useContext(AuthContext)
    const priceNumber = Number(price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');
    const [avgRating, setAvgRating] = useState(0); // State để lưu trung bình số sao
    const rating = useSelector((state) => state.RatingSL.ratingDatas)
    const [ratingCount, setRatingCount] = useState(0); // Thay đổi từ avgCount thành ratingCount

    const handleBookTour = () => {
        navigation(`/bookTour?id=${_id}`)
    }

    useEffect(() => {
        // Gọi API để lấy trung bình số sao
        const fetchAverageRating = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Rating/${_id}/average-rating`); // Giả sử bạn có route này
                setAvgRating(response.data.avgRating);
            } catch (error) {
                console.error("Lỗi khi lấy trung bình số sao:", error);
            }
        };

        const fetchAverageCount = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Rating/${_id}/count-rating`);

                console.log(response.data); // Kiểm tra lại dữ liệu trả về

                setRatingCount(response.data.ratingCount);
            } catch (error) {
                console.error("Lỗi khi đếm số đánh giá:", error);
            }
        };

        fetchAverageRating();

        fetchAverageCount();
    }, [_id]); // Chạy khi _id (tức tourId) thay đổi

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating); // Số sao đầy
        const halfStar = rating - fullStars >= 0.5 ? true : false; // Kiểm tra có nửa sao không
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao rỗng còn lại

        const stars = [];

        // Thêm sao đầy
        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={`full-${i}`} className="fa-solid fa-star filled"></i>);
        }

        // Thêm sao nửa (nếu có)
        if (halfStar) {
            stars.push(<i style={{ color: "#d94f2b" }} key="half" className="fa-solid fa-star-half-stroke filled"></i>);
        }

        // Thêm sao rỗng
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
        }

        return stars;
    };


    return <>
        <div className="detail-tour">
            <div className="name-start-mobile">
                <h2 style={{ display: "none" }} className="tour-title title-detail-mobile">{name}</h2>
                <div style={{ display: "none" }} className="d-flex-star-comment start-mobile">
                    <div className="count-star">
                        <span>{avgRating.toFixed(1)}</span> {/* Hiển thị trung bình số sao */}
                        <div className="list-star">
                            {renderStars(avgRating)} {/* Gọi hàm renderStars */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="video-plane video-tour-detail">
                {videos?.length > 0 ? (
                    <video controls autoPlay>
                        <source src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${videos[0]}?alt=media`} type="video/mp4" />
                    </video>
                ) : (
                    <p>Video không khả dụng</p>
                )}
            </div>

            {/* phần content tour */}
            <div className="content-detail-tour">
                <h2 className="tour-title tour-detail-title">{name}</h2>
                <div className="d-flex-star-comment">
                    <div className="count-star">
                        <span>{avgRating.toFixed(1)}</span> {/* Hiển thị trung bình số sao */}
                        <div className="list-star">
                            {renderStars(avgRating)} {/* Gọi hàm renderStars */}
                        </div>
                    </div>
                    <div>
                        <p className="p-danhGia">{ratingCount} đánh giá</p>
                    </div>
                    <ModalFeedback rating={rating} />
                </div>
                <div>
                    <ul className="ul-content-detail-tour">
                        <li>
                            <div className="key">Thời gian:</div>
                            <div className="value">{numDay} ngày {numDay-1} đêm</div>
                        </li>
                        {/* <li>
                            <div className="key">Nơi khởi hành:</div>
                            <div className="value"></div>
                        </li> */}
                        <li>
                            <div className="key">Mô tả:</div>
                            <div style={{ lineHeight: "1.5" }} className="value">{description}</div>
                        </li>
                        <li>
                            <div className="key">Lịch khởi hành:</div>
                            <div className="value d-flex-khoiHanh">
                                {dateTour?.length > 0 ? dateTour.map((item, index) => {
                                    let [day, month, year] = item.departureDate.split("/")
                                    return <div key={index} className="box-khoiHanh">{`${day}/${month}`}</div>
                                })
                                    : <span style={{ color: "red" }}>Tạm thời chưa có lịch khởi hành</span>
                                }


                            </div>
                        </li>
                        <li className="li-detail-price">
                            <div className="key">Giá tiền:</div>
                            <div className="value">{formatPrice}<sup>đ</sup></div>
                        </li>
                    </ul>
                </div>
                {!isDeleted ?
                    <div className="btn-detail-datTour">
                        <i className="fa-solid fa-cart-shopping"></i>
                        {user ?
                            <span onClick={handleBookTour}>Đặt Tour</span>
                            :
                            <span onClick={() => setOpen(true)}>Đặt Tour</span>
                        }

                    </div>
                    :
                    <div>Tour này đã dừng hoạt động</div>
                }

            </div>
        </div>
    </>
}

export default Detail_tour
