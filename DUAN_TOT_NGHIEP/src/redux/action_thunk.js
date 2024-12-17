import axios from "axios";
import {
    loadOneUser,
    loadOneUserChat,
    loadAllUser,
    errUser,
    updateOneUser,
    checkConfirmPass
} from "./user_slice";
import {
    loadAllDanhMuc,
    addOneDanhMuc,
    delOneDanhMuc,
    loadOneDanhMuc,
    updateOneDanhMuc,
    loadingDM,
    errorDM,
    errorDelDM,
} from "./danhMuc_slice";

import {
    loadAllTour,
    addOneTour,
    delOneTour,
    loadOneTour,
    loadingTour,
    loadingAddTour,
    updateOneTour,
    errFilter,
    bookingCount
} from "./tour_slice";


import {
    loadAllChat,
    addOneChat,
    loadOneChat
} from "./chat_slice";
import {
    loadMessage_ByIdChat,
    addNewMessage
} from "./message_slice";

import {
    loadAllBlog,
    addOneBlog,
    delOneBlog,
    loadOneBlog,
    updateOneBlog,
    loadingAddBlog
} from "./blog_slice"


import {
    loadAllOder,
    loadoneOder,
    delOneOder,
    updateOneOrder,
    errOrder,
    newOrder,
    updateStatusOrder,
    loadAllOderDatas,
    loadingOrder
} from "./order_slice"

//bằng lái xe gửi mail chưa fix lại
export function enterEmailClientHC(email, id) {
    return async () => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/resClientHC?email=${email}&id=${id}`)
            console.log("thịnh pes", res.data);

            // dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);
            console.log("lỗi gửi email");

        }
    }
}


export function enterEmailClientCar(email, id) {
    return async () => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/resClientCar?email=${email}&id=${id}`)
            console.log(res.data);

            // dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}

export function enterEmailClientHT(email, id) {
    return async () => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/resClientHT?email=${email}&id=${id}`)
            console.log(res.data);

            // dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}



export function getAllOder(limit) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Order/all?limit=${limit}`)
            dispatch(loadAllOderDatas(res.data.orders))
        } catch (error) {
            console.log(error);
        }

    }
}

export function getAllOderByStatus(task_status) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Order/taskStatus?task_status=${task_status}`)
            console.log("okok", res.data.orders);
            dispatch(loadAllOder(res.data.orders))
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.message);
                dispatch(errOrder(error.response.data.message))
            } else {
                console.log("Lỗi order");
            }
        }

    }
}


export function getAllOderByStatusByidUser(task_status, idUser) {
    return async (dispatch) => {
        try {
            console.log("all order: ", task_status);

            let res = await axios.get(`http://localhost:3000/Order/taskStatusByiduser?task_status=${task_status}&idUser=${idUser}`)
            console.log("okok", res.data.orders);
            dispatch(loadAllOder(res.data.orders))
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.message);
                dispatch(errOrder(error.response.data.message))
            } else {
                console.log("Lỗi order");
            }
        }

    }
}


export function getAllOderByid(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Order/orderUser/${id}`)
            dispatch(loadAllOder(res.data))
        } catch (error) {
            console.log(error);
        }

    }
}

export function getoneOder(id) {
    return async (dispatch) => {
        try {
            console.log("idOrder", id);

            let res = await axios.get(`http://localhost:3000/Order/${id}`)
            console.log("get order", res.data);
            dispatch(loadoneOder(res.data))
        } catch (error) {
            console.log(error);
        }

    }
}

export function delOder(id) {
    return async (dispatch) => {
        try {
            let res = await axios.delete(`http://localhost:3000/Order/delete/${id}`)
            console.log(res);

            dispatch(delOneOder(id))
        } catch (error) {
            console.log(error);

        }
    }
}

// update one order by id
// export function updateOrder(id, idTour, departureDate, returnDate, task_status) {
//     return async (dispatch) => {
//         try {
//             let res = await axios.put(`http://localhost:3000/Order/updateOrder/${id}`, {
//                 idTour,
//                 departureDate,
//                 returnDate,
//                 task_status
//             })
//             console.log("cập nhật", res.data);

//             dispatch(updateOneOrder(res.data))
//             dispatch(updateStatusOrder(res.data))
//             dispatch(getAllOder())
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// update one order by id
export function updateOrder(id, formData) {
    console.log("dòng 185", id);

    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/Order/updateOrder/${id}`,
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            console.log("cập nhật", res.data);

            // dispatch(updateOneOrder(res.data))
            // dispatch(updateStatusOrder(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}

// 
export function updatestatusOrder(id, task_status) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/Order/updatestatusOrder/${id}`, {
                task_status
            })
            console.log("cập nhật", res.data);

            dispatch(updateOneOrder(res.data))
            dispatch(updateStatusOrder(res.data))
            dispatch(getAllOder())
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
}

