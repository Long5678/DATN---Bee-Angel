import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    isLoadingTour: false,
    isLoadingAddTour: false,
    tourDatas: [],
    tourOne: {},
};

export const tourSlice = createSlice({
    name: "tourSL",
    initialState,
    reducers: {
        loadAllTour(state, action) {
            state.tourDatas = action.payload;
        },
        addOneTour(state, action) {
            state.tourDatas.push(action.payload)
        },
        delOneTour(state, action) {
            state.tourDatas = state.tourDatas.filter((item) => {
                return item._id != action.payload
            })
        },
        loadOneTour(state, action) {
            state.tourOne = action.payload;
        },
        updateOneTour(state, action) {
            const index = state.tourDatas.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.tourDatas[index] = action.payload;
            }
        },

        // laoding
        loadingTour(state, action) {
            state.isLoadingTour = action.payload;
        },
        loadingAddTour(state, action) {
            state.isLoadingAddTour = action.payload;
        },
    }
})


export const {
    loadAllTour,
    addOneTour,
    delOneTour,
    loadOneTour,
    updateOneTour,
    loadingTour,
    loadingAddTour
} = tourSlice.actions;