import { useState } from "react";
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { createDanhMuc } from "../../../../../redux/action_thunk";
import { errorDM } from "../../../../../redux/danhMuc_slice";

function Add_DM() {
    let dispatch = useDispatch()
    const [isPopupVisible, setPopupVisible] = useState(false); // state này để ẩn hiện popup khi click vào thêm mới hoặc đóng
    let isErrorDM = useSelector((state) => state.danhMucSL.isErrorDM)
    function handlePopup() {
        setPopupVisible(!isPopupVisible);
        // khi mở popup dm thì cho cái lỗi name danh mục tồn tại biến mất
        dispatch(errorDM(""))
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    
    function handleAddDM(data) {
        if (data.name && data.description) {
            dispatch(createDanhMuc(data.name, data.description))
            reset(); // xóa dữ liệu trên input khi add thành công
        } else {
            console.log("Vui lòng nhập đủ thông tin");
            
        }
        setPopupVisible(false)
    }
    
    return <>

        <div className={`${isPopupVisible ? "overlay-admin" : ""}`}>
            <div className={`box-popop ${isPopupVisible ? 'showPopup' : 'nonePopup'}`}>
                <form onSubmit={handleSubmit(handleAddDM)} >
                    <div className="mb-3">
                        <label htmlFor="">Tên loại</label>
                        <TextField {...register("name", { required: true })} className="textField-auth text-nameLoai" label="Tên Loại" size="small" variant="outlined" />
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
        {isErrorDM && <span style={{paddingLeft: "20px"}} className="message-errors">{isErrorDM}</span>}
    </>
}

export default Add_DM