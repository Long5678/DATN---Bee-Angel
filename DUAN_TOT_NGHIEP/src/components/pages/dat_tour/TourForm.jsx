import "../../../publics/styles/datTour.scss"
function TourForm() {
    return <>
        <div className="tour-form-container2">
            <div className="tour-form">
                <h2>Chi tiết thanh toán</h2>
                <form>
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input type="text" placeholder="vui lòng nhập" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="vui lòng nhập" />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input type="tel" placeholder="vui lòng nhập" />
                    </div>

                    {/* New wrapper div for the two related fields */}
                    <div className="form-group-wrapper">
                        <div className="form-group">
                            <label>Số lượng du khách</label>
                            <input type="number" placeholder="vui lòng nhập" min={1} max={10} />
                        </div>
                        <div className="form-group">
                            <label>Số Trẻ Nhỏ (Dưới 1m)</label>
                            <input type="number" placeholder="vui lòng nhập" min={1} max={10} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Mã giảm giá</label>
                        <input type="text" placeholder="Nếu có" />
                    </div>
                    <div className="form-group">
                        <label>Đặt xe</label>
                        <input type="text" placeholder="Nếu Muốn" />
                    </div>
                </form>
            </div>

            <div className="additional-info">
                <div className="form-group">
                    <label>Ghi chú</label>
                    <textarea placeholder="Không bắt buộc"></textarea>
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">Tôi đồng ý điều khoản mà website đưa ra</label>
                </div>
                <button type="submit">Thanh toán</button>
            </div>
        </div>
    </>
}

export default TourForm
