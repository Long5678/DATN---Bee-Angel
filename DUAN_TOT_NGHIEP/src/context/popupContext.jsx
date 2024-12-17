import { createContext, useState, } from "react";

export const PopupContext = createContext();

export const PopupContextProvider = ({ children }) => {
    const [isPopupEdit, setPopupEdit] = useState(false); // state này để ẩn hiện popup khi click vào nút edit danh mục
    const [isPopupTBtour, setPopupTBtour] = useState(false);
    const [isPopupEditTour, setPopupEditTour] = useState(false); // state này để ẩn hiện popup khi click vào nút edit Tour
    const [isPopupDetailUser, setIsPopupDetailUser] = useState(false) // state này để check user co nhấn đẻtail để hiện popup hay ko
    const [checkCurrentChat, setCheckCurrentChat] = useState(true) //state này để check là admin có nhấn vào đoạn chat tk nào ko
    const [refundAmount, setRefundAmount] = useState(null); // State to hold refund amount
    const [idOrder, setidOrder] = useState(null); // State to hold refund amount
    const [priceHotel, setPriceHotel] = useState(0);
    const [namehotel, setNamehotel] = useState("");
    const [locationhotel, setLocationhotel] = useState("");
    const [isChecked, setIsChecked] = useState(false); // State to hold refund amount
    const [isPopupTBCar, setPopupTBCar] = useState(false);
    const [isPopupDetails, setPopupDetails] = useState(false); // state này để ẩn hiện popup khi click vào nút chi tiết
    const [isPopupOrderVehicle, setPopupOrderVehicle] = useState(false); // state này để ẩn hiện popup khi click vào nút chi tiết
    const [isPopupEditCars, setPopupEditCars] = useState(false); // state này để ẩn hiện popup khi click vào nút edit Car
    const [isDetailOrderCar, setIsDetailOrderCar] = useState(false); 
    const [ok, setok] = useState(0); 
    const [isPopupEditBlog, setPopupEditBlog] = useState(false); // state này để ẩn hiện popup khi click vào nút edit Blog
    function handlePopupEdit() {
        setPopupEdit(!isPopupEdit);
    }

    function handlePopupOrderVehicle() {
        setPopupOrderVehicle(!isPopupOrderVehicle);
    }

    function handlePopupDetails() {
        setPopupDetails(!isPopupDetails);
    }


    return <PopupContext.Provider
        value={{
            isPopupEdit,
            setPopupEdit,
            handlePopupEdit,
            checkCurrentChat,
            setCheckCurrentChat,
            isPopupDetailUser,
            setIsPopupDetailUser,
            isPopupEditTour,
            setPopupEditTour,
            isPopupTBtour,
            setPopupTBtour,
            refundAmount,
            setRefundAmount,
            idOrder, 
            setidOrder,
            priceHotel, 
            setPriceHotel,
            locationhotel,
            setLocationhotel,
            namehotel,
            setNamehotel,
            isChecked, 
            setIsChecked,
            isPopupEditCars,
            setPopupEditCars,
            isPopupDetails,
            handlePopupDetails,
            setPopupDetails,
            isPopupOrderVehicle, setPopupOrderVehicle,
            handlePopupOrderVehicle,
            isPopupTBCar,
            setPopupTBCar,
            isDetailOrderCar, 
            setIsDetailOrderCar,
            ok, setok,
            isPopupEditBlog, setPopupEditBlog
        }}>
        {children}
    </PopupContext.Provider>
}
