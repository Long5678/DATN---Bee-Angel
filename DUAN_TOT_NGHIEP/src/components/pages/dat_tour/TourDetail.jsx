import { useState } from "react"
import "../../../publics/styles/datTour.scss"
import Celander from "./celander"
function TourDetail() {
    const arrTG = ["2N1D", "2N3D", "1 Tuần"];

    // State lưu giá trị của checkbox được chọn
    const [selectedDuration, setSelectedDuration] = useState(arrTG[0]);

    const handleCheck = (value) => {
        // Nếu giá trị đã chọn, click lại thì bỏ chọn, nếu chưa chọn thì chọn checkbox đó
        setSelectedDuration(value === selectedDuration ? "" : value);
    };

    let datas = arrTG.map((item, index) => {
        return <label key={index}><input type="checkbox" checked={selectedDuration === item}  onChange={() => handleCheck(item)}  value={item} />{item}</label>
    })

    return <>
        <div className="div-box-tourDetail-right">
            <div className="tour-details-card">
                <div className="tour-image-details">
                    <img src="https://cdn.media.dulich24.com.vn/diemden/kinh-thanh-hue-5562/kinh-thanh-hue.jpg" alt="Đại Nội Huế" />
                    {/* <FaPlayCircle className="play-icon" /> */}
                </div>
                <div className="tour-info">
                    <div className="tour-header">
                        <div className="tour-rating">
                            <i className="fa-solid fa-star"></i>
                            <span>5.0</span>
                        </div>
                        <div className="tour-location">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Huế</span>
                        </div>
                    </div>
                    <h3>Đại Nội Huế</h3>
                    <p className="p_tourInfo">
                        Kinh Thành Huế, hoàn thành dưới triều Minh Mạng sau 27 năm xây dựng, là một phần quan trọng của Cố đô Huế.
                    </p>
                    <div className="tour-duration">
                        {datas}
                    </div>
                    <div className="tour-price-thanhToan">
                        <span className="price-name">Price</span>
                        <span className="price-amount">1.500.000VNĐ</span>
                        {/* <span className="price-currency">VDN</span> */}
                    </div>
                </div>
            </div>

            <Celander />
        </div>
    </>
}

export default TourDetail
