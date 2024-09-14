import "../../../publics/styles/lienHe.scss"
import Header from "../../layouts/header"
import TourForm from "./tourForm"
import BestService from "./bestService"
import MapEmbed from "./mapEmbed"
import HoiAnSection from "./hoiAnSection"
function Main_lienHe() {
  return <>
     <Header />
      <div className="main-content2">
          <div className="form-and-service">
              <div className="form-container">
                  <TourForm />
              </div>
              <div className='d-flex'>
                  <div className="tour-details-container">
                      <BestService />
                  </div>
                  <div className="map-container">
                      <MapEmbed />
                  </div>
              </div>
          </div>
      </div>
      {/* <HoiAnSection /> */}
  </>
}

export default Main_lienHe
