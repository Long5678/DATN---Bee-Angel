import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false);  // này là hiện component auth
    const [check, setCheck] = useState(true) // này để check là login hay componet register
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    const [registerErr, setRegisterErr] = useState(null); // set lỗi 400 register
    const [loginErr, setLoginErr] = useState(null); // set lỗi 400 register
    const [user, setUser] = useState(null); // state lưu user người dùng

    useEffect(() => {
        const loadUser = () => {
            const userData = localStorage.getItem("userBEE");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        loadUser();
    }, [])


    const Register = async (data) => {
        try {
            let res = await axios.post(`http://localhost:3000/auth/register`, {
                name: data.name,
                email: data.email,
                password: data.pass,
                phone: data.phone,
                role: data.role,
            })
            console.log("Đăng ký thành công", res);
            setCheck(false)
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setRegisterErr(error.response.data)
            } else {
                console.log("Đăng ký thất bại !");
            }
        }
    }


    const Login = async (data) => {
        try {
            console.log(data.email, data.password);
            
            let res = await axios.post(`http://localhost:3000/auth/login`, {
                email: data.email,
                password: data.password,
            });
            console.log(res.data);
            localStorage.setItem("userBEE", JSON.stringify(res.data))
            window.location.href = "/";

        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data);
                setLoginErr(error.response.data)
            }
            else {
                console.log("Đăng nhập thất bại !");
            }

        }
    }

    const Logout = () => {
        localStorage.removeItem("userBEE");
        setUser(null)
    }


    return <AuthContext.Provider
        value={{
            user,
            Register,
            Login,
            registerErr,
            loginErr,
            setLoginErr,
            open, 
            setOpen,
            check, 
            setCheck,
            handleOpen,
            handleClose,
            Logout
        }}>
        {children}
    </AuthContext.Provider>
}