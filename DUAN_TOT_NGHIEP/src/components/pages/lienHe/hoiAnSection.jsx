import hoiAnImage from '../../../publics/image/images/hoian.jpg';
function HoiAnSection() {
  return <>
      <div className="hoian-section" style={{ backgroundImage: `url(${hoiAnImage})` }}>
          <div className="overlay">
              <h2>Hội An điểm đến thu hút nhiều khách du lịch</h2>
              <p>Hội An là một điểm đến không thể bỏ lỡ với vẻ đẹp cổ kính, những con đường ngập tràn ánh đèn và phong cảnh tuyệt vời.</p>
          </div>
      </div>
  </>
}

export default HoiAnSection
