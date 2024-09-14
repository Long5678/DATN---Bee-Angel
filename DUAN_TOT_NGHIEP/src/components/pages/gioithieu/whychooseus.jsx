import "../../../publics/styles/gioithieu.scss"
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import img8 from '../../../publics/image/about6.png';

function WhyChooseUs() {
    return (
        <section className="why-choose-us">
            <div className="why-choose-us-left">
                <h4>Tại Sao Chọn Bee Angel?</h4>
                <p>Dịch Vụ Chất Lượng: Cam kết mang đến
                    dịch vụ tốt nhất với đội ngũ nhân viên
                    chuyên nghiệp, nhiệt tình và giàu kinh nghiệm.
                </p>
                <p>
                    Tiện Lợi và Nhanh Chóng: Giao diện trang web thân
                    thiện, dễ sử dụng, giúp bạn đặt vé chỉ trong vài bước đơn giản.
                </p>
                <p>
                    Giá Cả Cạnh Tranh: Cung cấp nhiều chương trình khuyến mãi hấp dẫn,
                    giúp bạn tiết kiệm chi phí.
                </p>
                <p>

                    Hỗ Trợ 24/7: Luôn sẵn sàng hỗ trợ và giải đáp
                    mọi thắc mắc của bạn mọi lúc, mọi nơi.
                </p>
            </div>
            <Col xs={16} md={14}>
                <Image src={img8} roundedCircle fluid />
            </Col>
        </section>
    );
}

export default WhyChooseUs;