import axios from "axios";
import {
    loadOneUser,
    loadOneUserChat,
    loadAllUser
} from "./user_slice";
import {
    loadAllDanhMuc,
    addOneDanhMuc,
    delOneDanhMuc,
    loadOneDanhMuc,
    updateOneDanhMuc,
    loadingDM,
} from "./danhMuc_slice";

import {
    loadAllTour,
    addOneTour,
    delOneTour,
    loadOneTour,
    // updateOneTour,
    // loadingTour
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

// phần user
export function getOneUser(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/find/${id}`)
            dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);

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

export function enterEmail(email) {
    return async () => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/forgotpassword?email=${email}`)
            console.log(res.data);

            // dispatch(loadOneUser(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}


export function updateUser(id, data) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/auth/updateUser/${id}`, data, {
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
            console.log(error);

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
            console.log(error);
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
            console.log("action_data", data);
            let res = await axios.post(`http://localhost:3000/Admin/tours/add`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            dispatch(addOneTour(res.data))
        } catch (error) {
            console.log(error);

        }
    }
}


// get all Tour
export function getAllTour() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/tours`)
            dispatch(loadAllTour(res.data))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(loadingDM(false))
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
<<<<<<< HEAD
        } catch (error) {
            console.log(error);

        }
    }
}



// phần action của chat ****
// thêm đoạn chat
export function createChat(firsId, secondId) {
    return async (dispatch) => {
        try {
            let res = await axios.post(`http://localhost:3000/chats`, {
             firsId, secondId
            })
            console.log(res.data);
            
            dispatch(addOneChat(res.data))
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
            let res = await axios.get(`http://localhost:3000/chats/find/${firsId}/${secondId}`)
            dispatch(loadOneChat(res.data))
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
               chatId, senderId, text
            })
            dispatch(addNewMessage(res.data))
=======
>>>>>>> 2f057056b336753e3c614d57be88b4d2adeb52ff
        } catch (error) {
            console.log(error);

        }
    }
}