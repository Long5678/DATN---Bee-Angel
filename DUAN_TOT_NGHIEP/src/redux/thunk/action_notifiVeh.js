import axios from "axios";

import {
  createNotifyVehicle,
  getUserNotifyVehicle,
  MarkAllRead,
  checkStatus,
  loadingNotify,
  loadAllNotificationVehicle
} from '../notificationVehi_slice'
import {
  loadAllOderNotifyVehicle
} from "../ordervehicle_slice";
export function addNotifyVehicle(message, orderId, userId, idCar, check,status) {
  return async (dispatch) => {
      try {
          let res = await axios.post(`http://localhost:3000/notification-vehicle/create`, {
              message,
              orderId,
              userId,
              idCar,
              check,
              status
          })
          dispatch(createNotifyVehicle(res.data))
          return res.data
      } catch (error) {
          console.log(error);
      }

  }
}


export function getNotifyVehicle(userId) {
  return async (dispatch) => {
      try {
          dispatch(loadingNotify(true))
          let res = await axios.get(`http://localhost:3000/notification-vehicle/${userId}`)
          // console.log(res.data.data);

          dispatch(getUserNotifyVehicle(res.data.data));

      } catch (error) {
          console.log(error);
      } finally {
          dispatch(loadingNotify(false))
      }
  }
}



export function markReadCar(userId) {
  return async (dispatch) => {
      try {
          // Gọi API để đánh dấu tất cả thông báo là đã đọc
          await axios.put(`http://localhost:3000/notification-vehicle/read/${userId}`);
          // Dispatch action để cập nhật Redux store
          dispatch(MarkAllRead());
      } catch (error) {
          console.error("Lỗi khi đánh dấu tất cả thông báo là đã đọc:", error);
      }
  };

}


export function changeStatusCar(task_status) {
  return async (dispatch) => {
      try {
          // Gọi API để lấy dữ liệu
          const response = await axios.post('http://localhost:3000/notification-vehicle/check-all-status', {
              task_status
          });

          // Dispatch action và truyền dữ liệu từ response vào
          dispatch(checkStatus(response.data)); // Giả sử response.data chứa notifyDatas

      } catch (error) {
          console.log('Lỗi khi kiểm tra trạng thái đơn hàng', error);
      }
  };
}


export function getAllOderNotifyVehicle() {
  return async (dispatch) => {
      try {
          dispatch(loadingNotify(true))
          let res = await axios.get(`http://localhost:3000/orderCar/all`)
          dispatch(loadAllOderNotifyVehicle(res.data.orders))
          dispatch(loadingNotify(true))
      } catch (error) {
          console.log(error);
      } finally {
          dispatch(loadingNotify(false))
      }

  }
}


export function getAllNotifyVehicle() {
  return async (dispatch) => {
      try {
          let res = await axios.get(`http://localhost:3000/notification-vehicle/Allnoti`)
          dispatch(loadAllNotificationVehicle(res.data))
      } catch (error) {
          console.log(error);
      }

  }
}
