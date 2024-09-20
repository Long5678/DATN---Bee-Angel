import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getOneTour } from "../../../redux/action_thunk";
import { useSearchParams } from "react-router-dom";

function Detail_tour() {
    // lấy id từ url
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id"); // Lấy token từ URL
    let dispatch = useDispatch()
    let tourOne = useSelector((state) => state.tourSL.tourOne)

    useEffect(() => {
        if(idTour) {
            dispatch(getOneTour(idTour))
        }
        // Cuộn lên đầu trang khi component render
        window.scrollTo(0, 0);
    }, [idTour])

    const priceNumber = Number(tourOne?.price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');

    console.log("Tour one",tourOne);

    return <>
        <div className="detail-tour">
           
            <div className="video-plane video-tour-detail">
                {tourOne?.videos?.length > 0 ? (
                    <video controls autoPlay>
                        <source src={`http://localhost:3000/uploads/${tourOne?.videos[0]}`} type="video/mp4" />
                    </video>
                ) : (
                    <p>Video không khả dụng</p>
                )}
            </div>

            {/* phần content tour */}
            <div className="content-detail-tour">
                <h2 className="tour-title tour-detail-title">{tourOne?.name}</h2>
                <div className="d-flex-star-comment">
                    <div className="count-star"><span>4.8</span>
                        <div className="list-star">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div className="count-comment">7.5K <span>Đánh Giá</span></div>
                </div>
                <ul className="ul-content-detail-tour">
                    <li>
                        <div className="key">Thời gian:</div>
                        <div className="value">2 ngày 1 đêm</div>
                    </li>
                    <li>
                        <div className="key">Nơi khởi hành:</div>
                        <div className="value">{tourOne?.location}</div>
                    </li>
                    <li>
                        <div className="key">Mô tả:</div>
                        <div className="value">{tourOne?.description}</div>
                    </li>
                    <li className="li-detail-price">
                        <div className="key">Giá tiền:</div>
                        <div className="value">{formatPrice}VND</div>
                    </li>
                </ul>
                <div className="btn-detail-datTour">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>Đặt Tour</span>
                </div>
            </div>
        </div>
    </>
}

export default Detail_tour
