import guideIcon from '../../../publics/image/images/guide-icon.png';
import travelIcon from '../../../publics/image/images/travel-icon.png'


function BestService() {
  return <>
      <div className="best-service-container">
          <div className="service-item">
              <div className="icon-container">
                  <img src={guideIcon} alt="Guide" className="icon" />
              </div>
              <h2 className="service-title">Hướng dẫn viên</h2>
              <p className="service-description">
                  Hướng dẫn tận tình chu đáo và thông thạo địa hình và nhiều thứ tiếng.
              </p>
          </div>

          <div className="service-item">
              <div className="icon-container">
                  <img src={travelIcon} alt="Travel" className="icon" />
              </div>
              <h2 className="service-title">Di chuyển</h2>
              <p className="service-description">
                  Di chuyển nhanh gọn và tổng hợp được những chuyến đi đáng nhớ.
              </p>
          </div>
      </div>
  </>
}

export default BestService
