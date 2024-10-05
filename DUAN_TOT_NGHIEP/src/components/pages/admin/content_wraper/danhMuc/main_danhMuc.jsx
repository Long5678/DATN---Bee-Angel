import Message_Alert from "../../../../layouts/message_Alert";
import Add_DM from "./add_DM"
import Edit_DM from "./edit_DM";
import List_DM from "./list_DM"
import { useSelector } from 'react-redux';

function Main_danhMuc() {
    const isErrorDelDM = useSelector((state) => state.danhMucSL.isErrorDelDM)
    console.log("err", isErrorDelDM);

    return <>
        {isErrorDelDM && <Message_Alert type_message="message-alert-error" message="Không thể xóa danh mục này!" duration={3000} />}
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Danh mục</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Danh muc</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <Edit_DM />
        <Add_DM />
        <List_DM />
    </>
}

export default Main_danhMuc