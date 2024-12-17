import "../../../publics/styles/hotel.scss"
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import Item_hotel from "./item-hotel";
import CloseIcon from '@mui/icons-material/Close';
import img1 from '../../../publics/image/image.png';
import HotelDetail from "./detail.hotel";
import { PopupContext } from "../../../context/popupContext";


function MainHotel() {

    const [id1,setId] = useState("")
    const [name1,setName] = useState("Khách sạn Mường Thanh")
    const [location1,setLocation] = useState("Huế")
    const [price1,setPrice] = useState(1500000)
    const [imgUrl1,setImgUrl] = useState(img1)
    const { locationhotel,setLocationhotel,namehotel, setNamehotel, priceHotel, setPriceHotel,isChecked, setIsChecked} = useContext(PopupContext)

    useEffect(() => {
        setPriceHotel(isChecked ? price1 : 0); // Cập nhật giá khi khởi tạo
        setNamehotel(isChecked ? name1 : "")
        setLocationhotel(isChecked ? location1 : "")
    },[price1,name1,location1])

    const hotel = [
        {
            id: id1,
            name: name1,
            location: location1,
            price: price1,
            imgUrl: imgUrl1,
        },
    ]

    const changeHotel = (id, name, location, price, imgUrl) => {
        console.log("chọn");
        setId(id)
        setName(name)
        setLocation(location)
        setPrice(price)
        setImgUrl(imgUrl)
        setAnchorEl(null);
    }

    function formatCurrency(value) {
        return Number(value).toLocaleString('vi-VN') + '₫';
    }

    const hotels = [
        {
            id: 1,
            name: "Khách sạn Mường Thanh",
            location: "Huế",
            price: 1500000,
            imgUrl: img1,
        },
        {
            id: 2,
            name: "InterContinental Hotels",
            location: "Đà Nẵng",
            price: 1200000,
            imgUrl: img1,
        },
        {
            id: 3,
            name: "Melia Hotels & Resorts",
            location: "Quảng Nam",
            price: 1300000,
            imgUrl: img1,
        },
    ];

   
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("ok",event.currentTarget);
        
    };

    const handleClose = () => {
        setAnchorEl(null);
    };




    const open = Boolean(anchorEl);
    const idP = open ? 'simple-popover' : undefined;

    // const [isChecked, setIsChecked] = useState(false); // Khởi tạo là true để tự động tích


    // Xử lý khi một item được bấm vào
    const [anchorEls, setAnchorEls] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEls(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEls(null);
    };

    const opens = Boolean(anchorEls);


    const checkChangeHotel = (e) => {
        const checked = e.target.checked;
        setIsChecked(checked); // Cập nhật trạng thái checkbox

        // Cập nhật giá tiền dựa trên trạng thái checkbox
        if (checked) {
            setPriceHotel(price1);
            setNamehotel(name1);
            setLocationhotel(location1)
        } else {
            setPriceHotel(0); // Giá bằng 0 khi bỏ chọn
            setNamehotel("");
            setLocationhotel("")
        }
    }



    return <>
        {hotel.map(hotel => (
            <div key={hotel.id} className="hotel-card-M mt-3">
                <div className="card-image">
                    <img src={hotel.imgUrl} alt={name} />
                    <div className="check-d">
                        {/* <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} /> */}
                        <input type="checkbox" checked={isChecked} onChange={(e)=> checkChangeHotel(e)} />
                        <div className="location-tag">{hotel.location}</div>
                    </div>

                </div>
                <div className="card-hotel-content">
                    <Typography
                        aria-owns={opens ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        
                    >
                        <h2>{hotel.name}</h2>

                        {/* <div className="stars">★★★★★</div> */}
                        <p>
                            Nhà hàng: Phục vụ ẩm thực Việt Nam và quốc tế.<br />
                            Hồ bơi: Hồ bơi ngoài trời và trong nhà tại một số cơ sở.<br />
                            Dịch vụ du lịch: Hỗ trợ đặt tour, xe đưa đón và hướng dẫn du
                            lịch.
                        </p>
                    </Typography>
                    <Popover
                        id="mouse-over-popover"
                        sx={{ pointerEvents: 'none', backgroundColor: "rgba(0, 0, 0, 0.2);" }}
                      
                        open={opens}
                        anchorEl={anchorEls}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                        
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                        
                    >
                        <Typography sx={{ p: 1, width: 800}}><HotelDetail /></Typography>
                    </Popover>

                    <div className="card-hotel-footer">
                        <button aria-describedby={idP} className="select-btn" onClick={handleClick}>Xem Thêm</button>
                        <Popover
                            id={idP}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            sx={{ backgroundColor: "rgba(0, 0, 0, 0.2);" }}
                        >

                            <Typography sx={{ p: 1, width: 1000 }}>
                                <div className="hotel-list-container" >
                                    <button className="close-hotel-btn" onClick={handleClose}><CloseIcon fontSize="large" /> </button>
                                    <h1 className="title">Danh sách khách sạn</h1>
                                    <p className="subtitle">
                                        Khách sạn bạn chọn sẽ là nơi bạn nghỉ ngơi trong khi chuyến đi healing
                                    </p>
                                    <div className="hotel-list">
                                        {hotels.map((item, index) => {
                                            return <Item_hotel changeHotel={changeHotel} key={index} {...item} />
                                        })}
                                    </div>
                                </div>

                            </Typography>
                        </Popover>

                        <div className="price">Giá {formatCurrency(hotel.price)}/Đêm</div>
                    </div>

                </div>
            </div>
        ))}
    </>
}


export default MainHotel