import axios from "axios";
import {
    createRating,
    loadAllToursWithRatings,
    loadingRating,
    getRatingByTour,
    errorStatus,
    deleteRating
} from "../rating_slice";

//Rating
//Add Rating
export function addRating(data) {
    return async (dispatch) => {
        try {
            // Post the new rating along with review and user details
            let res = await axios.post(`http://localhost:3000/Rating/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // replies: [{ reply }]
            });

            // Dispatch action to update Redux store with new rating data
            dispatch(createRating(res.data))
        } catch (error) {
            console.log(error);
        }
    };
}

export function getAllRatingTours() {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Rating/allTourWithRatings`);
            dispatch(loadAllToursWithRatings(res.data))
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    };
}

//Get Rating by TourId
export function getRating(tourId) {
    return async (dispatch) => {
        try {
            let res = await axios.get(`http://localhost:3000/Rating/${tourId}`)
            console.log("get", res.data);

            dispatch(getRatingByTour(res.data))
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


// delete rating
export function delRating(id) {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3000/Rating/del/${id}`)
            dispatch(deleteRating(id))
        } catch (error) {
            console.log(error);
        }
    }
}