import { createContext, useState, } from "react";

export const PopupContext = createContext();

export const PopupContextProvider = ({ children }) => {
    const [isPopupEdit, setPopupEdit] = useState(false); // state này để ẩn hiện popup khi click vào nút edit
    function handlePopupEdit() {
        setPopupEdit(!isPopupEdit);
    }


    return <PopupContext.Provider
        value={{
            isPopupEdit,
            setPopupEdit,
            handlePopupEdit
        }}>
        {children}
    </PopupContext.Provider>
}