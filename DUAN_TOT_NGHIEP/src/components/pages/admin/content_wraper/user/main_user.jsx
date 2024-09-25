import Page_TourManager from "../tourManager/page_TourManager"
import ListUser from "./listUser"

function Main_user() {
  return <>
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Khách Hàng</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Khách Hàng</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <ListUser />
    <Page_TourManager />
  </>
}

export default Main_user