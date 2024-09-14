// phần này là lịch trình của mỗi tour

function Plane_tour() {
    return <>
        <div className="main-list-tour">
            <div className="box-list-tour">
                <div className="tieuDe-tour">
                    <h2>Plane Tour</h2>
                </div>
                <div className="line-tour"></div>

                <div className="boxMain-plane-tour">

                    {/* plane tour */}
                    <div className="box-plane">
                        <div className="tour-plan">
                            <div className="day-plan">
                                <div className="day-number">
                                    <span>01</span>
                                </div>
                                <div className="day-details">
                                    <h2>Ngày 1: Khám Phá Cố Đô Huế</h2>
                                    <p>Bắt Đầu Chuyến Tham Quan Tại Đại Nội, Nơi Lưu Giữ Nhiều Dấu Tích Của Triều Đại Nguyễn. Bạn Có Thể
                                        Tham Quan Cửa Ngọ Môn, Điện Thái Hòa, Cung Diên Thọ, Thế Miếu, Và Nhiều Công Trình Khác.</p>
                                    <ul>
                                        <li>Chùa Thiên Mụ</li>
                                        <li>Thưởng Thức Ẩm Thực Huế</li>
                                        <li>Lăng Tự Đức</li>
                                        <li>Lăng Khải Định</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="day-plan">
                                <div className="day-number">
                                    <span>02</span>
                                </div>
                                <div className="day-details">
                                    <h2>Ngày 2: Khám Phá Các Làng Nghề Và Thắng Cảnh</h2>
                                    <p>Làng Nón Tây Hồ: Tham Quan Làng Nón Tây Hồ, Nơi Bạn Có Thể Tìm Hiểu Về Quy Trình Làm Nón Lá
                                        Truyền Thống Của Người Dân Huế. Làng Thanh Tiên: Thăm Làng Thanh Tiên Nổi Tiếng Với Nghề Làm Hoa
                                        Giấy, Một Trong Những Nghề Truyền Thống Có Từ Lâu Đời.</p>
                                    <ul>
                                        <li>Thưởng Thức Cơm Hến</li>
                                        <li>Đồi Vọng Cảnh</li>
                                        <li>Lăng Minh Mạng</li>
                                        <li>Khám Phá Ẩm Thực Đường Phố</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="day-plan">
                                <div className="day-number">
                                    <span>03</span>
                                </div>
                                <div className="day-details">
                                    <h2>Ngày 3: Trải Nghiệm Văn Hóa Và Lịch Sử</h2>
                                    <p>Kết Thúc Chuyến Đi: Quay Trở Lại Thành Phố Để Kết Thúc Hành Trình, Bạn Có Thể Tận Dụng Thời Gian
                                        Còn Lại Để Dạo Phố, Mua Sắm Thêm Hoặc Thưởng Thức Thêm Các Món Ăn Huế Trước Khi Chia Tay.</p>
                                    <ul>
                                        <li>Thưởng Thức Bún Thịt Nướng</li>
                                        <li>Điện Hòn Chén</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* video tour */}
                    <div className="box-video">
                        {/* <div className="video-plane">
                            <video controls>
                                <source src="https://videos.pexels.com/video-files/3629518/3629518-hd_1920_1080_30fps.mp4"
                                    type="video/mp4" />
                            </video>
                        </div> */}
                        <div className="box-imgVN">
                            <img src="https://media.istockphoto.com/id/583797510/fr/photo/vietnam-%C3%A9pingl%C3%A9-sur-la-carte-avec-drapeau.webp?a=1&b=1&s=612x612&w=0&k=20&c=S6ze9CsVIWJ4duqDFlk8EO69CtHCLgMu11Syl1gQjT8=" alt="" />
                        </div>
                        <div className="box-imgVN">
                            <img src="https://media.istockphoto.com/id/583797510/fr/photo/vietnam-%C3%A9pingl%C3%A9-sur-la-carte-avec-drapeau.webp?a=1&b=1&s=612x612&w=0&k=20&c=S6ze9CsVIWJ4duqDFlk8EO69CtHCLgMu11Syl1gQjT8=" alt="" />
                        </div>
                        <div className="box-imgVN">
                            <img src="https://media.istockphoto.com/id/583797510/fr/photo/vietnam-%C3%A9pingl%C3%A9-sur-la-carte-avec-drapeau.webp?a=1&b=1&s=612x612&w=0&k=20&c=S6ze9CsVIWJ4duqDFlk8EO69CtHCLgMu11Syl1gQjT8=" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Plane_tour
