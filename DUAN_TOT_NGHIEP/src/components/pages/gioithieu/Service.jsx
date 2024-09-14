import "../../../publics/styles/gioithieu.scss"
import img1 from '../../../publics/image/about-us-img-2 1.png';
import img2 from '../../../publics/image/273 1.png';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
function Services() {
    return (
        <section className="services">
            <Col xs={6} md={14}>
                <Image src={img1} rounded />
            </Col>
            <h4>Dịch Vụ Của Chúng Tôi</h4>
            <p>
                Đặt Vé Xe: Tìm kiếm và đặt vé xe khách,
                xe du lịch với nhiều tuyến đường và mức
                giá hợp lý, đảm bảo an toàn và tiện lợi
                cho mọi chuyến đi.
            </p>
            <p>
                Tour Du Lịch: Chúng tôi cung cấp các gói
                tour du lịch đa dạng, từ du lịch trong
                nước đến quốc tế, giúp bạn khám phá những
                điểm đến mới lạ và tận hưởng những trải
                nghiệm độc đáo.
            </p>
            <Col xs={16} md={12}>
                <Image src={img2} rounded />
            </Col>
        </section>
    );
}

export default Services;