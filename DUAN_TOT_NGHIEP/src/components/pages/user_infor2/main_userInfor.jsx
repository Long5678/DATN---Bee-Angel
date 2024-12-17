import "../../../publics/styles/user_infor.scss"
import "../../../publics/styles/historyOrder.scss"
// import "../../../publics/styles/reponsive/rp-auth.scss"
import Header from "../../layouts/header"
import Tab_userInfor from "./tab_userInfor"
import Profile_userInfor from "./profile_userInfor"
import HistoryOrder from "./history_order/historyOrder"
import { useContext, useState } from "react"
import Detail_orderHTY from "./history_order/detail_orderHTY"
import { PopupContext } from "../../../context/popupContext"
import Detail_fasleTour from "./history_order/detail_fasleTour"
import Detail_orderHTY_Car from "./history_orderVehicle/detail_orderHTY_Car"
import Detail_FasleCar from "./history_orderVehicle/detail_fasleCar"
import HistoryOrder_Vehicle from "./history_orderVehicle/historyOrder_Vehicle"


function Main_userInfor() {
  const [checkTour, setCheckTour] = useState(true)
  const [checkVehicle, setCheckVehicle] = useState(false)

  const { isPopupEdit, isPopupTBtour, isPopupEditCars, isPopupTBCar } = useContext(PopupContext)

  return <>
    <Header />
    <main className="main_userInfor">
      <article className="article-userInfor">
        <Tab_userInfor setCheckTour={setCheckTour} setCheckVehicle={setCheckVehicle} />
        
        {checkTour && <Profile_userInfor />}
        
        {!checkTour && checkVehicle && <HistoryOrder_Vehicle />}
        
        {!checkTour && !checkVehicle && <HistoryOrder />}

        {isPopupEdit && <Detail_orderHTY />}
        {isPopupTBtour && <Detail_fasleTour />}
        {isPopupEditCars && <Detail_orderHTY_Car />}
        {isPopupTBCar && <Detail_FasleCar />}
      </article>
    </main>
  </>
}

export default Main_userInfor

