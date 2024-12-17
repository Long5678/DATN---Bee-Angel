import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    oderDatas: [],
    oderDatasAll: [],
    oneOder: {},
    isErrOrder: "",
    orderNew: {},
    orderUpdate: {},
    oderDatasNotify: [],
};

export const oderSlice = createSlice({
    name: "oderSL",
    initialState,
    reducers: {
        loadAllOder(state, action) {
            state.oderDatas = action.payload;
        },
        loadAllOderDatas(state, action) {
            state.oderDatasAll = action.payload;
        },
        loadoneOder(state, action) {
            state.oneOder = action.payload;
        },
        delOneOder(state, action) {
            state.oderDatas = state.oderDatas.filter((item) => {
                return item._id != action.payload
            })
        },

        updateOneOrder(state, action) {
            const index = state.oderDatas.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.oderDatas[index] = action.payload;
            }
        },
        errOrder(state, action) {
            console.log("dòng 31", action.payload);
            
            state.isErrOrder = action.payload;
        },

        newOrder(state, action) {
            console.log(action.payload);

            state.orderNew = action.payload
        },
        updateStatusOrder(state, action) {
            console.log(action.payload);

            state.orderUpdate = action.payload
        },
        loadingOrder(state, action) {
            state.isLoadingOrder = action.payload;
        },
        loadAllOderNotify(state, action) {
            state.oderDatasNotify = action.payload;
        },
    }
})


export const {
    loadAllOder,
    loadoneOder,
    delOneOder,
    updateOneOrder,
    errOrder,
    newOrder,
    updateStatusOrder,
    loadAllOderDatas,
    loadingOrder,
    loadAllOderNotify
} = oderSlice.actions;