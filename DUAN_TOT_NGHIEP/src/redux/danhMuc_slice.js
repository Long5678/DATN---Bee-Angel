import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    isLoadingDM: false,
    isErrorDM: "",
    danhMucDatas: [],
    danhMucOne: {},
    isErrorDelDM: "",
};

export const danhMucSlice = createSlice({
    name: "danhMucSL",
    initialState,
    reducers: {
        loadAllDanhMuc(state, action) {
            state.danhMucDatas = action.payload;
        },
        addOneDanhMuc(state, action) {
            state.danhMucDatas.push(action.payload)
        },
        delOneDanhMuc(state, action) {
            state.danhMucDatas = state.danhMucDatas.filter((item) => {
                return item._id != action.payload
            })
        },
        loadOneDanhMuc(state, action) {
            state.danhMucOne = action.payload;
        },
        updateOneDanhMuc(state, action) {
            const index = state.danhMucDatas.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.danhMucDatas[index] = action.payload;
            }
        },

        // laoding
        loadingDM(state, action) {
            state.isLoadingDM = action.payload;
        },

        errorDM(state, action) {
            state.isErrorDM = action.payload;
        },
        errorDelDM(state, action) {
            state.isErrorDelDM = action.payload;
        },
    }
})


export const {
    loadAllDanhMuc,
    addOneDanhMuc,
    delOneDanhMuc,
    loadOneDanhMuc,
    updateOneDanhMuc,
    loadingDM,
    errorDM,
    errorDelDM
} = danhMucSlice.actions;