import Footer from "../layouts/footer"
import { Outlet } from "react-router-dom";
function User_layouts() {
    return <>
        <Outlet />
        <Footer />
    </>
}

export default User_layouts
