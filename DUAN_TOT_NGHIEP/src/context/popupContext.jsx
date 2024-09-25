import { createContext, useState, } from "react";

export const PopupContext = createContext();

export const PopupContextProvider = ({ children }) => {
    const [isPopupEdit, setPopupEdit] = useState(false); // state này để ẩn hiện popup khi click vào nút edit
    const [isPopupDetailUser, setIsPopupDetailUser] = useState(false) // state này để check user co nhấn đẻtail để hiện popup hay ko
    const [checkCurrentChat, setCheckCurrentChat] = useState(true) //state này để check là admin có nhấn vào đoạn chat tk nào ko
    function handlePopupEdit() {
        setPopupEdit(!isPopupEdit);
    }


    return <PopupContext.Provider
        value={{
            isPopupEdit,
            setPopupEdit,
            handlePopupEdit,
            checkCurrentChat, 
            setCheckCurrentChat,
            isPopupDetailUser, 
            setIsPopupDetailUser
        }}>
        {children}
    </PopupContext.Provider>
}