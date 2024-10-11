import '../../../publics/styles/BookingSuccess.scss' // Import CSS file for styling

const DepositSuccess = () => {
    return (
        <div className="deposit-success-container">
            <div className="icon-success">
                <span>✔️</span>
            </div>
            <h2>Đặt cọc thành công</h2>
            <p>Cảm ơn quý khách đã đặt tour tại Bee Angel.</p>

            <div className="deposit-details">
                <div className="detail-row">
                    <span className="label">Mã đơn hàng</span>
                    <span className="value">#01234</span>
                </div>
                <div className="detail-row">
                    <span className="label">Tên tour</span>
                    <span className="value">Tour 3 ngày 2 đêm đi huế</span>
                </div>
                <div className="detail-row">
                    <span className="label">Số điện thoại</span>
                    <span className="value">0866194596</span>
                </div>
                <div className="detail-row">
                    <span className="label">Số người</span>
                    <span className="value">1 Người lớn - 1 Trẻ em</span>
                </div>
                <div className="detail-row">
                    <span className="label">Ngày bắt đầu và kết thúc</span>
                    <span className="value">15/08/2024 - 18/08/2024</span>
                </div>
                <div className="detail-row">
                    <span className="label">Địa điểm đón</span>
                    <span className="value">65 Nguyễn Chánh, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</span>
                </div>
                <div className="detail-row">
                    <span className="label">Tổng chi phí của tour</span>
                    <span className="value">1.000.000 VND</span>
                </div>
                <div className="detail-row">
                    <span className="label">Tiền đã đặt cọc</span>
                    <span className="value">500.000 VND</span>
                </div>
                <div className="detail-row">
                    <span className="label">Hạn chót thanh toán phần còn lại</span>
                    <span className="value">15/08/2024</span>
                </div>
                <div className="detail-row">
                    <span className="label">Số tiền còn lại cần thanh toán</span>
                    <span className="value red">500.000 VND</span>
                </div>
                <div className="detail-row">
                    <span className="label">Phương thức thanh toán</span>
                    <span className="value">Paypal</span>
                </div>
            </div>
        </div>
    );
};

export default DepositSuccess;
