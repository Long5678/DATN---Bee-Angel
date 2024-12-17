import MainHotel from "../hotel/main-hotel";

function Information_Tour({ name, description, price, images }) {
    const shortenedContent = description?.length > 80 ? `${description.slice(0, 100)}...` : description;
    const priceNumber = Number(price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');

  return <>
      <section className="main_information-bookTour">
          <section className="tour-item">
              <section className="tour-image-block">
                {images?.length > 0 && images 
                ?
                      <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${images[0]}?alt=media`} alt="Đại Nội Huế" className="tour-image" />
                :
                <span>ảnh lỗi</span>
                }
                 
              </section>
              <section className="tour-info">
                  <div className="tour-meta">
                      <span className="rating"><i className="fa-solid fa-star"></i>5.0</span>
                  </div>
                  <h2 className="tour-title">{name}</h2>
                  <p className="tour-description">{shortenedContent}</p>
                  <div className="d-flex">
                      <p className="tour-price">Price <span>{formatPrice}</span><sup>đ</sup></p>
                  </div>

              </section>
              
          </section>
          <MainHotel/>
         
      </section>
  </>
}

export default Information_Tour