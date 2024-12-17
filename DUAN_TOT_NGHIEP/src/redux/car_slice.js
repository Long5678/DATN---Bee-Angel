import {
  createSlice
} from "@reduxjs/toolkit"

const initialState = {
  isLoadingCar: false,
  isLoadingAddCar: false,
  isErrFilter: "",
  carDatas: [],
  carOne: {},
};

export const carSlice = createSlice({
  name: "carSL",
  initialState,
  reducers: {
      loadAllCar(state, action) {
          state.carDatas = action.payload;
      },
      addOneCar(state, action) {
          state.carDatas.push(action.payload)
      },
      delOneCar(state, action) {
          state.carDatas = state.carDatas.filter((item) => {
              return item._id != action.payload
          })
      },
      loadOneCar(state, action) {
        console.log(action.payload);
          state.carOne = action.payload;
      },
      updateOneCar(state, action) {
          const index = state.carDatas.findIndex((item) => item._id === action.payload._id);
          if (index !== -1) {
              state.carDatas[index] = action.payload;
          }
      },

      // laoding
      loadingCar(state, action) {
          state.isLoadingCar = action.payload;
      },
      loadingAddCar(state, action) {
          state.isLoadingAddCar = action.payload;
      },
      errFilter(state,action) {
        state.isErrFilter = action.payload;
    }
  }
})


export const {
  loadAllCar,
  addOneCar,
  delOneCar,
  loadOneCar,
  updateOneCar,
  loadingCar,
  loadingAddCar,
  errFilter
} = carSlice.actions;
