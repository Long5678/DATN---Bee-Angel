import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    isLoadingVehicle: false,
    isErrorVehicle: "",
    vehicleDatas: [],
    vehicleOne: {},
    isErrorDelVehicle: "",
};

export const vehicleSlice = createSlice({
    name: "vehicleSL",
    initialState,
    reducers: {
        loadAllVehicle(state, action) {
            state.vehicleDatas = action.payload;
        },
        addOneVehicle(state, action) {
            state.vehicleDatas.push(action.payload)
        },
        delOneVehicle(state, action) {
            state.vehicleDatas = state.vehicleDatas.filter((item) => {
                return item._id != action.payload
            })
        },
        loadOneVehicle(state, action) {
            state.vehicleOne = action.payload;
        },
        updateOneVehicle(state, action) {
            const index = state.vehicleDatas.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.vehicleDatas[index] = action.payload;
            }
        },

        // laoding
        loadingVehicle(state, action) {
            state.isLoadingVehicle = action.payload;
        },
        errorVehicle(state, action) {
            state.isErrorVehicle = action.payload;
        },
        errorDelVehicle(state, action) {
            state.isErrorDelVehicle = action.payload;
        },
    }
})


export const {
    loadAllVehicle,
    addOneVehicle,
    delOneVehicle,
    loadOneVehicle,
    updateOneVehicle,
    loadingVehicle,
    errorVehicle,
    errorDelVehicle
} = vehicleSlice.actions;
