import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    userOne: {},
    user: [],
    userChat: {} // state này để khi click đoạn chat 1 tk nào thì lấy thông tin của tk đó
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
        }
    }
})


export const {
    loadOneUser,
    loadOneUserChat,
    loadAllUser
} = userSlice.actions;