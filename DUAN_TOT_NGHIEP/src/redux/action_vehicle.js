import axios from "axios";
import {
  loadAllVehicle,
  addOneVehicle,
  delOneVehicle,
  loadOneVehicle,
  updateOneVehicle,
  loadingVehicle,
  errorVehicle,
  errorDelVehicle
} from "./vehicleType_slice";

import {
  loadAllCar,
  addOneCar,
  delOneCar,
  loadOneCar,
  updateOneCar,
  loadingCar,
  loadingAddCar
} from "./car_slice";

// get all loại xe
export function getAllVehicle() {
  return async (dispatch) => {
    try {
      dispatch(loadingVehicle(true))
      let res = await axios.get(`http://localhost:3000/Admin/vehicleType`)
      console.log('get', res.data);
      dispatch(loadAllVehicle(res.data))
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingVehicle(false))
    }

  }
}

// thêm loại xe
export function createTypeVehicle(name, description) {
  return async (dispatch) => {
    try {
      let res = await axios.post(`http://localhost:3000/Admin/vehicleType/add`, {
        name,
        description
      })
      console.log('add', res.data);
      dispatch(addOneVehicle(res.data))
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.message);
        dispatch(errorVehicle(error.response.data.message))
      } else {
        console.log("Đăng nhập thất bại !");
      }

    }
  }
}


export function delVehicle(id) {
  return async (dispatch) => {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:3000/Admin/vehicleType/delete/${id}`);
      console.log("Xóa thành công:", response.data);
      // Dispatch action to remove the vehicle type from the state
      dispatch(delOneVehicle(id));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          dispatch(errorDelVehicle(error.response.data.message)); // Handle error if deletion failed
        } else {
          console.log("Xảy ra lỗi khác", error.response.status);
        }
      } else {
        console.log("Không thể kết nối với server", error);
      }
    }
  };
}




// get one danh mục by id
export function getOneVehicle(id) {
  return async (dispatch) => {
    try {
      let res = await axios.get(`http://localhost:3000/Admin/vehicleType/detail/${id}`)
      dispatch(loadOneVehicle(res.data))
    } catch (error) {
      console.log(error);

    }
  }
}

// update one danh mục by id
export function updateVehicle(id, name, description) {
  return async (dispatch) => {
    try {
      let res = await axios.put(`http://localhost:3000/Admin/vehicleType/edit/${id}`, {
        name,
        description
      })
      console.log(res.data);
      dispatch(updateOneVehicle(res.data))
    } catch (error) {
      console.log(error);
    }
  }
}

// phần xe
// thêm xe  
export function createCar(data) {
  return async (dispatch) => {
    try {
      dispatch(loadingAddCar(true))
      let res = await axios.post(`http://localhost:3000/Admin/vehicle/add`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(res.data);
      dispatch(addOneCar(res.data))
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingAddCar(false))
    }
  }
}

// get all Car
export function getAllCar() {
  return async (dispatch) => {
    try {
      dispatch(loadingCar(true))
      let res = await axios.get(`http://localhost:3000/Admin/vehicle`)
      dispatch(loadAllCar(res.data))
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingCar(false))
    }

  }
}

// get one car by id
export function getOneCar(id) {
  return async (dispatch) => {
    try {
      let res = await axios.get(`http://localhost:3000/Admin/vehicle/${id}`)
      console.log(res.data);
      dispatch(loadOneCar(res.data))
    } catch (error) {
      console.log(error);

    }
  }
}

// del car
export function delCar(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3000/Admin/vehicle/delete/${id}`);
      dispatch(delOneCar(id))
    } catch (error) {
      console.log(error);
    }
  }
}




// update tour
export function updateCar(id, data) {
  return async (dispatch) => {
    try {
      dispatch(loadingAddCar(true))
      console.log("action_data", data);
      let res = await axios.put(`http://localhost:3000/Admin/vehicle/edit/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(updateOneCar(res.data))
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingAddCar(false))
    }
  }
}
