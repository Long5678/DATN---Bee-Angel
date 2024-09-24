import { useState } from "react";
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { createDanhMuc } from "../../../../../redux/action_thunk";

function Add_DM() {
    let dispatch = useDispatch()
    const [isPopupVisible, setPopupVisible] = useState(false); // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
    function handlePopup() {
        setPopupVisible(!isPopupVisible);
    }

    const { register, handleSubmit, formState: { errors }, } = useForm()
    
    function handleAddDM(data) {
        dispatch(createDanhMuc(data.name, data.description))
        setPopupVisible(false)
    }
    
    return <>

        <div className={`${isPopupVisible ? "overlay-admin" : ""}`}>
            <div className={`box-popop ${isPopupVisible ? 'showPopup' : 'nonePopup'}`}>
                <form onSubmit={handleSubmit(handleAddDM)} >
                    <div className="mb-3">
                        <label htmlFor="">Tên loại</label>
                        <TextField {...register("name", { required: true })} className="textField-auth text-nameLoai" label="Tên Loại" size="small" variant="outlined" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Mô tả</label>
                        <TextField {...register("description", { required: true })} className="textField-auth" label="Mô Tả" size="small" variant="outlined" />
                    </div>

                    <div className="flex-btn-add">
                        <input type="button" onClick={handlePopup} value="Đóng" className="btn btn-primary back" />
                        <input type="submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>

        <Button onClick={handlePopup} className="btn-add-manager" variant="contained">Thêm Mới</Button>
    </>
}

export default Add_DM