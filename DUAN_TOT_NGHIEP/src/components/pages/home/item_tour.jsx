import { useContext } from "react"
import "../../../publics/styles/list-tour.scss"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/authContext"
// import StarIcon from '@mui/icons-material/Star';
function Item_tour({ title, price, title_child, image, content }) {
    const { user, setOpen } = useContext(AuthContext)

    const navigation = useNavigate()
    // Kiểm tra xem content có độ dài lớn hơn 100 ký tự không
    // const shortenedContent = content.length > 100 ? `${content.slice(0, 100)}...` : content;

    function handleDetail() {
        navigation("/detail")
    }

    function handleDatTour(e) {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
        navigation("/datTour")
    }
    return <>
        <section className="tour-item">
            <section className="tour-image-block">
                <img src={image} alt="Đại Nội Huế" className="tour-image" />
            </section>
            <section className="tour-info">
                <div className="tour-meta">
                    <span className="rating"><i className="fa-solid fa-star"></i>5.0</span>
                    <span className="location"><i className="fa-solid fa-location-dot"></i>Huế</span>
                </div>
                <h2 onClick={handleDetail} className="tour-title">{title_child}</h2>
                <p className="tour-description">The red and orange sand of the desert are very beautiful, s take a trip here The red and orange sand of the desert are very beautiful, s take a trip here</p>
                <div className="d-flex">
                    <p className="tour-price">Price <span>{price}</span> VND</p>
                    {user ?
                        <button className="book-button"><a href="/datTour">Đặt Vé</a></button>
                        :
                        <button onClick={() => setOpen(true)} className="book-button">Đặt Vé</button>
                    }

                </div>

            </section>
        </section>
    </>
}


export default Item_tour