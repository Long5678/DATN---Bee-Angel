import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    ratingDatas: [],
    ratingOne: {},
    isErrorStatus: '',
};

export const RatingSlice = createSlice({
    name: "RatingSL",
    initialState,
    reducers: {
        loadAllToursWithRatings(state, action) {
            state.ratingDatas = action.payload;
        },
        createRating(state, action) {
            state.ratingDatas.push(action.payload)
        },

        getRatingByTour(state, action) {
            console.log(action.payload);
            state.ratingDatas = action.payload;
        },

        // loading
        loadingRating(state, action) {
            state.isLoadingRating = action.payload;
        },

        errorStatus(state, action) {
            console.log(action.payload);

            state.isErrorStatus = action.payload;
        },
        deleteRating(state, action) {
            state.ratingDatas = state.ratingDatas.filter((item) => {
                return item._id !== action.payload;
            })
        }
    }
})


export const {
    loadAllToursWithRatings,
    createRating,
    loadingRating,
    getRatingByTour,
    errorStatus,
    deleteRating
} = RatingSlice.actions;