import { useContext } from "react"
import { AuthContext } from "../../../context/authContext"
import { useNavigate } from "react-router-dom"

function Tab_userInfor({ setCheckTour, setCheckVehicle }) {
    const navigation = useNavigate()
    const { Logout } = useContext(AuthContext)

    const handleLogOut_Mobile = () => {
        Logout()
        navigation("/")
    }

    return <>
        <section className="tab_userInfor">
            <ul className="ul_tab_userInfor">
                <li onClick={() => { setCheckTour(true); setCheckVehicle(false); }} className="li_tab_userInfor">
                    <i className="fa-regular fa-user"></i> Hồ sơ của tôi
                </li>
                <li onClick={() => { setCheckTour(false); setCheckVehicle(false); }} className="li_tab_userInfor">
                    <i className="fa-solid fa-newspaper"></i> Đơn hàng Tour
                </li>
                <li onClick={() => { setCheckTour(false); setCheckVehicle(true); }} className="li_tab_userInfor">
                    <i className="fa-solid fa-car"></i> Đơn hàng Xe
                </li>
                <li onClick={handleLogOut_Mobile} className="li_tab_userInfor logOut-mobile">
                    <i className="fa-solid fa-right-to-bracket"></i> Đăng xuất
                </li>
            </ul>
        </section>
    </>
}

export default Tab_userInfor
