import { useContext } from "react";
import "../../../publics/styles/listxe.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
function Item_Xe({_id,name, motorcycleBrand, images, description, price }) {
  const { user, setOpen } = useContext(AuthContext);

  const navigation = useNavigate();


  function handleDetail() {
    navigation(`/detail-car?id=${_id}`);
  }

  function handleDatXe(e) {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan lên phần tử cha
    navigation(`/formdatxe?id=${_id}`);
  }
  function formatCurrency(value) {
    return Number(value).toLocaleString('vi-VN') + "đ";
}

  const truncateText = (text, wordLimit = 25) => {
    const words = text.split(' '); // Tách đoạn văn bản thành mảng các từ
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + ' ...'; // Cắt và nối lại với '...'
    }
    return text; // Trả về đoạn văn bản gốc nếu không vượt quá giới hạn
  };
  const truncatedContent = truncateText(description, 25);
  return (
    <>
      <section className="xe-item">
        <section className="xe-image-block">
            {images?.length > 0 
            ?
            <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/vehicles%2F${images[0]}?alt=media`} alt="xe" className="xe-image" />
        :
          <span>ảnh lỗi</span>
        }
         
        </section>
        <section className="xe-info">
          <div className="xe-meta">
            <span className="rating">
              <i className="fa-solid fa-star"></i>5.0
            </span>
          </div>
          <div className="d-flex-car">
            <h2 onClick={handleDetail} className="Xe-title">
              {name}
            </h2>
            <h4>
                {motorcycleBrand}
            </h4>
          </div>
          <p className="xe-description">{truncatedContent}</p>
          <div className="d-flex">
            <p className="xe-price">
              Price <span>{formatCurrency(price)}</span>
            </p>
            {user ? (
              <button onClick={handleDatXe} className="book-button">
               Đặt Xe
              </button>
            ) : (
              <button onClick={() => setOpen(true)} className="book-button">
                Đặt Xe
              </button>
            )}
          </div>
        </section>
      </section>
    </>
  );
}

export default Item_Xe;
