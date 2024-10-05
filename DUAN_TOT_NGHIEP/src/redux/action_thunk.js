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
import{
    loadCommentByTour,
    addComment,
    delOneComment,
    loadingComment
}from "./comment_slice";

import {
    loadAllBlog,
    addOneBlog,
    delOneBlog,
    loadOneBlog,
    updateOneBlog,
} from "./blog_slice"

// phần user
export function getOneUser(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/auth/find/${id}`)
            console.log(res.data);
            
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


// get all Tour
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
export function getTourByNameAnDateTour(name, dateTour) {
    return async (dispatch) => {
        try {
            dispatch(loadingTour(true))
            console.log(name);
            
            let res = await axios.get(`http://localhost:3000/Admin/tours/getDateTouranName?${name ? `name=${name}` : ''}${dateTour ? `&dateTour=${dateTour}` : ''}`)
            dispatch(loadAllTour(res.data))
        } catch (error) {
               if (error.response.status === 404) {
                   console.log(error.response.data.message);
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
<<<<<<< HEAD
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
            console.log("action_data", data);
            let res = await axios.post(`http://localhost:3000/Admin/blog/create`, data); // Pass 'data' directly
            dispatch(addOneBlog(res.data));
        } catch (error) {
            console.log(error);
        }
    };
}

//lấy tất cả blog người dùng views
// get all Blog
export function getAllBlog() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/blog`)
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

//update Blog
// update one danh mục by id
export function updatePostBlog(id, data) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/Admin/blog/${id}`, data)
            dispatch(updateOneBlog(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}


// get one blog by id
export function getOneBlog(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Admin/blog/${id}`)
            dispatch(loadOneBlog(res.data))
=======
>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
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
                chatId,
                senderId,
                text
            })
            dispatch(addNewMessage(res.data))
<<<<<<< HEAD
=======

>>>>>>> e10f03657868254fe7274b7aa979ca37bc99c4dd
        } catch (error) {
            console.log(error);

        }
    }
}

// rating & Comment
// Add comment
export function createComment(ratingScore, content){
    return async (dispatch) => {
        try{
            let res = await axios.post(`http://localhost:3000/Comment/create`, {
                ratingScore, content
            })
            dispatch(addComment(res.data))
        } catch (error) {
            console.log(error);
        }  
    }
}

//load Comment by Tour
export function getCommentByTour(tourId) {
    return async(dispatch) => {
        try{
            let res = await axios.get(`http://localhost:3000/Comment/${tourId}`)
            dispatch(loadCommentByTour(res.data))
        }catch(error){
            console.log(error);
            
        }
    }
}
