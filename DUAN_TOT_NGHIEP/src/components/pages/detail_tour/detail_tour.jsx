
function Detail_tour({ name, price, location, description, videos, dateTour }) {
    const priceNumber = Number(price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');

    return <>
        <div className="detail-tour">

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
                        <div className="value">{location}</div>
                    </li>
                    <li>
                        <div className="key">Mô tả:</div>
                        <div style={{lineHeight: "1.5"}} className="value">{description}</div>
                    </li>
                    <li>
                        <div className="key">Lịch khởi hành:</div>
                        <div className="value d-flex-khoiHanh">
                            {dateTour?.length > 0 && dateTour.map((item,index) => {
                                return <div key={index} className="box-khoiHanh">{item}</div>
                            })}
                           
                         
                        </div>
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
