import {
    createSlice
} from "@reduxjs/toolkit"

const initialState = {
    commentDatas: [],
    commentOne: {},
};

export const CommentSlice = createSlice({
    name: "CommentSL",
    initialState,
    reducers: {
        loadCommentByTour(state, action) {
            state.commentDatas = action.payload;
        },
        addComment(state, action) {
            state.commentDatas.push(action.payload)
        },
        delOneComment(state, action) {
            state.commentDatas = state.commentDatas.filter((item) => {
                return item._id != action.payload
            })
        },
        

        // laoding
        loadingComment(state, action) {
            state.isLoadingComment = action.payload;
        },
    }
})


export const {
    loadCommentByTour,
    addComment,
    delOneComment,
    loadingComment
} = CommentSlice.actions;