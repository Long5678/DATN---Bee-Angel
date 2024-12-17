import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    commentDatas: [],
    commentOne: {},
    isLoadingCM: false,
};

export const CommentSlice = createSlice({
    name: "CommentSL",
    initialState,
    reducers: {
        loadAllToursWithComment(state, action) {
            state.commentDatas = action.payload;
        },
        getCommentById(state, action) {
            state.commentOne = action.payload
        },
        getCommentsByTourId(state, action) {

            console.log("all slice comment", action.payload);

            state.commentDatas = action.payload;
        },
        createComment(state, action) {
            console.log("push slice comment", action.payload);

            state.commentDatas.push(action.payload)
        },
        updateComment(state, action) {
            console.log("action payload updatae", action.payload);

            const index = state.commentDatas.findIndex((item) => item._id === action.payload._id);
            console.log("index", index);

            if (index !== -1) {
                state.commentDatas[index] = action.payload;
            }
        },
        deleteComment(state, action) {
            state.commentDatas = state.commentDatas.filter((item) => {
                return item._id !== action.payload;
            })
        },

        // replyToComment(state, action) {
        //     console.log(action.payload); // In ra kiểu của findCommentId
        //     const index = state.commentDatas.findIndex((item) => String(item._id) == String(action.payload.findCommentId)); // Ép cả hai ID về chuỗi để so sánh
        //     if (index !== -1) { // Kiểm tra index khác -1
        //         console.log("khớp");
        //         console.log(JSON.parse(JSON.stringify(state.commentDatas[index].replies)));

        //         // Kiểm tra và khởi tạo replies nếu chưa tồn tại
        //         if (!state.commentDatas[index].replies) {
        //             state.commentDatas[index].replies = [];
        //         }

        //         // Thêm reply mới vào mảng replies
        //         state.commentDatas[index].replies.push(action.payload);

        //         // state.commentDatas[index].replies.push(action.payload); // Thay đổi trực tiếp state.commentDatas
        //     } else {
        //         console.log("Không khớp");
        //     }

        // },

        // laoding
        loadingComment(state, action) {
            state.isLoadingCM = action.payload;
        },
        replyToComment(state, action) {
            console.log(action.payload); // In ra kiểu của findCommentId
            const index = state.commentDatas.findIndex((item) => String(item._id) === String(action.payload.findCommentId));
            if (index !== -1) {
                const comment = state.commentDatas[index]; // Sử dụng draft state
                if (!comment.replies) {
                    comment.replies = [];
                }
                comment.replies.push(action.payload);
            }
        },
    }
})


export const {
    getCommentsByTourId,
    createComment,
    replyToComment,
    updateComment,
    deleteComment,
    loadingComment,
    getCommentById,
    loadAllToursWithComment
} = CommentSlice.actions;