export function updatestatusOrderRefund(id, status) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/Order/updatestatusOrderRefund/${id}`, {
                status
            })
            console.log("cập nhật", res.data);

            dispatch(updateOneOrder(res.data))
            dispatch(updateStatusOrder(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}

// update BookingCount khi có người đặt tour
export function updateBookingCount(id) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/Admin/tours/book-count/${id}`)
            dispatch(bookingCount(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}


export function enterEmailClient(email, id) {
    return async () => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/resClient?email=${email}&id=${id}`)
            console.log(res.data);

            // dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}


// phần user
export function getOneUser(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/find/${id}`)
            dispatch(loadOneUser(res.data))
            return res.data;
        } catch (error) {
            console.log(error);

        }
    }
}

export const verifyOtp = (email, otp) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/verifyOtp', {
            email,
            otp
        });

        dispatch({
            type: 'VERIFY_OTP_SUCCESS',
            payload: response.data,
        });

        return {
            status: response.status
        }; // Pass status code back to handleVerifyOtp
    } catch (error) {
        dispatch({
            type: 'VERIFY_OTP_FAIL',
            payload: error.response ? error.response.data : error.message,
        });

        return {
            status: error.response?.status || 400
        };
    }
};


export function enterEmail(email) {
    return async (dispatch) => {
        try {
            const res = await axios.get(`http://localhost:3000/auth/forgotpassword?email=${email}`);
            console.log(res.data);

            return res;
        } catch (error) {
            console.log(error);

            // Kiểm tra nếu lỗi từ server và mã lỗi 404 (email không tồn tại)
            if (error.response?.status === 404) {
                return {
                    status: 404,
                    message: "Email không tồn tại!"
                }; // Trả về lỗi email không tồn tại
            }
            // Nếu có lỗi khác, trả về lỗi chung
            return {
                status: 500,
                message: "Có lỗi xảy ra khi gửi yêu cầu!"
            };
        }
    };
}

export function getOneUserByPhone(phone) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/findByPhone/${phone}`)
            console.log(res.data);
            dispatch(loadOneUser(res.data))
            dispatch(errUser(""))
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data);
                dispatch(errUser(error.response.data))
            }
        }
    }
}

export function getOneUserChat(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/find/${id}`)
            dispatch(loadOneUserChat(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}



export function updateUser(id, data, key) {
    return async (dispatch) => {
        try {
            console.log("key", key);
            if (key === "img") { // nếu key gửi qua là img thì cho giao diện loading để ảnh đc cập nhật
                dispatch(loadingDM(true))
            }
            let res = await axios.put(`http://localhost:3000/auth/updateUser/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Thiết lập header cho multipart/form-data
                }
            });
            dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false))
        }
    }
}


export function confirmPassword(id, password) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/auth/confirmPass`, {
                id,
                password
            })
            console.log("res", res.data.message);

            dispatch(checkConfirmPass(res.data.message))
        } catch (error) {
            if (error.response.status === 401) {
                console.log(error.response.data);
                dispatch(errUser(error.response.data))
            }

        }
    }
}

export function updateCCCD(data) {
    return async (dispatch) => {
        try {

            let res = await axios.post(`http://localhost:3000/auth/updatedCCCD`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Thiết lập header cho multipart/form-data
                }
            });
            dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}

export function getAllUser() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth`)
            dispatch(loadAllUser(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}


export function sendOTPRegister(data) {
    return async (dispatch) => {
        try {
            dispatch(loadingDM(true))
            let email = data.email
            let res = await axios.post(`http://localhost:3000/auth/sendOTPregister`, {
                email
            })
            console.log("res otp", res.data);
            return res.data
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data);
                dispatch(errUser(error.response.data))
            } else {
                console.log("Đăng ký thất bại !");
            }
        } finally {
            dispatch(loadingDM(false))
        }

    }
}

