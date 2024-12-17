import axios from "axios";
import {
    loadAllOderVehicle,
    loadoneOderVehicle,
    updateOneOrderVehicle,
    errOrderVehicle,
    updateStatusOrderCar,
    loadAllOderVehicleDatas,
    loadingOrderVehicle
} from '../ordervehicle_slice'




export function getAllOrderVehicle(limit) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/orderCar/getAll?limit=${limit}`)
            dispatch(loadAllOderVehicleDatas(res.data.orders))
        } catch (error) {
            console.log(error);
        }

    }
}


export function getAllOrderVehicleByStatus(task_status, idUser) {
    return async (dispatch) => {
        try {

            let res = await axios.get(`http://localhost:3000/orderCar/taskStatusByiduser?task_status=${task_status}&idUser=${idUser}`)
            dispatch(loadAllOderVehicle(res.data.orders))
        } catch (error) {
            if (error.response.status === 404) {
                dispatch(errOrderVehicle(error.response.data.message))
            } else {
                console.log("Lỗi order");
            }
        }

    }
}


export function getAllOderUserVehicleByid(id) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/orderCar/orderUser/${id}`)
            dispatch(loadAllOderVehicle(res.data))
        } catch (error) {
            console.log(error);
        }

    }
}

export function getoneOrderVehicle(id) {
    return async (dispatch) => {
        try {
            console.log("idOrder", id);

            let res = await axios.get(`http://localhost:3000/orderCar/${id}`)
            dispatch(loadoneOderVehicle(res.data))
        } catch (error) {
            console.log(error);
        }

    }
}



// update one order by id
export function updateOrderCar(
    id,
    idCar,
    pickUpDate,
    returnDate,
    task_status,
    shippingAddress,
    dayDifference) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/orderCar/updateOrder/${id}`, {
                idCar,
                pickUpDate,
                returnDate,
                task_status,
                shippingAddress,
                dayDifference
            })
            dispatch(updateOneOrderVehicle(res.data))
            dispatch(updateStatusOrderCar(res.data))
        } catch (error) {
            console.log(error);
        }
    }
}


export function getAllOderCarByStatus(task_status) {
    return async (dispatch) => {
        try {
            console.log("tast order: ", task_status);

            let res = await axios.get(`http://localhost:3000/orderCar/taskStatus?task_status=${task_status}`)
            dispatch(loadAllOderVehicle(res.data.orders))
        } catch (error) {
            if (error.response.status === 404) {
                console.log("Bắn lỗi", error.response.data.message);
                dispatch(errOrderVehicle(error.response.data.message))
            } else {
                console.log("Lỗi order");
            }
        }
    }
}


export function updatestatusOrderMoto(id, task_status) {
    return async (dispatch) => {
        try {
            let res = await axios.put(`http://localhost:3000/orderCar/updatestatusOrderVehicle/${id}`, {
                task_status
            })
            console.log("cập nhật", res.data);

            dispatch(updateOneOrderVehicle(res.data))
            dispatch(updateStatusOrderCar(res.data))
            dispatch(getAllOrderVehicle())
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
}


export function getOrderByNameVehicle(orderCodeVehicle = null) {
    return async (dispatch) => {
        try {
            dispatch(loadingOrderVehicle(true)); // Hiển thị trạng thái loading

            // Xây dựng query string chỉ với orderCodeVehicle
            const queryString = orderCodeVehicle ? `?orderCodeVehicle=${orderCodeVehicle}` : "";

            // Gửi yêu cầu API để tìm kiếm đơn hàng theo orderCodeVehicle
            const res = await axios.get(`http://localhost:3000/orderCar/getOrderByNameVehicle${queryString}`);

            // Lưu kết quả vào Redux
            dispatch(loadAllOderVehicle(res.data));
        } catch (error) {
            if (error.response?.status === 404) {
                dispatch(errOrderVehicle(error.response.data.message)); // Lỗi khi không tìm thấy dữ liệu
            } else {
                console.error(error.response?.data?.message || "Lỗi không xác định.");
            }
        } finally {
            dispatch(loadingOrderVehicle(false)); // Tắt trạng thái loading
        }
    };
}
