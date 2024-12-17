import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    // state load notify dựa vào id đoạn chat
    notifyDatas: [],
    newNotify: {}, // nó sẽ lưu trữ tin nhắn ms vào đây
    loadNotify: false,
};

export const notifySlice = createSlice({
    name: "notifySL",
    initialState,
    reducers: {
        createNotify(state, action) {
            state.notifyDatas.push(action.payload);
        },
        getUserNotify(state, action){
            state.notifyDatas = action.payload;
        },
        MarkAllRead(state){
            state.notifyDatas = state.notifyDatas.map((item) => ({
                ...item,
                isRead: true,
            }));
        },
        // checkStatus(state, action){
        //     state.notifyDatas = action.payload
        // },
         checkStatus(state, action) {
              state.notifyDatas.push(action.payload);
         },
        loadingNotify(state, action) {
            state.loadNotify = action.payload
        },
        loadAllNotification(state, action) {
            state.notifyDatas = action.payload;
        },
    }
})


export const {
    createNotify,
    getUserNotify,
    MarkAllRead,
    checkStatus,
    loadingNotify,
    loadAllNotification
} = notifySlice.actions;