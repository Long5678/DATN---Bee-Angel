import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    userOne: {},
    user: [],
    userChat: {}, // state này để khi click đoạn chat 1 tk nào thì lấy thông tin của tk đó
    isErrUser: "",
    isConfirmPass: "",
};

export const userSlice = createSlice({
    name: "userSL",
    initialState,
    reducers: {
        loadOneUser(state, action) {
            state.userOne = action.payload;
        },
        loadOneUserChat(state, action) {
            state.userChat = action.payload;
        },
        loadAllUser(state, action) {
            state.user = action.payload;
        },
        errUser(state, action) {
            state.isErrUser = action.payload;
        },
        updateOneUser(state, action) {
            console.log("action palyload", action.payload);

            const index = state.user.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.user[index] = action.payload;
            }
        },
        checkConfirmPass(state, action) {
            state.isConfirmPass = action.payload;
        },
    }
})


export const {
    loadOneUser,
    loadOneUserChat,
    loadAllUser,
    errUser,
    updateOneUser,
    checkConfirmPass
} = userSlice.actions;