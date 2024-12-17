import TourForm from "./TourForm"
import TourDetail from "./TourDetail"
import Header from "../../layouts/header"
import MainHotel from "../hotel/main-hotel";
function Main_datTour() {
    return <>
        <Header />
        <div className="tour-main-title">
            <div className='tour-title'>
                <h1>Đặt Vé Ngay</h1>
                <p>Khách hàng rất quan trọng</p>
            </div>
            <div className="main-content">
                <TourForm />
                <TourDetail />



            </div>
        </div>
    </>
}

export default Main_datTour
