import { useContext, useEffect, useState } from "react"
import Item_profile from "./item_profile";
import Item_profileEdit from "./item_profileEdit";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { AuthContext } from "../../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { confirmPassword, getOneUser, updateUser } from "../../../redux/action_thunk";
import Loading from "../../layouts/loading";
import TextField from '@mui/material/TextField';
import { checkConfirmPass, errUser } from "../../../redux/user_slice";


function Profile_userInfor() {
    const dispatch = useDispatch();

    const { user, checkUserEdit, setCheckUserEdit } = useContext(AuthContext)
    const [valueForm, setValueForm] = useState(""); // state này để chứa name hoặc các thông tin khác của user
    // const [keyValue, setKeyValue] = useState(""); // state này là cái key , vd như name hay address đồ, để bik là khi cập nhật là bik nó sẽ cập nhật key nào
    const [checkField, setCheckField] = useState(null)
    const [passConfirm, setPassConfirm] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [phoneErr, setPhoneErr] = useState("");
    const userOne = useSelector((state) => state.userSL.userOne)
    let isLoadingDM = useSelector((state) => state.danhMucSL.isLoadingDM)
    let isConfirmPass = useSelector((state) => state.userSL.isConfirmPass)
    let isErrUser = useSelector((state) => state.userSL.isErrUser)

    console.log("userOne", userOne);

    const handleEdit = (field) => {
        setCheckField(field); // Khi chỉnh sửa, cập nhật trạng thái với tên của trường
    };

    const handleCancle = () => {
        setCheckField(null);
        setValueForm("")
        dispatch(checkConfirmPass(""))
        setPassConfirm("")
        setPassword("")
        setNewPassword("")
        setPhoneErr("")
    }

    const handleSave = () => {
        console.log(checkField, valueForm);
        if (checkField === "phone") {
            if (valueForm.length == 10 && valueForm[0] == 0 && (valueForm[1] == 3 || valueForm[1] == 5 || valueForm[1] == 7 || valueForm[1] == 8 || valueForm[1] == 9)) {
                const formData = new FormData();
                formData.append(`${checkField}`, valueForm);
                dispatch(updateUser(userOne?._id, formData, "text"))
                setCheckField(null); // Sau khi lưu, cho phép chỉnh sửa các trường khác
                setValueForm("")
                setCheckUserEdit(!checkUserEdit) // kiểu khi mà cập nhật user thành công thì cập nhật lại luôn ở trên header 
                setPhoneErr("")
            } else {
                console.log("Số điện thoại không hợp lệ");
                setPhoneErr("Số điện thoại không hợp lệ")
            }
        } else {
            const formData = new FormData();
            formData.append(`${checkField}`, valueForm);
            dispatch(updateUser(userOne?._id, formData, "text"))
            setCheckField(null); // Sau khi lưu, cho phép chỉnh sửa các trường khác
            setValueForm("")
            setCheckUserEdit(!checkUserEdit) // kiểu khi mà cập nhật user thành công thì cập nhật lại luôn ở trên header 
        }

    };

    useEffect(() => {
        if (user) {
            dispatch(getOneUser(user?._id))
        }
    }, [user])

    // hàm cập nhật ảnh
    function onChangeFile(e) {
        let avatar = e.target.files[0];
        const formData = new FormData();
        formData.append("name", userOne.name);
        formData.append("email", userOne.email);
        formData.append("phone", userOne.phone);
        formData.append("address", userOne.address);
        formData.append("gender", userOne.gender);
        formData.append("birth_day", userOne.birth_day);
        formData.append(`avatar`, avatar);

        dispatch(updateUser(userOne?._id, formData, "img"))
        setCheckUserEdit(!checkUserEdit)
    }

    const handleCheckPassConfirm = (value) => {
        setPassConfirm(value)
        dispatch(errUser(""))
    }

    const handleUpdatePass = () => {
        const formData = new FormData();
        formData.append(`password`, password);
        dispatch(updateUser(userOne?._id, formData, "text"))
        dispatch(checkConfirmPass(""))
        setCheckField(null);
        setPassConfirm("")
        setPassword("")
        setNewPassword("")
    }

    return <>
        {isLoadingDM &&
            <div className="overlay-await-bookTour">
                <div className="loaderBookTour"></div>
                <span className="span-bookTour"> Vui lòng đợi ...</span>
            </div>
        }
        <section className="profile_userInfor">
            {/* <form action=""> */}
            <section className="head_profile">
                <section className="box_head">
                    <div>
                        <h1>Thông tin cá nhân</h1>
                        <span className="head_span">Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</span>
                    </div>
                    <div className="avatr_profile">
                        {userOne.avatar ?
                            <img src={userOne.avatar} alt="" />
                            :
                            <img src="/src/publics/image/avatar_null.jpg" alt="" />
                        }
                    </div>
                </section>

                <section>
                    <label className="label-file" htmlFor="file_avatar_edit"><CameraAltIcon /></label>
                    <input onChange={(e) => onChangeFile(e)} type="file" id="file_avatar_edit" />
                </section>
            </section>

            <div className="line_profile"></div>

            <section className="body_profile">
                <ul className="ul_body_profile">
                    <li className="li_body_profile">
                        <span className="li_key">Họ tên</span>
                        {checkField === "name" ?
                            <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Họ tên" setValueForm={setValueForm} valueForm={valueForm} />
                            :
                            <Item_profile title={userOne?.name} setValueForm={setValueForm} value="name" checkField={checkField} handleEdit={handleEdit} />
                        }

                    </li>
                    <li className="li_body_profile">
                        <span className="li_key">Số điện thoại</span>
                        {checkField === "phone" ?
                            < Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Số điện thoại" setValueForm={setValueForm} valueForm={valueForm} phoneErr={phoneErr} setPhoneErr={setPhoneErr} />
                            :
                            <Item_profile title={userOne?.phone} setValueForm={setValueForm} value="phone" checkField={checkField} handleEdit={handleEdit} />
                        }

                    </li>
                    <li className="li_body_profile">
                        <span className="li_key">Email</span>
                        {/* {checkField === "email" ?
                            <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Email" setValueForm={setValueForm} valueForm={valueForm} />
                            :
                            // <Item_profile title={userOne?.email} setValueForm={setValueForm} value="email" checkField={checkField} handleEdit={handleEdit} />
                        } */}
                        <Item_profile title={userOne?.email} />
                    </li>
                    <li className="li_body_profile">
                        <span className="li_key">Địa chỉ </span>
                        {checkField === "address" ?
                            <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Địa chỉ" setValueForm={setValueForm} valueForm={valueForm} />
                            :
                            <Item_profile title={userOne?.address} setValueForm={setValueForm} value="address" checkField={checkField} handleEdit={handleEdit} />
                        }
                    </li>
                    <li className="li_body_profile">
                        <span className="li_key">Ngày sinh </span>
                        {checkField === "birth_day" ?
                            <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Ngày sinh" setValueForm={setValueForm} valueForm={valueForm} />
                            :
                            <Item_profile title={userOne?.birth_day} setValueForm={setValueForm} value="birth_day" checkField={checkField} handleEdit={handleEdit} />
                        }
                    </li>
                    <li className="li_body_profile">
                        <span className="li_key">Giới tính </span>
                        {checkField === "gender" ?
                            <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Giới tính" setValueForm={setValueForm} valueForm={valueForm} />
                            :
                            <Item_profile title={userOne?.gender} setValueForm={setValueForm} value="gender" checkField={checkField} handleEdit={handleEdit} />
                        }
                    </li>
                    <li className="li_body_profile">
                        <span className="li_key">Mật khẩu</span>
                        {checkField === "password" ?
                            <>
                                <section className="section_body_profile">
                                    <div className="section_title">
                                        {!isConfirmPass
                                            ?
                                            <>
                                                <TextField type="password" value={passConfirm} onChange={(e) => handleCheckPassConfirm(e.target.value)} className="textField-auth" size="small" variant="outlined" placeholder="Nhập lại mật khẩu" />
                                                {isErrUser && <span>{isErrUser}</span>}
                                            </>
                                            :
                                            <>
                                                <div className="mb-3">
                                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Nhập mật khẩu mới" />
                                                </div>
                                                <div className="mb-3">
                                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" placeholder="Nhập lại mật khẩu mới" />
                                                </div>
                                            </>

                                        }

                                    </div>
                                    {/* confirmPassword */}
                                    <div className="cancle_save">
                                        <button className="li_value" onClick={handleCancle}>Hủy</button>
                                        {!isConfirmPass
                                            ?
                                            <button className="save_profile" onClick={() => { dispatch(confirmPassword(userOne?._id, passConfirm)) }} >Xác nhận</button>
                                            :
                                            <button className="save_profile" onClick={handleUpdatePass} >Cập nhật</button>

                                        }
                                    </div>
                                </section>
                            </>
                            :
                            <Item_profile title="................" setValueForm={setValueForm} value="password" checkField={checkField} handleEdit={handleEdit} />
                        }
                    </li>

                </ul>
            </section>
            {/* </form> */}
        </section>
    </>
}

export default Profile_userInfor
