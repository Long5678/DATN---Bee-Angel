import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    chatDatas: [],
    oneChat: {}, // 1 đoạn chat
};

export const chatSlice = createSlice({
    name: "chatSL",
    initialState,
    reducers: {
        loadAllChat(state, action) {
            state.chatDatas = action.payload;
        },
        addOneChat(state, action) {
            state.chatDatas.push(action.payload)
        },
        loadOneChat(state, action) {
            state.oneChat = action.payload;
        }
    }
})


export const {
    loadAllChat,
    addOneChat,
    loadOneChat
} = chatSlice.actions;