import { useContext, useEffect, useState } from 'react';
import { PopupContext } from '../../../../../context/popupContext';
import { useDispatch, useSelector } from 'react-redux';
import { updateVehicle } from '../../../../../redux/action_vehicle';

function Edit_LoaiXe() {
    let dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { isPopupEdit, handlePopupEdit } = useContext(PopupContext)
    const vehicleOne = useSelector((state) => state.vehicleSL.vehicleOne)
    
     // Effect này để ví dụ như mà click vào edit thì nó sẽ hiện one 1 loại xe vào input, 
    // và mình có thẻ change vào input để đổi chữ
    useEffect(() => {
        if (vehicleOne) {
            setName(vehicleOne.name || "");
            setDescription(vehicleOne.description || "");
        }
    }, [vehicleOne]);

  
    const handleUpdateVehicle = () => {
        dispatch(updateVehicle(vehicleOne?._id, name, description));
        handlePopupEdit();
    }

    return <>
        <div className={`${isPopupEdit ? "overlay-admin" : ""}`}>
            <div className={`box-popop ${isPopupEdit ? 'showPopup' : 'nonePopup'}`}>
                    <div className="mb-3">
                        <label htmlFor="">Thêm khu vực</label>
                        <input onChange={(e) => setName(e.target.value)} value={name}  type="text" className="form-control" placeholder="Thêm khu vực"  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Mô tả</label>
                        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" className="form-control" placeholder="Mô tả"  />
                    </div>

                    <div className="flex-btn-add">
                        <input type="button" onClick={handlePopupEdit} value="Đóng" className="btn btn-primary back" />
                        <input onClick={handleUpdateVehicle} type="button" className="btn btn-primary" value="Cập nhật" />
                    </div>
            </div>
        </div>
    </>
}

export default Edit_LoaiXe
