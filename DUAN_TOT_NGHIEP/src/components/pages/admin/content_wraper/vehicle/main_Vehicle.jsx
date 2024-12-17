
import ListVehicle from './list_Vehicle'
import EditVehicle from './edit_Vehicle'
import AddVehicle from './add_Vehicle'

const MainVehicle = () => {
  return <>
  <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Xe</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Xe</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <EditVehicle/>
    <AddVehicle/>
    <ListVehicle/>

  </>
}

export default MainVehicle
