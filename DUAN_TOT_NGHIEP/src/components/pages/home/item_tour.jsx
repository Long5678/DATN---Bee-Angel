import { useContext } from "react"
import "../../../publics/styles/list-tour.scss"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/authContext"

function Item_tour({_id, name, price, status, location, description, images }) {
    const { user, setOpen } = useContext(AuthContext)

    const navigation = useNavigate()
    // Kiểm tra xem content có độ dài lớn hơn 100 ký tự không
    const shortenedContent = description.length > 100 ? `${description.slice(0, 100)}...` : description;

    function handleDetail() {
        // lấy id của nó
        navigation(`/detail?id=${_id}`)
    }

    function handleDatTour(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
        navigation(`/datTour?id=${_id}`)
    }


    // console.log("dữ liệu", name, price, status, location, description, images[0]);
    const priceNumber = Number(price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');
    
    return <>
        <section className="tour-item">
            <section className="tour-image-block">
                {/* <img src={images[0]} alt="Đại Nội Huế" className="tour-image" /> */}
                <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${images[0]}?alt=media`} alt="Đại Nội Huế" className="tour-image" />
            </section>
            <section className="tour-info">
                <div className="tour-meta">
                    <span className="rating"><i className="fa-solid fa-star"></i>5.0</span>
                    <span className="location"><i className="fa-solid fa-location-dot"></i>{location}</span>
                </div>
                <h2 onClick={handleDetail} className="tour-title">{name}</h2>
                <p className="tour-description">{shortenedContent}</p>
                <div className="d-flex">
                    <p className="tour-price">Price <span>{formatPrice}</span> VND</p>
                    {/* {user ?
                        <button className="book-button" onClick={(e) => handleDatTour(e)}>Đặt Vé</button>
                        :
                        <button onClick={() => setOpen(true)} className="book-button">Đặt Vé</button>
                    } */}
                    <p>{status}</p>

                </div>

            </section>
        </section>
    </>
}


export default Item_tour