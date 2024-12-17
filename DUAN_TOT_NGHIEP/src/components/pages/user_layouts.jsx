import Footer from "../layouts/footer"
import { Outlet } from "react-router-dom";
import Header from "../layouts/header";
function User_layouts() {
    return <>
        {/* <Header /> */}
        <Outlet />
        <Footer />
    </>
}

export default User_layouts