export function verifyOTPRegister(email, otp, name, password) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/auth/verifyOTPregister`, {
                email,
                otp,
                name,
                password
            })
            console.log("res otp", res.data);

            return res.data
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data.message);
                dispatch(errUser(error.response.data.message))
            }
        }

    }
}


// get all user by role
export function getAllUserByRole(role) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/findUserRole?role=${role}`)
            dispatch(loadAllUser(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}


// cập nhật khóa tài khoản user
export function editBlockUser(id, data) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/checkBlockUser?userId=${id}&isBlocked=${data}`)
            console.log("trả về", res.data);
            dispatch(updateOneUser(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}



// phần danh mục
// get all danh mục
export function getAllDanhMuc() {
    return async (dispatch) => {
        try {
            dispatch(loadingDM(true))
            let res = await axios.get(`http://localhost:3000/Admin/tourTypes`)
            dispatch(loadAllDanhMuc(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false))
        }

    }
}

// thêm danh muc
export function createDanhMuc(name, description) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/Admin/tourTypes/add`, {
                name,
                description
            })
            dispatch(addOneDanhMuc(res.data))
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data.message);
                dispatch(errorDM(error.response.data.message))
            } else {
                console.log("Đăng nhập thất bại !");
            }

        }
    }
}

// xóa danh mục
export function delDanhMuc(id) {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3000/Admin/tourTypes/delete/${id}`)
            dispatch(delOneDanhMuc(id))
        } catch (error) {
            if (error.response.status === 400) {
                console.log(error.response.data.message);
                dispatch(errorDelDM(error.response.data.message))
            }
        }
    }
}


// get one danh mục by id
export function getOneDanhMuc(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/tourTypes/detail/${id}`)
            dispatch(loadOneDanhMuc(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}


// update one danh mục by id
export function updateDanhMuc(id, name, description) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/Admin/tourTypes/edit/${id}`, {
                name,
                description
            })
            dispatch(updateOneDanhMuc(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}


// phần tour
// thêm dtour
export function createTour(data) {
    return async (dispatch) => {
        try {
            dispatch(loadingAddTour(true))
            let res = await axios.post(`http://localhost:3000/Admin/tours/add`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // Header này thông báo cho server biết rằng dữ liệu được gửi đi là dạng multipart / form - data.
                // multipart / form - data là chuẩn dùng để gửi dữ liệu có file(hình ảnh, video...) và văn bản cùng lúc.
            })
            dispatch(addOneTour(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingAddTour(false))
        }
    }
}

// update tour
export function updateTour(id, data) {
    return async (dispatch) => {
        try {
            dispatch(loadingAddTour(true))
            console.log("action_data", data);
            let res = await axios.put(`http://localhost:3000/Admin/tours/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            dispatch(updateOneTour(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingAddTour(false))
        }
    }
}

// update isDeleteTour
export function updateIdDeleteTour(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/tours/isDeleteTour/${id}`)
            dispatch(updateOneTour(res.data))
        } catch (error) {
            console.log(error);
        } 
    }
}

// get all Tour có limit
export function getAllTour(limit) {
    return async (dispatch) => {
        try {
            dispatch(loadingTour(true))
            // let limit = 3
            let res = await axios.get(`http://localhost:3000/Admin/tours?limit=${limit}`)
            dispatch(loadAllTour(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingTour(false))
        }

    }
}

// get all tour admin
export function getAllTourAdmin() {
    return async (dispatch) => {
        try {
            dispatch(loadingTour(true))
            let res = await axios.get(`http://localhost:3000/Admin/tours/getAllToursAdmin`)
            dispatch(loadAllTour(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingTour(false))
        }

    }
}

// get all tour by iddm
export function getAllTourDM(id) {
    return async (dispatch) => {
        try {
            dispatch(loadingTour(true))
            // let limit = 3
            let res = await axios.get(`http://localhost:3000/Admin/tours/tourDM/${id}`)
            dispatch(loadAllTour(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingTour(false))
        }

    }
}

// get tour theo name hoặc dateTour
export function getTourByNameAnDateTour(name = null, dateTour = null, numDay = null) {
    return async (dispatch) => {
        try {
            dispatch(loadingTour(true))
            console.log(name, dateTour);

            let res = await axios.get(`http://localhost:3000/Admin/tours/getDateTouranName?${name ? `name=${name}` : ''}${dateTour ? `&dateTour=${dateTour}` : ''}${numDay ? `&numDay=${numDay}` : ''}`)
            console.log("dữ liệu trả về", res.data);
            
            dispatch(loadAllTour(res.data))
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response.data.message);
                dispatch(errFilter(error.response.data.message))
                //    dispatch(errorDelDM(error.response.data.message))
            }
            if (error.response.status === 500) {
                console.log(error.response.data.message);
                // dyispatch(errorDelDM(error.response.data.message))
            }

        } finally {
            dispatch(loadingTour(false))
        }

    }
}

// del tour
export function delTour(id) {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3000/Admin/tours/delete/${id}`)
            dispatch(delOneTour(id))
        } catch (error) {
            console.log(error);
        }
    }
}


// get one tour by id
export function getOneTour(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/tours/detail/${id}`)
            dispatch(loadOneTour(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}

// *** blog 
//create blog

export function createBlog(data) {
    return async (dispatch) => {
        try {
            dispatch(loadingAddBlog(true))
            let res = await axios.post(`http://localhost:3000/Admin/blog/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            dispatch(addOneBlog(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingAddBlog(false))
        }
    }
}


//lấy tất cả blog người dùng views
// get all Blog
export function getAllBlog() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/blog/getAll`)
            console.log('okok', res.data);

            dispatch(loadAllBlog(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false))
        }

    }
}

// get newest Blog
export function getNewestBlog() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/blog/sorted/newest`);
            dispatch(loadAllBlog(res.data));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false));
        }
    };
}

// get oldest Blog
export function getOldestBlog() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/blog/sorted/oldest`);
            dispatch(loadAllBlog(res.data));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false));
        }
    };
}


