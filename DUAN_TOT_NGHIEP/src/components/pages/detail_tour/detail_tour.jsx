import { useState } from "react";

function Detail_tour() {

    const [currentSlide, setCurrentSlide] = useState(0); // Khởi tạo vị trí hiện tại của slide

    const slides = [
        "https://tiki.vn/blog/wp-content/uploads/2023/03/ba-na-hills.jpg",
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/10/6/1101769/Hoi-An-22.jpeg",
        "https://shipdoandemff.com/wp-content/uploads/2018/10/Tp-%C4%90%C3%A0-N%E1%BA%B5ng.jpg"
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return <>
        <div className="detail-tour">
            {/* phần slider tour */}
            {/* <div className="slider">
                <button onClick={prevSlide} className="nut-slider prev"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" strokeWidth="1" stroke="currentColor" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg></button>
                <div className="slider-wrap">
                    <div className="slider-main" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((slide, index) => (
                            <div className="slider-item" key={index}>
                                <img src={slide} alt={`slide-${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={nextSlide} className="nut-slider next"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" strokeWidth="1" stroke="currentColor" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg></button>
            </div> */}
            <div className="video-plane video-tour-detail">
                <video controls>
                    <source src="https://videos.pexels.com/video-files/3629518/3629518-hd_1920_1080_30fps.mp4"
                        type="video/mp4" />
                </video>
            </div>

            {/* phần content tour */}
            <div className="content-detail-tour">
                <h2 className="tour-title tour-detail-title">TOUR BÀ NÀ - ĐÀ NẴNG</h2>
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
                        <div className="value">Đà Nẵng</div>
                    </li>
                    <li>
                        <div className="key">Mô tả:</div>
                        <div className="value">Bà Nà là một khu du lịch nổi tiếng nằm trên núi Bà Nà, cách trung tâm thành phố Đà Nẵng khoảng 25 km về phía Tây Nam.</div>
                    </li>
                    <li className="li-detail-price">
                        <div className="key">Giá tiền:</div>
                        <div className="value">1.500.000VND</div>
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
