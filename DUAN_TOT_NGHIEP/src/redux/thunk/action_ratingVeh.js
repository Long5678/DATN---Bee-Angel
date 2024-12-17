import axios from "axios";

import {
  loadAllVehiclesWithRatings,
  createRatingVehicle,
  loadingRatingVehicle,
  getRatingByVehicle,
  errorStatus
} from '../ratingvehicle_slice'

//Rating
//Add Rating Veh

export function addRatingVehicle(data) {
  return async (dispatch) => {
      try {
          // Post the new rating along with review and user details
          let res = await axios.post(`http://localhost:3000/ratingVehicle/create`, data, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          // Dispatch action to update Redux store with new rating data
          dispatch(createRatingVehicle(res.data))
      } catch (error) {
          console.log(error);
      }
  };
}


export function getAllRatingVehicles() {
  return async (dispatch) => {
      try {
          let res = await axios.get(`http://localhost:3000/ratingVehicle/allVehicleWithRatings`);
          dispatch(loadAllVehiclesWithRatings(res.data))
          console.log(res.data);

      } catch (error) {
          console.log(error);
      }
  };
}

//Get Rating by idCar
export function getRating(idCar) {
  return async (dispatch) => {
      try {
          let res = await axios.get(`http://localhost:3000/ratingVehicle/${idCar}`)
          console.log("get", res.data);

          dispatch(getRatingByVehicle(res.data))
      } catch (error) {

          if (error.response.status === 404) {
              console.log("error: ", error.response.data);
              dispatch(errorStatus(error.response.data))
          } else {
              console.log("Lỗi Rating");

          }

      }
  }
}
