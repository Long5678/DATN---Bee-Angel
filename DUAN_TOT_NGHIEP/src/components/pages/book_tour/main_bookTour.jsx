import Header from "../../layouts/header"
import "../../../publics/styles/bookTour.scss"
import Form_bookTour from "./form_bookTour"
import Information_Tour from "./information_Tour"
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getOneTour } from "../../../redux/action_thunk";
import "../../../publics/styles/reponsive/rp-bookTour.scss"


function Main_bookTour() {
    let dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const idTour = searchParams.get("id"); // lấy id tour từ url
    let tourOne = useSelector((state) => state.tourSL.tourOne)

    useEffect(() => {
        if (idTour) {
            dispatch(getOneTour(idTour))
        }
        window.scrollTo(0, 0);
    }, [idTour])

    console.log("form",tourOne);
    
    return <>
        <Header />
        <section className="main-bookTour">
            <section className="title-bookTour">
                <h1>Đặt Tour Ngay</h1>
                <p>Khách hàng rất quan trọng, vui lòng nhập đúng thông tin</p>
            </section>

            <section className="d-flex-bookTour">
                <Form_bookTour  {...tourOne} />
                <Information_Tour {...tourOne} />
            </section>
        </section>
    </>
}

export default Main_bookTour