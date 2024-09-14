import "../../../publics/styles/gioithieu.scss"
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import img1 from '../../../publics/image/about-us-img-2 1.png';
import img2 from '../../../publics/image/image.png';
import img3 from '../../../publics/image/about1.png';
import img4 from '../../../publics/image/about2.png';
import img5 from '../../../publics/image/about3.png';
import img6 from '../../../publics/image/about4.png';
import img7 from '../../../publics/image/about5.png';
import img8 from '../../../publics/image/about6.png';

function About() {
    return (
        <section className="about">
            <h4>Trang Web Đặt Vé Du Lịch Hàng Đầu</h4>
            <p>
                Chào mừng bạn đến với Bee Angel –
                nơi mang đến những trải nghiệm du lịch hoàn hảo và thuận tiện nhất cho mọi khách hàng.
                Bee Angel không chỉ là một trang web đặt vé du lịch, mà còn là người bạn đồng hành đáng
                tin cậy trên mỗi hành trình khám phá thế giới của bạn.
            </p>
            <p>
                Bee Angel được thành lập với sứ mệnh mang đến dịch vụ đặt
                vé du lịch nhanh chóng, tiện lợi và an toàn. Chúng tôi tự
                hào là một trong những công ty hàng đầu trong lĩnh vực du
                lịch, luôn nỗ lực để đáp ứng mọi nhu cầu của khách hàng
                từ việc đặt thuê xe và tour du lịch.
            </p>
            <div className='about-img'>
                <div className='img-left'>
                    <Col xs={16} md={14}>
                        <Image src={img3} fluid />
                    </Col>
                    <Col xs={16} md={14}>
                        <Image src={img4} fluid />
                    </Col>
                    <Col xs={16} md={14}>
                        <Image src={img5} fluid />
                    </Col>
                </div>
                <div className='img-right'>
                    <Col xs={16} md={14}>
                        <Image src={img2} />
                    </Col>
                </div>
            </div>
            {/* <div className='img-down'>

                <Col xs={16} md={14} className='about-margin' >
                    <Image src={img6} />
                </Col>
                <Col xs={16} md={14}>
                    <Image src={img7} />
                </Col>
            </div> */}
            {/* <Col xs={16} md={14}>
                <Image src={img8} />
            </Col> */}
        </section>
    );
}

export default About;