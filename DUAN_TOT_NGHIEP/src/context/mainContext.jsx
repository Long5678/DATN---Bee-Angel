import { createContext } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  

    return <MainContext.Provider
        value={{

        }}>
        {children}
    </MainContext.Provider>
}