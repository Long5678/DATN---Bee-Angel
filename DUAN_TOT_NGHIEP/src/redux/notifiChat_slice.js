import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    notifiChatDatas: [],
    newNotifiChat: {},
}

export const notifiChatSlice = createSlice({
    name: "notifiChatSL",
    initialState,
    reducers: {
        loadAllNotifiChat(state, action) {
            state.notifiChatDatas = action.payload;
        },
        addOneNotifiChat(state, action) {
            state.notifiChatDatas.push(action.payload)
        },
        addNewNotitiChat(state, action) {
            state.newNotifiChat = action.payload
        },
        updateOneNotifiChat(state, action) {
            const index = state.notifiChatDatas.findIndex((item) => item._id === action.payload._id);
            if (index !== -1) {
                state.notifiChatDatas[index] = action.payload;
            }
        },
    }
})

export const {
    loadAllNotifiChat,
    addOneNotifiChat,
    addNewNotitiChat,
    updateOneNotifiChat
} = notifiChatSlice.actions;