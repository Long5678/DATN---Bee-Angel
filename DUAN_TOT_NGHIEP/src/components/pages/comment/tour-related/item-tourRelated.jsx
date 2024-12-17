
function Item_tourRelated({ _id, name, price, description, images }) {

    const shortenedContent = description.length > 48 ? `${description.slice(0, 48)}...` : description;
    const priceNumber = Number(price); // chuyển thành kiểu number
    const formatPrice = priceNumber.toLocaleString('vi-VN');
    return <>
        <section className="itemTour-related">
            <div className="imgTour">
                <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${images[0]}?alt=media`} alt="ảnh lỗi" />
            </div>

            <div className="content-tour-related">
                <div className="name-tour-related">{name}</div>
                <div className="description-tour-related">{shortenedContent}</div>
                <div className="price-tour-related">{formatPrice}<sup>đ</sup></div>

                {/* <div className="name-tour-related">Huế 2N1Đ</div>
                <div className="description-tour-related">Khám phá cảnh quang Đà Nẵng với những khung cảnh đặc sắ</div>
                <div className="price-tour-related">2.000.000 VNĐ</div> */}
            </div>
        </section>
    </>
}

export default Item_tourRelated