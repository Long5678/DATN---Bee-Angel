import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    userOne: {},
    user: [],
};

export const userSlice = createSlice({
    name: "userSL",
    initialState,
    reducers: {
        loadOneUser(state, action) {
            state.userOne = action.payload;
        },
        loadAllUser(state, action) {
            state.user = action.payload;
        }
    }
})


export const {
    loadOneUser
} = userSlice.actions;