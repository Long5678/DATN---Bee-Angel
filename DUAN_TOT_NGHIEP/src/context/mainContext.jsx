import { createContext } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  

    return <MainContext.Provider
        value={{

            Register,
            Login,
            registerErr,
            loginErr,
            open, 
            setOpen,
            check, 
            setCheck,
            handleOpen,
            handleClose
        }}>
        {children}
    </MainContext.Provider>
}