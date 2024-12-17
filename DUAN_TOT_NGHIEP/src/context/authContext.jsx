import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { jwtDecode } from "jwt-decode";

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

    // const refreshAccessToken = async () => {
    //     console.log("có vào token ");
        
    //     const userData = JSON.parse(localStorage.getItem("userBEE"));
    //     if (!userData || !userData.token) return;

    //     try {
    //         const res = await axios.post(`http://localhost:3000/auth/refresh-token`, {
    //             token: userData.token,
    //         });

    //         // Cập nhật token mới vào localStorage và state
    //         const updatedUserData = { ...userData, token: res.data.token }; // Đảm bảo res.data.token là chuỗi
    //         localStorage.setItem("userBEE", JSON.stringify(updatedUserData));
    //         setUser(updatedUserData); // Cập nhật state user
    //     } catch (error) {
    //         console.log("Làm mới token thất bại:", error);
    //         Logout();
    //     }
    // };


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const userData = localStorage.getItem("userBEE");
    //         if (userData) {
    //             const { token } = JSON.parse(userData);
    //             // Kiểm tra xem token có phải là chuỗi không
    //             if (typeof token !== "string") {
    //                 console.error("Token không hợp lệ:", token);
    //                 return; // Dừng nếu token không phải là chuỗi
    //             }

    //             const isTokenExpiring = () => {
    //                 try {
    //                     const decodedToken = jwtDecode(token);
    //                     return decodedToken.exp * 1000 < Date.now() + 60000; // 1 phút trước khi hết hạn
    //                 } catch (error) {
    //                     console.error("Lỗi khi giải mã token:", error);
    //                     return false; // Trả về false nếu có lỗi
    //                 }
    //             };

    //             if (isTokenExpiring()) {
    //                 refreshAccessToken();
    //             }
    //         }
    //     }, 180000); // Kiểm tra mỗi  giây

    //     return () => clearInterval(interval);
    // }, []);


    const Register = async (data) => {
        console.log("cc", data);

        try {
            let res = await axios.post(`http://localhost:3000/auth/register`, {
                name: data.name,
                email: data.email,
                password: data.pass,
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