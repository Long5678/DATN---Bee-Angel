import { useContext, useEffect, useState } from "react"
import "../../../publics/styles/list-tour.scss"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/authContext"
import axios from "axios"

function Item_tour({_id, name, price, status, description, images }) {
    const { user, setOpen } = useContext(AuthContext)
    const [avgRating, setAvgRating] = useState(0); 

    const navigation = useNavigate()
    // Kiểm tra xem content có độ dài lớn hơn 100 ký tự không
    const shortenedContent = description.length > 100 ? `${description.slice(0, 100)}...` : description;

    function handleDetail() {
        // lấy id của nó
        navigation(`/detail?id=${_id}`)
    }

    function handleDatTour(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
        navigation(`/bookTour?id=${_id}`)
    }


    // console.log("dữ liệu", name, price, status, location, description, images[0]);
    const priceNumber = Number(price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');


    // sao
    useEffect(() => {
        // Gọi API để lấy trung bình số sao
        const fetchAverageRating = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Rating/${_id}/average-rating`); // Giả sử bạn có route này
                setAvgRating(response.data.avgRating);
            } catch (error) {
                console.error("Lỗi khi lấy trung bình số sao:", error);
            }
        };

        fetchAverageRating();
    }, [_id]); // Chạy khi _id (tức tourId) thay đổi
    
    return <>
        <section className="tour-item">
            <section className="tour-image-block">
                {/* <img src={images[0]} alt="Đại Nội Huế" className="tour-image" /> */}
                <img onClick={handleDetail} src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${images[0]}?alt=media`} alt="Đại Nội Huế" className="tour-image" />
            </section>
            <section className="tour-info">
                <div className="tour-meta">
                    <span className="rating"><i className="fa-solid fa-star"></i>{avgRating.toFixed(1)}</span>
                    {/* <span className="location"><i className="fa-solid fa-location-dot"></i>{location}</span> */}
                </div>
                <h2 onClick={handleDetail} className="tour-title">{name}</h2>
                <p onClick={handleDetail} className="tour-description">{shortenedContent}</p>
                <div className="d-flex">
                    <p className="tour-price">Price <span>{formatPrice}</span><sup>đ</sup></p>
                    {user ?
                        <button className="book-button" onClick={(e) => handleDatTour(e)}>Đặt Tour</button>
                        :
                        <button onClick={() => setOpen(true)} className="book-button">Đặt Tour</button>
                    }
                    {/* <p>{status}</p> */}

                </div>

            </section>
        </section>
    </>
}


export default Item_tour