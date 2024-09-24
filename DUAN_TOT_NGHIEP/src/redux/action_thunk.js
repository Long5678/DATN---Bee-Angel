import axios from "axios";
import {
    loadOneUser
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
    updateOneTour,
    loadingTour
} from "./tour_slice";

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
                name, description
            })
            dispatch(addOneDanhMuc(res.data.data))
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
            let res = await axios.put(`http://localhost:3000/Admin/tourTypes/edit/${id}`,{
                name, description
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
            dispatch(addOneTour(res.data.data))
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
            dispatch(loadOneTour(res.data.data))
        } catch (error) {
            console.log(error);

        }
    }
}