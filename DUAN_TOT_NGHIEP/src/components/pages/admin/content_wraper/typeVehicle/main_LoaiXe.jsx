import { useSelector } from "react-redux";
import Message_Alert from "../../../../layouts/message_Alert";
import Add_LoaiXe from "./add_LoaiXe";
import Edit_LoaiXe from "./edit_LoaiXe";
import List_LoaiXe from "./list_LoaiXe";

function Main_LoaiXe() {
    const isErrorDelVehicle = useSelector((state) => state.vehicleSL.isErrorDelVehicle)
    console.log("err", isErrorDelVehicle);

    return <>
      {isErrorDelVehicle && <Message_Alert type_message="message-alert-error" message="Không thể xóa danh mục này!" duration={3000} />}
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Danh mục xe</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Danh muc xe</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <Edit_LoaiXe/>
        <Add_LoaiXe />
        <List_LoaiXe />
    </>
}

export default Main_LoaiXe
