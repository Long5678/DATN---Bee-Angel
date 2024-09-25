import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    // state load message dựa vào id đoạn chat
    messageDatas: [],
    newMessage: {}, // nó sẽ lưu trữ tin nhắn ms vào đây
};

export const messageSlice = createSlice({
    name: "messageSL",
    initialState,
    reducers: {
        loadMessage_ByIdChat(state, action) {
            state.messageDatas = action.payload;
        },
        addNewMessage(state, action) {
            state.messageDatas.push(action.payload);
            state.newMessage = action.payload;
        }
    }
})


export const {
    loadMessage_ByIdChat,
    addNewMessage,
} = messageSlice.actions;