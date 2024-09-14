import { useState } from "react"
import Item_profile from "./item_profile";
import Item_profileEdit from "./item_profileEdit";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function Profile_userInfor() {
    const [checkField, setCheckField] = useState(null)
    const handleEdit = (field) => {
        setCheckField(field); // Khi chỉnh sửa, cập nhật trạng thái với tên của trường
    };

    const handleCancle = () => {
        setCheckField(null);
    }

    const handleSave = () => {
        setCheckField(null); // Sau khi lưu, cho phép chỉnh sửa các trường khác
    };
    return <>
        <section className="profile_userInfor">
            <form action="">
                <section className="head_profile">
                    <section className="box_head">
                        <div>
                            <h1>Thông tin cá nhân</h1>
                            <span className="head_span">Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</span>
                        </div>
                        <div className="avatr_profile">
                            <img src="/src/publics/image/avatar_buiminh.jpg" alt="" />
                        </div>
                    </section>

                    <section>
                        <label className="label-file" htmlFor="file_avatar_edit"><CameraAltIcon /></label>
                        <input type="file" id="file_avatar_edit"/>
                    </section>
                </section>

                <div className="line_profile"></div>

                <section className="body_profile">
                    <ul className="ul_body_profile">
                        <li className="li_body_profile">
                            <span className="li_key">Họ tên</span>
                            {checkField === "name" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Họ tên" />
                                :
                                <Item_profile title="Bùi Văn Minh" value="name" checkField={checkField} handleEdit={handleEdit} />
                            }

                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Số điện thoại</span>
                            {checkField === "phone" ?
                                < Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Số điện thoại" />
                                :
                                <Item_profile title="0935455107" value="phone" checkField={checkField} handleEdit={handleEdit} />
                            }

                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Email</span>
                            {checkField === "email" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Email" />
                                :
                                <Item_profile title="mbui683@gmail.com" value="email" checkField={checkField} handleEdit={handleEdit} />
                            }
                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Địa chỉ </span>
                            {checkField === "address" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Địa chỉ" />
                                :
                                <Item_profile title="K122/20 Trần Cao Vân, TP.Đà Nẵng" value="address" checkField={checkField} handleEdit={handleEdit} />
                            }
                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Ngày sinh </span>
                            {checkField === "birthday" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Ngày sinh" />
                                :
                                <Item_profile title="28-11-2004" value="birthday" checkField={checkField} handleEdit={handleEdit} />
                            }
                        </li>
                        <li className="li_body_profile">
                            <span className="li_key">Giới tính </span>
                            {checkField === "gender" ?
                                <Item_profileEdit handleCancle={handleCancle} handleSave={handleSave} label="Giới tính" />
                                :
                                <Item_profile title="Nam" value="gender" checkField={checkField} handleEdit={handleEdit} />
                            }
                        </li>
                    </ul>
                </section>
            </form>
        </section>
    </>
}

export default Profile_userInfor
