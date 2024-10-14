import { useContext, useEffect, useState } from "react"
import Item_profile from "./item_profile";
import Item_profileEdit from "./item_profileEdit";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { AuthContext } from "../../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser, updateUser } from "../../../redux/action_thunk";

function Profile_userInfor() {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext)
    const [valueForm, setValueForm] = useState(""); // state này để chứa name hoặc các thông tin khác của user
    // const [keyValue, setKeyValue] = useState(""); // state này là cái key , vd như name hay address đồ, để bik là khi cập nhật là bik nó sẽ cập nhật key nào
    const [checkField, setCheckField] = useState(null)
    const userOne = useSelector((state) => state.userSL.userOne)
    const handleEdit = (field) => {
        setCheckField(field); // Khi chỉnh sửa, cập nhật trạng thái với tên của trường
    };

    console.log(userOne)

    const handleCancle = () => {
        setCheckField(null);
        setValueForm("")
        setCheckField(null)
    }

    const handleSave = () => {
        console.log(checkField, valueForm);
        
        const formData = new FormData();
        formData.append(`${checkField}`, valueForm);
        dispatch(updateUser(userOne?._id, formData))
        setCheckField(null); // Sau khi lưu, cho phép chỉnh sửa các trường khác
        setValueForm("")
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

        dispatch(updateUser(userOne?._id, formData))
    }

    // useEffect(() => {
    //    console.log("valueForm", valueForm);
       
    // }, [valueForm])

    return <>
        <section className="profile_userInfor">
            {/* <form action=""> */}
                <section className="head_profile">
                    <section className="box_head">
                        <div>
                            <h1>Thông tin cá nhân</h1>
                            <span className="head_span">Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</span>
                        </div>
                        <div className="avatr_profile">
                            {userOne?.avatar ?
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
                                <Item_profile title={userOne?.name} value="name" checkField={checkField} handleEdit={handleEdit} />
                            }

                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Số điện thoại</span>
                            {checkField === "phone" ?
                                < Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Số điện thoại" setValueForm={setValueForm} valueForm={valueForm} />
                                :
                                <Item_profile title={userOne?.phone} value="phone" checkField={checkField} handleEdit={handleEdit} />
                            }

                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Email</span>
                            {checkField === "email" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Email" setValueForm={setValueForm} valueForm={valueForm} />
                                :
                                <Item_profile title={userOne?.email} value="email" checkField={checkField} handleEdit={handleEdit} />
                            }
                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Địa chỉ </span>
                            {checkField === "address" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Địa chỉ" setValueForm={setValueForm} valueForm={valueForm} />
                                :
                                <Item_profile title={userOne?.address} value="address" checkField={checkField} handleEdit={handleEdit} />
                            }
                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Ngày sinh </span>
                            {checkField === "birth_day" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Ngày sinh" setValueForm={setValueForm} valueForm={valueForm} />
                                :
                                <Item_profile title={userOne?.birth_day} value="birth_day" checkField={checkField} handleEdit={handleEdit} />
                            }
                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Giới tính </span>
                            {checkField === "gender" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Giới tính" setValueForm={setValueForm} valueForm={valueForm} />
                                :
                                <Item_profile title={userOne?.gender} value="gender" checkField={checkField} handleEdit={handleEdit} />
                            }
                        </li>
                    </ul>
                </section>
            {/* </form> */}
        </section>
    </>
}

export default Profile_userInfor
