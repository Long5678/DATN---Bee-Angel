import TextField from '@mui/material/TextField';
import { useState } from 'react';
function Item_profileEdit({ handleCancle, handleSave, label, setValueForm, valueForm, phoneErr, setPhoneErr }) {
    const [validateForm, setValidateForm] = useState(false)

    // check trường dữ liệu mà để trống thì hiện thông báo, còn ko thì save
    const handleCheckSave = () => {
        if (valueForm === "") {
            setValidateForm(true)
        } else {
            handleSave()
            setValidateForm(false)
        }
    }

    return <>
        <section className="section_body_profile">
            <div className="section_title">
                {label === "Giới tính" &&
                    <select value={valueForm} onChange={(e) => setValueForm(e.target.value)} className="form-select" aria-label="Default select example">
                        {/* <option selected>chọn giới tính</option> */}
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>}
                {label === "Ngày sinh" &&
                    <input
                        type="date"
                        value={valueForm}
                        onChange={(e) => setValueForm(e.target.value)}
                        className="form-control"
                        placeholder="birth day"
                        max={new Date().toISOString().split("T")[0]} // Lấy ngày hôm nay và thiết lập làm giá trị max
                    />}
                {label === "Số điện thoại" && <TextField type='number' value={valueForm} onChange={(e) => { setValueForm(e.target.value); setPhoneErr("") }} className="textField-auth custom-number" label={label} size="small" variant="outlined" />}
                {label != "Giới tính" && label !== "Ngày sinh" && label !== "Số điện thoại" && <TextField value={valueForm} onChange={(e) => { setValueForm(e.target.value) }} className="textField-auth" label={label} size="small" variant="outlined" />}
                {validateForm && <span style={{ color: "red", fontSize: "0.9rem" }}>Vui lòng nhập đầy đủ thông tin</span>}
                {phoneErr && <span style={{ color: "red", fontSize: "0.9rem" }}>{phoneErr}</span>}
            </div>
            <div className="cancle_save">
                <button className="li_value" onClick={handleCancle}>Hủy</button>
                <button className="save_profile" onClick={handleCheckSave}>Lưu</button>
            </div>
        </section>
    </>
}

export default Item_profileEdit
