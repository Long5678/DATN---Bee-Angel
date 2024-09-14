import "../../publics/styles/footer.scss"

function Footer() {
    return <>
        {/* <!-- Hero Slide --> */}
        <section className="hero-section">
            <div className="overlay">
                <div className="hero-text">
                    <h1>Đà Nẵng điểm đến thu hút nhiều khách du lịch</h1>
                    <p>Khám phá những nét đẹp độc đáo và thưởng thức không gian đậm chất văn hóa</p>
                    <p>việc nghỉ ngơi tại vùng đất này sẽ cho bạn những trải nghiệm khó quên.</p>
                </div>
            </div>
        </section>

        {/* <!-- Footer --> */}
        <footer>
            <div className="footer-container">
                <section className="footer-section">
                    <h4>Về chúng tôi</h4>
                    <ul>
                        <li>Câu Truyện</li>
                        <li>Tại sao chúng tôi</li>
                        <li>Cách làm việc</li>
                        <li>Câu hỏi</li>
                    </ul>
                </section>
                <section className="footer-section">
                    <h4>Về địa điểm</h4>
                    <ul>
                        <li>Thành phố Huế</li>
                        <li>Đà nẵng</li>
                        <li>Hội an</li>
                        <li>Quảng nam</li>
                    </ul>
                </section>
                <section className="footer-section">
                    <h4>Cảm hứng</h4>
                    <ul>
                        <li>Khám phá thiên nhiên</li>
                        <li>Di tích</li>
                        <li>Địa danh</li>
                        <li>Lịch sử</li>
                        <li>Danh lam thắng cảnh</li>
                    </ul>
                </section>
                <section className="footer-section">
                    <h4>Hỗ trợ</h4>
                    <ul>
                        <li>Hỗ trợ</li>
                        <li>Địa chỉ</li>
                        <li>Chính sách bảo mật</li>
                        <li>Dịch vụ</li>
                        <li>Khiếu nại</li>
                    </ul>
                </section>
            </div>

            <section className="footer-subscribe">
                <div className="subscribe-text">
                    <p className="tex1">Đăng kí gửi bài cho chúng tôi</p>
                    <p>Để có bộ sưu tập được tuyển chọn hằng tuần gồm 3 nội dung bạn có thể xem, đọc hoặc nghe.</p>
                </div>
                <form className="subscribe-form">
                    <input type="email" placeholder="BeeAngel@gmail.com" />
                    <button type="submit">Gửi đến hòm thư</button>
                </form>
            </section>

            <section className="footer-bottom">
                <p>BEE ANGEL</p>
            </section>
        </footer>

    </>
}

export default Footer