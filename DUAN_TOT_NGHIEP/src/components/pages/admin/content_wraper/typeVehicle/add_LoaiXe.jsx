import { useState } from "react";
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { errorVehicle } from "../../../../../redux/vehicleType_slice";
import { createTypeVehicle } from "../../../../../redux/action_vehicle";

function Add_LoaiXe() {
    let dispatch = useDispatch()
    const [isPopupVisible, setPopupVisible] = useState(false); // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
    let iserrorVehicle = useSelector((state) => state.vehicleSL.iserrorVehicle)
    function handlePopup() {
        setPopupVisible(!isPopupVisible);
        dispatch(errorVehicle(""))
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    

    function handleAddVehicle(data) {
        if (data.name && data.description) {
            dispatch(createTypeVehicle(data.name, data.description))
            reset(); // xóa dữ liệu trên input khi add thành công
        } else {
            console.log("Vui lòng nhập đủ thông tin");
            
        }
        setPopupVisible(false)
    }
    
    return <>

        <div className={`${isPopupVisible ? "overlay-admin" : ""}`}>
            <div className={`box-popop ${isPopupVisible ? 'showPopup' : 'nonePopup'}`}>
                <form  onSubmit={handleSubmit(handleAddVehicle)}>
                    <div className="mb-3">
                        <label htmlFor="">Thêm khu vực</label>
                        <TextField {...register("name", { required: true })} className="textField-auth text-nameLoai" label="Thêm khu vực" size="small" variant="outlined" />
                        {errors.name && <span className="message-errors">Vui lòng không để trống*</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Mô tả</label>
                        <TextField {...register("description", { required: true })} className="textField-auth" label="Mô Tả" size="small" variant="outlined" />
                        {errors.description && <span className="message-errors">Vui lòng không để trống*</span>}
                    </div>

                    <div className="flex-btn-add">
                        <input type="button" onClick={handlePopup} value="Đóng" className="btn btn-primary back" />
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>

        <Button onClick={handlePopup} className="btn-add-manager" variant="contained">Thêm Mới</Button>
        {iserrorVehicle && <span style={{paddingLeft: "20px"}} className="message-errors">{iserrorVehicle}</span>}
    </>
}

export default Add_LoaiXe
