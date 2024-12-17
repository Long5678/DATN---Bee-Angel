import {
  createSlice
} from "@reduxjs/toolkit"

const initialState = {
  // state load notify dựa vào id đoạn chat
  notifyVehicleDatas: [],
  newNotify: {}, // nó sẽ lưu trữ tin nhắn ms vào đây
  loadNotify: false,
};

export const notifyVehicleSlice = createSlice({
  name: "notifyVehicleSL",
  initialState,
  reducers: {
      createNotifyVehicle(state, action) {
          state.notifyVehicleDatas.push(action.payload);
      },
      getUserNotifyVehicle(state, action){
          state.notifyVehicleDatas = action.payload;
      },
      MarkAllRead(state){
          state.notifyVehicleDatas = state.notifyVehicleDatas.map((item) => ({
              ...item,
              isRead: true,
          }));
      },
        checkStatus(state, action) {
          state.notifyVehicleDatas.push(action.payload);
        },
      loadingNotify(state, action) {
          state.loadNotify = action.payload
      },
      loadAllNotificationVehicle(state, action) {
          state.notifyVehicleDatas = action.payload;
      },
  }
})


export const {
  createNotifyVehicle,
  getUserNotifyVehicle,
  MarkAllRead,
  checkStatus,
  loadingNotify,
  loadAllNotificationVehicle
} = notifyVehicleSlice.actions;
