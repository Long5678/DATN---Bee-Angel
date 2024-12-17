import {
  createSlice
} from "@reduxjs/toolkit"

const initialState = {
  orderVehicleDatas: [],
  orderVehicleDatasAll: [],
  oneOderVehicle: {},
  isErrOrderVehicle: "",
  oderVehicleDatasNotify: [],
  orderNewCar: {},
  orderCarUpdate: {},
  isLoadingOrderVehicle: false
};

export const orderVehicleSlice = createSlice({
  name: "orderVehicleSL",
  initialState,
  reducers: {
    loadAllOderVehicle(state, action) {
      state.orderVehicleDatas = action.payload;
    },
    loadAllOderVehicleDatas(state, action) {
      state.orderVehicleDatasAll = action.payload;
    },
    loadoneOderVehicle(state, action) {
      state.oneOderVehicle = action.payload;
    },
    delOneOderVehicle(state, action) {
      state.orderVehicleDatas = state.orderVehicleDatas.filter((item) => {
        return item._id != action.payload
      })
    },

    updateOneOrderVehicle(state, action) {
      const index = state.orderVehicleDatas.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.orderVehicleDatas[index] = action.payload;
      }
    },
    errOrderVehicle(state, action) {
      state.isErrOrderVehicle = action.payload;
    },
    loadAllOderNotifyVehicle(state, action) {
      state.oderVehicleDatasNotify = action.payload;
    },
    newOrderCar(state, action) {
      state.orderNewCar = action.payload
    },
    updateStatusOrderCar(state, action) {
      console.log(action.payload);
      state.orderCarUpdate = action.payload
    },
    loadingOrderVehicle(state, action) {
      state.isLoadingOrderVehicle = action.payload;
    },
  }
})


export const {
  loadAllOderVehicle,
  loadoneOderVehicle,
  delOneOderVehicle,
  updateOneOrderVehicle,
  errOrderVehicle,
  loadAllOderLicense,
  loadAllOderNotifyVehicle,
  newOrderCar,
  updateStatusOrderCar,
  loadAllOderVehicleDatas,
  loadingOrderVehicle
} = orderVehicleSlice.actions;
