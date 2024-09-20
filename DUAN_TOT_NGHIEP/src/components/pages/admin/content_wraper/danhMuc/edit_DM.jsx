import { useContext, useState, useEffect } from 'react';
import { PopupContext } from '../../../../../context/popupContext';
import { useSelector, useDispatch } from 'react-redux';
import { updateDanhMuc } from '../../../../../redux/action_thunk';

function Edit_DM() {
    let dispatch = useDispatch()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { isPopupEdit, handlePopupEdit } = useContext(PopupContext)
    const danhMucOne = useSelector((state) => state.danhMucSL.danhMucOne)

    // Effect này để ví dụ như mà click vào edit thì nó sẽ hiện one 1 danh mục vào input, 
    // và mình có thẻ change vào input để đổi chữ
    useEffect(() => {
        if (danhMucOne) {
            setName(danhMucOne.name || "");
            setDescription(danhMucOne.description || "");
        }
    }, [danhMucOne]);

    const handleUpdateDM = () => {
        dispatch(updateDanhMuc(danhMucOne?._id, name, description));
        handlePopupEdit();
    }

    return <>
        <div className={`${isPopupEdit ? "overlay-admin" : ""}`}>
            <div className={`box-popop ${isPopupEdit ? 'showPopup' : 'nonePopup'}`}>
                    <div className="mb-3">
                        <label htmlFor="">Tên loại</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Tên loại"  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Mô tả</label>
                        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" className="form-control" placeholder="Mô tả"  />
                    </div>

                    <div className="flex-btn-add">
                        <input type="button" onClick={handlePopupEdit} value="Đóng" className="btn btn-primary back" />
                        <input onClick={handleUpdateDM} type="button" className="btn btn-primary" value="Cập nhật" />
                    </div>
            </div>
        </div>
    </>
}

export default Edit_DM