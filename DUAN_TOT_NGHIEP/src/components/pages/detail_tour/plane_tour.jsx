// phần này là lịch trình của mỗi tour

function Plane_tour({ planes = [] , images = []}) {
    console.log("images", images);

    let data = planes.map((item, index) => {
        return <>
            <div key={index} className="day-plan">
                <div className="day-number">
                    <span>{index + 1}</span>
                </div>
                <div className="day-details">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <ul>
                        {item.ul_lists.map((li, liIndex) => {
                            return <li key={liIndex}>{li}</li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    })

    return <>
        <div className="main-list-tour">
            <div className="box-list-tour">
                <div className="tieuDe-tour">
                    <h2>Plane Tour</h2>
                </div>
                <div className="line-tour"></div>

                <div className="boxMain-plane-tour">

                    {/* plane tour */}
                    <div className="box-plane">
                        <div className="tour-plan">
                            {data}
                        </div>
                    </div>

                    {/* video tour */}
                    <div className="box-video">
                        {images.map((img, index) => {
                            return <>
                                <div key={index} className="box-imgVN">
                                    <img src={`https://firebasestorage.googleapis.com/v0/b/bee-angel.appspot.com/o/products%2F${img}?alt=media`} alt="" />
                                </div>
                            </>
                        })}
                        {/* <div className="box-imgVN">
                            <img src="https://media.istockphoto.com/id/583797510/fr/photo/vietnam-%C3%A9pingl%C3%A9-sur-la-carte-avec-drapeau.webp?a=1&b=1&s=612x612&w=0&k=20&c=S6ze9CsVIWJ4duqDFlk8EO69CtHCLgMu11Syl1gQjT8=" alt="" />
                        </div>
                        <div className="box-imgVN">
                            <img src="https://media.istockphoto.com/id/583797510/fr/photo/vietnam-%C3%A9pingl%C3%A9-sur-la-carte-avec-drapeau.webp?a=1&b=1&s=612x612&w=0&k=20&c=S6ze9CsVIWJ4duqDFlk8EO69CtHCLgMu11Syl1gQjT8=" alt="" />
                        </div>
                        <div className="box-imgVN">
                            <img src="https://media.istockphoto.com/id/583797510/fr/photo/vietnam-%C3%A9pingl%C3%A9-sur-la-carte-avec-drapeau.webp?a=1&b=1&s=612x612&w=0&k=20&c=S6ze9CsVIWJ4duqDFlk8EO69CtHCLgMu11Syl1gQjT8=" alt="" />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Plane_tour
