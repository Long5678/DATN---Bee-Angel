import "../../../publics/styles/hotel.scss"
import * as React from 'react';

function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN') + '₫';
}

function Item_hotel({changeHotel, id, name, location, price, imgUrl }) {

    return <>
        <div key={id} className="hotel-card">
            <div className="card-image">
                <img src={imgUrl} alt={name} />
                <div className="check-d">
                    <div className="location-tag">{location}</div>
                </div>

            </div>
            <div className="card-hotel-content">
                <h2>{name}</h2>
                {/* <div className="stars">★★★★★</div> */}
                <p>
                    Nhà hàng: Phục vụ ẩm thực Việt Nam và quốc tế.<br />
                    Hồ bơi: Hồ bơi ngoài trời và trong nhà tại một số cơ sở.<br />
                    Dịch vụ du lịch: Hỗ trợ đặt tour, xe đưa đón và hướng dẫn du
                    lịch.
                </p>
                <div className="card-hotel-footer">
                    <button className="select-btn" onClick={() => changeHotel(id, name, location, price, imgUrl)} >Chọn</button>
                    <div className="price">Giá {formatCurrency(price)}/Đêm</div>
                </div>

            </div>
        </div>
    </>
}


export default Item_hotel