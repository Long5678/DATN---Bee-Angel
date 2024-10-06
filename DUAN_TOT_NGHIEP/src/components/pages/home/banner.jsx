import "../../../publics/styles/header.scss";
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import flatpickr from "flatpickr"; // Nhập flatpickr
import "flatpickr/dist/flatpickr.css"; // Nhập CSS của flatpickr
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDanhMuc, getTourByNameAnDateTour } from "../../../redux/action_thunk";

function Banner() {
    let dispatch = useDispatch()
    let danhMucDatas = useSelector((state) => state.danhMucSL.danhMucDatas)
    const [valueTour, setValueTour] = useState("");
    const [checkDM, setCheckDM] = useState(false); // state này kiểu khi focus vào input đi đâu thì hiện ra list dm
    const [selectedDate, setSelectedDate] = useState(""); // State để lưu giá trị ngày
    const dateInputRef = useRef(null); // Tạo ref cho input
    const dmRef = useRef(null); // ref cho danh mục

    useEffect(() => {
        // Khởi tạo flatpickr
        flatpickr(dateInputRef.current, {
            dateFormat: "d-m-Y", // Định dạng ngày
            locale: {
                firstDayOfWeek: 1 // Ngày đầu tuần là Thứ Hai
            },
            onChange: (selectedDates, dateStr, instance) => {
                setSelectedDate(dateStr); // Cập nhật state khi ngày thay đổi
            }
        });
        
    }, []);

    // hàm này khi focus vào input bạn đi đâu thì sẽ hiện các danh mục tour đó
    const focusInput = () => {
        setCheckDM(true);
    };

    const changeInput = (value) => {
        setValueTour(value);
    };

    const handleBlur = (e) => {
        // Kiểm tra nếu không focus vào danh mục hoặc input thì ẩn danh mục
        // Nếu relatedTarget là null, thì ẩn danh mục
        if (!e.relatedTarget || dmRef.current.contains(e.relatedTarget)) {
            setCheckDM(false);
        }
    };

    useEffect(() => {
        dispatch(getAllDanhMuc())
    }, []);


    // search tour theo yêu cầu
    const filterSearch = () => {
        const [day,month,year] = selectedDate.trim().split("-");
        const dateTour = `${day}/${month}`
        dispatch(getTourByNameAnDateTour(valueTour, dateTour))
    }

    return (
        <article className="main-banner">
            <img src="/src/publics/image/banner0.jpg" alt="" />

            <section className="content-banner">
                <div className="content-banner-title">Cuộc sống là những hành trình Hãy cứ đi khi cuộc đời cho phép</div>
                <p>Chào mừng đến với Bee Angel ấm cúng của chúng tôi nằm giữa lòng núi! Cabin của chúng tôi là nơi nghỉ ngơi hoàn hảo cho những ai tìm kiếm sự bình yên và thư giãn trong bối cảnh thiên nhiên.</p>

                <section className="box-list-inp">
                    <div className="box-inp">
                        <div className="icon-inp"><MapIcon /></div>
                        <input
                            value={valueTour}
                            onChange={(e) => changeInput(e.target.value)}
                            onFocus={focusInput}
                            onBlur={handleBlur} // xử lý khi mất focus
                            type="text"
                            placeholder="Bạn muốn đi đâu?"
                        />
                        {checkDM && (
                            <section className="banner-inp-listDM" ref={dmRef} tabIndex="-1">
                                {danhMucDatas.map((item, index) => {
                                    return <div key={index} onMouseDown={() => setValueTour(item.name)} className="banner-inp-itemDM" tabIndex="0"><i className="fa-solid fa-location-dot"></i><strong>{item.name}</strong></div>
                                })}
                            </section>
                        )}
                    </div>

                    <div className="box-tour">
                        <div className="icon-inp"><CalendarMonthIcon /></div>
                        <input type="text" ref={dateInputRef} placeholder="Ngày đi" />
                    </div>
                    <button onClick={filterSearch} className="btn-search">Tìm kiếm</button>
                </section>
            </section>
        </article>
    );
}

export default Banner;
