import {
  createSlice
} from "@reduxjs/toolkit"

const initialState = {
  ratingDataVehicles: [],
  ratingOne: {},
  isErrorStatus: '',
};

export const RatingVehicleSlice = createSlice({
  name: "RatingVehicleSL",
  initialState,
  reducers: {
      loadAllVehiclesWithRatings(state, action) {
          state.ratingDataVehicles = action.payload;
      },
      createRatingVehicle(state, action) {
          state.ratingDataVehicles.push(action.payload)
      },

      getRatingByVehicle(state, action) {
          console.log(action.payload);
          state.ratingDataVehicles = action.payload;
      },

      // loading
      loadingRatingVehicle(state, action) {
          state.isLoadingRating = action.payload;
      },

      errorStatus(state, action) {
          console.log(action.payload);
          state.isErrorStatus = action.payload;
      }
  }
})


export const {
  loadAllVehiclesWithRatings,
  createRatingVehicle,
  loadingRatingVehicle,
  getRatingByVehicle,
  errorStatus
} = RatingVehicleSlice.actions;