// del Blog
export function delBlog(id) {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3000/Admin/blog/${id}`)
            dispatch(delOneBlog(id))
        } catch (error) {
            console.log(error);
        }
    }
}



// update blog
export function updatePostBlog(id, data) {
    return async (dispatch) => {
        try {
            dispatch(loadingAddBlog(true))
            console.log("action_data", data);
            let res = await axios.put(`http://localhost:3000/Admin/blog/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            dispatch(updateOneBlog(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingAddBlog(false))
        }
    }
}


// get one blog by id
export function getOneBlog(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/blog/${id}`)
            dispatch(loadOneBlog(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}


export function getOnePost(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/blog/${id}`)
            // console.log(res.data);
            dispatch(loadOneBlog(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}

// Redux action để lấy bài viết theo slug
export const getOnePostBySlug = (slug) => async (dispatch) => {
    try {
        let res = await axios.get(`http://localhost:3000/Admin/blog/slug/${slug}`); // Giả sử bạn có endpoint lấy bài viết theo slug
        dispatch(loadOneBlog(res.data))
    } catch (error) {
        console.error("Error fetching blog by slug", error);
    }
};

// phần action của chat ****
// thêm đoạn chat
export function createChat(firsId, secondId) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/chats`, {
                firsId,
                secondId
            })
            console.log(res.data);

            dispatch(addOneChat(res.data))
            return res.data
        } catch (error) {
            console.log(error);

        }
    }
}

// get all đoạn chat dựa vào id tk đăng nhập
export function getAllChatByIdUser(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/chats/${id}`)
            dispatch(loadAllChat(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false))
        }

    }
}

// tìm đoạn chat đó dựa vào id của mình và id user đó
export function getOneChat_ByYourId_And_UserId(firsId, secondId) {
    return async (dispatch) => {
        try {
            console.log(firsId, secondId);

            let res = await axios.get(`http://localhost:3000/chats/find/${firsId}/${secondId}`)
            console.log("thunk oneChat", res.data);

            dispatch(loadOneChat(res.data))
            return res.data;
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false))
        }

    }
}


// phần messager ****
// get all đoạn chat của mình vs họ dựa vào id đoạn chat đó
export function getAllMessage_ByIdChat(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/messages/${id}`)
            dispatch(loadMessage_ByIdChat(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false))
        }

    }
}

// thêm 1 tin nhắn mới
export function createMessage(chatId, senderId, text) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/messages`, {
                chatId,
                senderId,
                text
            })
            dispatch(addNewMessage(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}

export function getOrderByNameAndDate(orderCode = null) {
    return async (dispatch) => {
        try {
            dispatch(loadingOrder(true)); // Hiển thị trạng thái loading

            // Xây dựng query string chỉ với orderCode
            const queryString = orderCode ? `?orderCode=${orderCode}` : "";

            // Gửi yêu cầu API để tìm kiếm đơn hàng theo orderCode
            const res = await axios.get(`http://localhost:3000/Order/getOrderByNameAndDate${queryString}`);

            // Lưu kết quả vào Redux
            dispatch(loadAllOder(res.data));
        } catch (error) {
            if (error.response?.status === 404) {
                console.log("hàng 218", error.response.data.message);
                dispatch(errOrder(error.response.data.message)); // Lỗi khi không tìm thấy dữ liệu
            } else {
                console.error(error.response?.data?.message || "Lỗi không xác định.");
            }
        } finally {
            dispatch(loadingOrder(false)); // Tắt trạng thái loading
        }
    };
}