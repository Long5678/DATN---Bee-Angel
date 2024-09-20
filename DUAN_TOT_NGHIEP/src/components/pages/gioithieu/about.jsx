import image from '../../../publics/image/images/image2.png'
import image2 from '../../../publics/image/images/bg-style.png'
import teamimg from '../../../publics/image/images/teamimg.jpg'
import aboutus from '../../../publics/image/images/about.png'
const About = () => {
  return <>
    <div className='main_GT'>
      <section className='title-section'>
        <h1>Giới thiệu Bee Angel</h1>
      </section>

      <section className="intro-section">
        <div className="text-content">
          <h2>Trang Web Đặt Vé Du Lịch Hàng Đầu</h2>
          <p>
            Chào mừng bạn đến với Bee Angel  nơi mang đến những trải nghiệm du lịch hoàn hảo và thuận tiện nhất cho mọi khách hàng. Bee Angel không chỉ là một trang web đặt vé du lịch, mà còn là người bạn đồng hành đáng tin cậy trên mỗi hành trình khám phá thế giới của bạn.
          </p>
          <p>
            Bee Angel được thành lập với sứ mệnh mang đến dịch vụ đặt vé du lịch nhanh chóng, tiện lợi và an toàn. Chúng tôi tự hào là một trong những công ty hàng đầu trong lĩnh vực du lịch, luôn nỗ lực để đáp ứng mọi nhu cầu của khách hàng từ việc đặt thuê xe và tour du lịch.
          </p>
        </div>
        <div className="image-content">
          <img src={aboutus} alt="Travel Image" className="polaroid" />
        </div>
      </section>


      <section className="services">
        <div className="service-images">
          <img src="https://th.bing.com/th/id/R.142d23f18a1cf51614fdd0b8a555680a?rik=mL7K%2ftCIXuRfzw&pid=ImgRaw&r=0" alt="Tour 1" />
          <img src="https://th.bing.com/th/id/R.142d23f18a1cf51614fdd0b8a555680a?rik=mL7K%2ftCIXuRfzw&pid=ImgRaw&r=0" alt="Tour 2" />
          <img src="https://th.bing.com/th/id/R.142d23f18a1cf51614fdd0b8a555680a?rik=mL7K%2ftCIXuRfzw&pid=ImgRaw&r=0" alt="Tour 3" />
        </div>
        <div className="service-description">
          <h2>Dịch Vụ Của Chúng Tôi</h2>
          <p>
            Chúng tôi tự hào với các tour độc quyền, dịch vụ chuyên nghiệp và những trải nghiệm riêng tư, an toàn, để mỗi chuyến đi của bạn trở thành kỷ niệm đáng nhớ.
          </p>
          <p>
            Đặt Vé Xe: Tìm kiếm và đặt vé xe khách, xe du lịch với nhiều tuyến đường và mức giá hợp lý, đảm bảo an toàn và tiện lợi cho mọi chuyến đi.
          </p>
          <p>
            Tour Du Lịch: Chúng tôi cung cấp các gói tour du lịch đa dạng, từ du lịch trong nước đến quốc tế, giúp bạn khám phá những điểm đến mới lạ và tận hưởng những trải nghiệm độc đáo.
          </p>
          <div className="service-images2">
            <img src={image} alt="Travel icon" />
          </div>
        </div>
      </section>




      <section className="why-choose">
        <div className='why-title'>
          <h2 className="why-choose-heading">Tại Sao Chọn Bee Angel?</h2>
          <div className='why-desc'>
            <p className="why-choose-description">Dịch Vụ Chất Lượng: Cam kết mang đến dịch vụ tốt nhất với đội ngũ nhân viên chuyên nghiệp, nhiệt tình và giàu kinh nghiệm.</p>

            <ul className="why-choose-list">
              <li>Tiện Lợi và Nhanh Chóng: Giao diện trang web thân thiện, dễ sử dụng, giúp bạn đặt vé chỉ trong vài bước đơn giản.</li>
              <li>Giá Cả Cạnh Tranh: Cung cấp nhiều chương trình khuyến mãi hấp dẫn, giúp bạn tiết kiệm chi phí.</li>
              <li>Hỗ Trợ 24/7: Luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn mọi lúc, mọi nơi.</li>
            </ul>
          </div>
        </div>

        <div className="images-container">
          <div className="image-why">
            <img src={teamimg} alt="Our Team" className="team-image" />
            <div className="image-right">
              <img src={image2} alt="Another view" />
            </div>
          </div>


        </div>


      </section>

      <section className='section-3'>
        <div className='sec-link'>
          <p className="sec-choose-footer">Hãy để Bee Angel cùng bạn đồng hành trên mọi chặng đường...</p>
          <a href="" className="sec-choose-link">Truy cập ngay beeangel.com để bắt đầu hành trình khám phá của bạn!</a>
        </div>
      </section>



      <section className="team">
        <h2>CV của các thành viên</h2>
        <div className="team-members">
          <div className="member">
            <div className="member-card member-1">
              <img src="https://th.bing.com/th/id/OIP.rM_IfqIbgNJy_9P3AzxLdAAAAA?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Trần Lê Anh" className="member-img" />
              <div className="member-info">
                <h3>Trần Lê Anh</h3>
                <p>Thành Viên</p>
                <p>tleaanh.dev@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-card member-2">
              <img src="https://th.bing.com/th/id/OIP.rM_IfqIbgNJy_9P3AzxLdAAAAA?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Nguyễn Văn B" className="member-img" />
              <div className="member-info">
                <h3>Nguyễn Văn B</h3>
                <p>Thành Viên</p>
                <p>nguyenvanb@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-card member-3">
              <img src="https://th.bing.com/th/id/OIP.rM_IfqIbgNJy_9P3AzxLdAAAAA?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Nguyễn Văn C" className="member-img" />
              <div className="member-info">
                <h3>Nguyễn Văn C</h3>
                <p>Thành Viên</p>
                <p>nguyenvanc@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-card member-4">
              <img src="https://th.bing.com/th/id/OIP.rM_IfqIbgNJy_9P3AzxLdAAAAA?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Nguyễn Văn D" className="member-img" />
              <div className="member-info">
                <h3>Nguyễn Văn D</h3>
                <p>Thành Viên</p>
                <p>nguyenvand@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-card member-5">
              <img src="https://th.bing.com/th/id/OIP.rM_IfqIbgNJy_9P3AzxLdAAAAA?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Nguyễn Văn E" className="member-img" />
              <div className="member-info">
                <h3>Nguyễn Văn E</h3>
                <p>Thành Viên</p>
                <p>nguyenvane@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="member">
            <div className="member-card member-6">
              <img src="https://th.bing.com/th/id/OIP.rM_IfqIbgNJy_9P3AzxLdAAAAA?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Nguyễn Văn F" className="member-img" />
              <div className="member-info">
                <h3>Nguyễn Văn F</h3>
                <p>Thành Viên</p>
                <p>nguyenvanf@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  </>
};

export default About;
