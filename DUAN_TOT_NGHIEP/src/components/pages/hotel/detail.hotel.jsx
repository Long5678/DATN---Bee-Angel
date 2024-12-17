import "../../../publics/styles/hotel.scss"
import img1 from '../../../publics/image/image.png';
function HotelDetail() {
    return (<>
        <h1 className="hotel-name">Melia Hotels & Resorts</h1>
        <div className="hotel-detail">
            {/* Phần bên trái: Thông tin khách sạn */}

            <div className="hotel-info">

                <div className="hotel-price">
                    Giá <span className="highlight">1.500.000</span>₫/Đêm
                </div>

                <div className="hotel-description">
                    <h3>Mô tả</h3>
                    <p>
                        Phòng nghỉ sang trọng: Phòng được thiết kế hiện đại, tiện nghi với
                        các lựa chọn từ phòng tiêu chuẩn đến suite cao cấp.
                    </p>
                    <p>
                        Nhà hàng & Ẩm thực: Melia nổi tiếng với các nhà hàng quốc tế, phục vụ
                        đa dạng món ăn từ ẩm thực địa phương đến quốc tế.
                    </p>
                    <p>
                        Hồ bơi: Hồ bơi ngoài trời rộng, nhà được thiết kế tinh tế, thuận tiện
                        cho việc thư giãn.
                    </p>
                    <p>
                        Dịch vụ đặt tour: Hỗ trợ khách hàng đặt tour tham quan, vé máy bay, và
                        các dịch vụ du lịch khác.
                    </p>
                </div>

                {/* Nút bấm */}
                {/* <div className="hotel-buttons">
                    <button className="btn btn-primary">Xem KS Khác</button>
                    <button className="btn btn-secondary">Chọn Khách sạn</button>
                </div> */}
            </div>

            {/* Phần bên phải: Hình ảnh */}
            <div className="hotel-images">
                <div className="main-image">
                    <img src={img1} alt="Main" />
                </div>
                {/* <div className="small-images">
                    <img src={img1} alt="Small 1" />
                    <img src={img1} alt="Small 2" />
                </div> */}
            </div>
        </div>
    </>
    );
}

export default HotelDetail;
